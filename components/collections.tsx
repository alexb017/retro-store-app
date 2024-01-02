'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Collections() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="text-sm text-neutral-500 font-medium dark:text-neutral-400">
        Collections
      </h3>
      <ul className="flex flex-row gap-2">
        <li>
          <Link
            href="/search"
            className={`text-sm py-1 px-3 border-2 rounded-full transition-colors ${
              pathname === '/search'
                ? 'border-blue-500 bg-blue-50 dark:bg-neutral-900'
                : 'border-neutral-100 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-700'
            }`}
          >
            All
          </Link>
        </li>
        <li>
          <Link
            href="/search/phones"
            className={`text-sm py-1 px-3 border-2 rounded-full transition-colors ${
              pathname === '/search/phones'
                ? 'border-blue-500 bg-blue-50 dark:bg-neutral-900'
                : 'border-neutral-100 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-700'
            }`}
          >
            Phones
          </Link>
        </li>
        <li>
          <Link
            href="/search/sweaters"
            className={`text-sm py-1 px-3 border-2 rounded-full transition-colors ${
              pathname === '/search/sweaters'
                ? 'border-blue-500 bg-blue-50 dark:bg-neutral-900'
                : 'border-neutral-100 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-700'
            }`}
          >
            Sweaters
          </Link>
        </li>
        <li>
          <Link
            href="/search/drinkware"
            className={`text-sm py-1 px-3 border-2 rounded-full transition-colors ${
              pathname === '/search/drinkware'
                ? 'border-blue-500 bg-blue-50 dark:bg-neutral-900'
                : 'border-neutral-100 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-700'
            }`}
          >
            Drinkware
          </Link>
        </li>
        <li>
          <Link
            href="/search/hats"
            className={`text-sm py-1 px-3 border-2 rounded-full transition-colors ${
              pathname === '/search/hats'
                ? 'border-blue-500 bg-blue-50 dark:bg-neutral-900'
                : 'border-neutral-100 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-700'
            }`}
          >
            Hats
          </Link>
        </li>
        <li>
          <Link
            href="/search/t-shirts"
            className={`text-sm py-1 px-3 border-2 rounded-full transition-colors ${
              pathname === '/search/t-shirts'
                ? 'border-blue-500 bg-blue-50 dark:bg-neutral-900'
                : 'border-neutral-100 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-700'
            }`}
          >
            T-Shirts
          </Link>
        </li>
        <li>
          <Link
            href="/search/hoodies"
            className={`text-sm py-1 px-3 border-2 rounded-full transition-colors ${
              pathname === '/search/hoodies'
                ? 'border-blue-500 bg-blue-50 dark:bg-neutral-900'
                : 'border-neutral-100 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-700'
            }`}
          >
            Hoodies
          </Link>
        </li>
        <li>
          <Link
            href="/search/earbuds"
            className={`text-sm py-1 px-3 border-2 rounded-full transition-colors ${
              pathname === '/search/earbuds'
                ? 'border-blue-500 bg-blue-50 dark:bg-neutral-900'
                : 'border-neutral-100 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-700'
            }`}
          >
            Earbuds
          </Link>
        </li>
      </ul>
    </div>
  );
}
