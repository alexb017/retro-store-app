'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

const links = [
  { name: 'All', href: '/search' },
  { name: 'Phones', href: '/search/phones' },
  { name: 'Watches', href: '/search/watches' },
  { name: 'Sweaters', href: '/search/sweaters' },
  { name: 'Drinkware', href: '/search/drinkware' },
  { name: 'Hats', href: '/search/hats' },
  { name: 'T-Shirts', href: '/search/t-shirts' },
  { name: 'Hoodies', href: '/search/hoodies' },
  { name: 'Earbuds', href: '/search/earbuds' },
];

export default function Collections() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-sm text-zinc-500 font-medium dark:text-zinc-400">
        Collections
      </p>
      <ul className="flex flex-row gap-2">
        {links.map((link, index) => (
          <li key={index}>
            <Button
              className={`text-sm text-black py-1 px-3 h-auto border-2 rounded-full transition-all dark:text-zinc-400 ${
                pathname === link.href
                  ? 'border-blue-500 bg-blue-50 hover:bg-blue-50 dark:bg-blue-950 dark:text-white'
                  : 'border-zinc-100 bg-zinc-100 hover:bg-zinc-200 hover:border-zinc-200 dark:hover:text-white dark:border-zinc-900 dark:hover:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800'
              }`}
              onClick={() => {
                router.push(link.href, { scroll: false });
              }}
            >
              {link.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
