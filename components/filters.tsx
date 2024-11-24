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

  return (
    <div className="flex flex-col items-end gap-2">
      <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
        Sort by
      </p>
      <ul className="flex flex-row gap-2">
        {filters.map((filter, index) => (
          <li key={index}>
            <Button
              className={`text-xs font-medium text-black py-1 px-3 h-auto border rounded-full transition-all dark:text-neutral-400 ${
                searchParams.get('sort') === filter.sort ||
                (!searchParams.get('sort') && filter.sort === 'rel')
                  ? 'border-blue-600 bg-blue-50 hover:bg-blue-50 dark:bg-blue-950 dark:text-white'
                  : 'border-neutral-100 bg-neutral-100 hover:bg-neutral-200 hover:border-neutral-200 dark:hover:text-white dark:border-neutral-900 dark:hover:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800'
              }`}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams.toString());

                newParams.set('sort', filter?.sort);

                if (filter?.sort === 'rel') {
                  newParams.delete('sort');
                  router.replace(createUrl(pathname, newParams));
                }

                if (filter?.sort === 'asc') {
                  router.replace(createUrl(pathname, newParams));
                }

                if (filter?.sort === 'des') {
                  router.replace(createUrl(pathname, newParams));
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
