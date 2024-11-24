'use client';

import { useContext } from 'react';
import { TagIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { AuthContext } from '@/app/AuthContext';
import { User } from 'firebase/auth';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address!' }),
});

export default function BannerSignup() {
  const { user } = useContext(AuthContext) as { user: User | null };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    return;
  }

  return (
    <>
      {!user ? (
        <div className="flex flex-col items-center justify-center gap-4 bg-neutral-100 rounded-3xl p-16 dark:bg-neutral-900">
          <TagIcon className="w-12 h-12 text-blue-600" />
          <h1 className="text-4xl font-semibold text-center tracking-tight sm:w-96">
            In order to buy, view cart and checkout, please sign up.
          </h1>
          <Button asChild variant="default">
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 bg-neutral-100 rounded-3xl p-16 dark:bg-neutral-900">
          <EnvelopeIcon className="w-12 h-12 text-blue-600" />
          <h1 className="text-4xl font-semibold text-center tracking-tight sm:w-96">
            Subscribe to our newsletter and get the latest news.
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-center gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-96 h-12 rounded-full px-5 bg-transparent"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="default"
                className="h-12 px-6 rounded-full"
              >
                Subscribe
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
