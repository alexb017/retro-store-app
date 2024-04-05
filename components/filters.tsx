'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { createUrl } from '@/lib/utils';

const filters = [
  { name: 'Relevance', sort: 'rel' },
  { name: 'Price: Low to high', sort: 'asc' },
  { name: 'Price: High to low', sort: 'des' },
];

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams.toString());

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-sm text-zinc-500 font-medium dark:text-zinc-400">
        Sort by
      </p>
      <ul className="flex flex-row gap-2">
        {filters.map((filter, index) => (
          <li key={index}>
            <Button
              className={`text-sm text-black py-1 px-3 h-auto border-2 rounded-full transition-all dark:text-zinc-400 ${
                searchParams.get('sort') === filter.sort ||
                (!searchParams.get('sort') && filter.sort === 'rel')
                  ? 'border-blue-500 bg-blue-50 hover:bg-blue-50 dark:bg-blue-950 dark:text-white'
                  : 'border-zinc-100 bg-zinc-100 hover:bg-zinc-200 hover:border-zinc-200 dark:hover:text-white dark:border-zinc-900 dark:hover:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800'
              }`}
              onClick={() => {
                if (filter?.sort === 'rel') {
                  router.replace(pathname);
                }

                if (filter?.sort === 'asc') {
                  router.replace(`${pathname}?sort=${filter?.sort}`);
                }

                if (filter?.sort === 'des') {
                  router.replace(`${pathname}?sort=${filter?.sort}`);
                }
              }}
            >
              {filter.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
