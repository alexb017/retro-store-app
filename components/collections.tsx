'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Collections() {
  const pathname = usePathname();

  return (
    <>
      <h3 className="text-xs text-gray-500 font-bold">Collections</h3>
      <ul>
        <li>
          <Link
            href="/search"
            className={`text-sm hover:text-black ${
              pathname === '/search'
                ? 'text-black border-b border-black'
                : 'text-gray-500'
            }`}
          >
            All
          </Link>
        </li>
        <li>
          <Link
            href="/search/phones"
            className={`text-sm hover:text-black ${
              pathname === '/search/phones'
                ? 'text-black border-b border-black'
                : 'text-gray-500'
            }`}
          >
            Phones
          </Link>
        </li>
        <li>
          <Link
            href="/search/sweaters"
            className={`text-sm hover:text-black ${
              pathname === '/search/sweaters'
                ? 'text-black border-b border-black'
                : 'text-gray-500'
            }`}
          >
            Sweaters
          </Link>
        </li>
        <li>
          <Link
            href="/search/drinkware"
            className={`text-sm hover:text-black ${
              pathname === '/search/drinkware'
                ? 'text-black border-b border-black'
                : 'text-gray-500'
            }`}
          >
            Drinkware
          </Link>
        </li>
        <li>
          <Link
            href="/search/hats"
            className={`text-sm hover:text-black ${
              pathname === '/search/hats'
                ? 'text-black border-b border-black'
                : 'text-gray-500'
            }`}
          >
            Hats
          </Link>
        </li>
        <li>
          <Link
            href="/search/drones"
            className={`text-sm hover:text-black ${
              pathname === '/search/drones'
                ? 'text-black border-b border-black'
                : 'text-gray-500'
            }`}
          >
            Drones
          </Link>
        </li>
        <li>
          <Link
            href="/search/earbuds"
            className={`text-sm hover:text-black ${
              pathname === '/search/earbuds'
                ? 'text-black border-b border-black'
                : 'text-gray-500'
            }`}
          >
            Earbuds
          </Link>
        </li>
      </ul>
    </>
  );
}
