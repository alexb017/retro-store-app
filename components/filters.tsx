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
      <ul className="flex flex-wrap justify-end gap-2">
        {filters.map((filter, index) => (
          <li key={index}>
            <Button
              variant="outline"
              className={`px-5 rounded-full ${
                searchParams.get('sort') === filter.sort ||
                (!searchParams.get('sort') && filter.sort === 'rel')
                  ? 'text-black border-black bg-neutral-100 dark:hover:text-black dark:hover:bg-neutral-100'
                  : ''
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
