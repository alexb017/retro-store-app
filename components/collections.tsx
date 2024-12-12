'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from './ui/button';

const links = [
  { name: 'All products', href: '/products' },
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
      <ul className="flex flex-wrap justify-start gap-2">
        {links.map((link, index) => (
          <li key={index}>
            <Button
              variant="outline"
              className={`px-5 rounded-full ${
                pathname === link.href
                  ? 'border-black bg-black text-white dark:bg-white dark:text-black hover:bg-black hover:text-white'
                  : ''
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
