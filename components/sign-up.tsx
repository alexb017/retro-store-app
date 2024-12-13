'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '@/app/AuthContext';
import GoogleIcon from '@/components/icons/google';
import { useRouter } from 'next/navigation';
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
import { createUser, checkEmailExists } from '@/lib/actions';

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
    const checkEmail = await checkEmailExists(values.email);

    if (checkEmail) {
      form.setError('email', { message: 'Email already exists.' });
      return;
    }

    const displayName = values.email.split('@')[0];
    const photoURL =
      'https://firebasestorage.googleapis.com/v0/b/task-app-771ec.appspot.com/o/blank-avatar.png?alt=media&token=8be38932-3735-418d-9038-472720cc01e7';

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await createUser(res.user, {
        displayName,
        photoURL,
      });

      if (res) {
        router.push('/');
      }

      form.reset();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-8 items-start w-full max-w-sm px-5">
        <div className="flex flex-col">
          <h1 className="text-4xl font-semibold tracking-tight">
            Create account
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400">
            Get started on the Store App.
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
                    <FormLabel>
                      Email address <span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
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
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="hover:underline text-blue-600 dark:text-blue-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
