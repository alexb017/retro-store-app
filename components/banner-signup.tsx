import TagIcon from './icons/tag';
import { Button } from './ui/button';
import Link from 'next/link';

export default function BannerSignup() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-zinc-100 rounded-3xl p-16 dark:bg-zinc-950">
      <TagIcon classname="h-12 text-blue-500" />
      <h1 className="text-4xl font-semibold text-center tracking-tight sm:w-96">
        In order to buy, view cart and checkout, please sign up.
      </h1>
      <Button
        asChild
        className="text-base bg-transparent border text-zinc-950 border-zinc-500 hover:text-white hover:bg-zinc-500 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-700"
      >
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
