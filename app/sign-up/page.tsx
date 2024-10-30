'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../AuthContext';
import GoogleIcon from '@/components/icons/google';
import UserIcon from '@/components/icons/user';
import { useRouter } from 'next/navigation';
import Footer from '@/components/footer';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
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

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function SignUp() {
  const { googleSignIn } = useContext(AuthContext) as any;
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
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (res) {
        router.push('/');
      }

      form.reset();
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email address already exist.');
      } else {
        throw new Error(error);
      }
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 h-screen-80">
        <div className="flex flex-col gap-8 items-start w-full max-w-xs">
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold tracking-tight">
              Create account
            </h2>
            <p>Get started on the Retro Store App.</p>
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
            Already have an account?{' '}
            <Link
              href="/login"
              className="underline text-blue-500 hover:text-blue-400"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
