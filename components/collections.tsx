'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Collections() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h3 className="text-sm text-gray-500 font-semibold">Collections</h3>
      <ul className="flex flex-row gap-2">
        <li>
          <Link
            href="/search"
            className={`text-sm py-1 px-3 border-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 hover:border-gray-200 transition-colors ${
              pathname === '/search' ? 'border-blue-500' : 'border-gray-100'
            }`}
          >
            All
          </Link>
        </li>
        <li>
          <Link
            href="/search/phones"
            className={`text-sm py-1 px-3 border-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 hover:border-gray-200 transition-colors ${
              pathname === '/search/phones'
                ? 'border-blue-500'
                : 'border-gray-100'
            }`}
          >
            Phones
          </Link>
        </li>
        <li>
          <Link
            href="/search/sweaters"
            className={`text-sm py-1 px-3 border-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 hover:border-gray-200 transition-colors ${
              pathname === '/search/sweaters'
                ? 'border-blue-500'
                : 'border-gray-100'
            }`}
          >
            Sweaters
          </Link>
        </li>
        <li>
          <Link
            href="/search/drinkware"
            className={`text-sm py-1 px-3 border-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 hover:border-gray-200 transition-colors ${
              pathname === '/search/drinkware'
                ? 'border-blue-500'
                : 'border-gray-100'
            }`}
          >
            Drinkware
          </Link>
        </li>
        <li>
          <Link
            href="/search/hats"
            className={`text-sm py-1 px-3 border-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 hover:border-gray-200 transition-colors ${
              pathname === '/search/hats'
                ? 'border-blue-500'
                : 'border-gray-100'
            }`}
          >
            Hats
          </Link>
        </li>
        <li>
          <Link
            href="/search/drones"
            className={`text-sm py-1 px-3 border-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 hover:border-gray-200 transition-colors ${
              pathname === '/search/drones'
                ? 'border-blue-500'
                : 'border-gray-100'
            }`}
          >
            Drones
          </Link>
        </li>
        <li>
          <Link
            href="/search/earbuds"
            className={`text-sm py-1 px-3 border-2 rounded-full bg-gray-100 text-black hover:bg-gray-200 hover:border-gray-200 transition-colors ${
              pathname === '/search/earbuds'
                ? 'border-blue-500'
                : 'border-gray-100'
            }`}
          >
            Earbuds
          </Link>
        </li>
      </ul>
    </div>
  );
}
