'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '../AuthContext';
import GoogleIcon from '@/components/icons/google';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Suspense } from 'react';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

function Login() {
  const { googleSignIn } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState('');

  // Define form validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (res) {
        router.push('/');
      }

      form.reset();
    } catch (error: any) {
      if (error.code === 'auth/invalid-login-credentials') {
        setError('Invalid login credentials.');
      } else {
        throw new Error(error);
      }
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 h-screen-80">
        <div className="flex flex-col items-start gap-8 w-full max-w-xs">
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold tracking-tight">Login</h2>
            <p>Welcome back! Please enter your details.</p>
          </div>

          <div className="w-full flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input placeholder="Email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button
                  type="submit"
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 dark:text-white"
                >
                  Continue with Email
                </Button>
              </form>
            </Form>

            <Button
              variant="secondary"
              size="lg"
              onClick={async () => {
                try {
                  const res = await googleSignIn();

                  if (res) {
                    router.push('/');
                  }
                } catch (error: any) {
                  if (error.code === 'auth/popup-closed-by-user') {
                    return;
                  }
                  throw new Error(error);
                }
              }}
              className="flex items-center justify-center gap-2 w-full"
            >
              <GoogleIcon classname="w-5 h-5" />
              Continue with Google
            </Button>
          </div>

          <p className="w-full text-center text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              className="underline text-blue-500 hover:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
