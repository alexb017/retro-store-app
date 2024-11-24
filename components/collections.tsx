'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

const links = [
  { name: 'All', href: '/products' },
  { name: 'Phones', href: '/products/phones' },
  { name: 'Watches', href: '/products/watches' },
  { name: 'Sweaters', href: '/products/sweaters' },
  { name: 'Drinkware', href: '/products/drinkware' },
  { name: 'Hats', href: '/products/hats' },
  { name: 'T-Shirts', href: '/products/t-shirts' },
  { name: 'Hoodies', href: '/products/hoodies' },
  { name: 'Earbuds', href: '/products/earbuds' },
];

export default function Collections() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
        Collections
      </p>
      <ul className="flex flex-row gap-2">
        {links.map((link, index) => (
          <li key={index}>
            <Button
              className={`text-xs font-medium text-black py-1 px-3 h-auto border rounded-full transition-all dark:text-neutral-400 ${
                pathname === link.href
                  ? 'border-blue-600 bg-blue-50 hover:bg-blue-50 dark:bg-blue-950 dark:text-white'
                  : 'border-neutral-100 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 dark:hover:text-white dark:border-neutral-900 dark:hover:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800'
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
