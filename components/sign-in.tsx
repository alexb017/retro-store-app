'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/app/AuthContext';
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
import { createUser, checkUserExists } from '@/lib/actions';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function SignIn() {
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
      if (error.code === 'auth/invalid-credential') {
        setError('Invalid login credentials.');
      } else {
        throw new Error(error);
      }
    }
  }

  return (
    <div className="flex flex-col items-start gap-8 w-full max-w-sm px-5">
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-neutral-500 dark:text-neutral-400">
          Please enter your details.
        </p>
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
                    <Input
                      placeholder="Enter your email address"
                      {...field}
                      className="h-12 rounded-full px-5"
                    />
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
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                      className="h-12 rounded-full px-5"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="h-12 rounded-full">
              Continue with Email
            </Button>
          </form>
        </Form>

        <Button
          variant="secondary"
          onClick={async () => {
            try {
              const res = await googleSignIn();

              await createUser(res.user, {});

              if (res) {
                router.push('/');
              }
            } catch (error: any) {
              if (error.code === 'auth/popup-closed-by-user') {
                return;
              }
              // console.error('Error signing in with Google:', error.message);
              throw new Error(error);
            }
          }}
          className="flex items-center justify-center gap-2 w-full h-12 rounded-full"
        >
          <GoogleIcon classname="w-5 h-5" />
          Continue with Google
        </Button>
      </div>

      <p className="w-full text-sm text-neutral-500 dark:text-neutral-400">
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
