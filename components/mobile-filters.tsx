'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createUrl } from '@/lib/utils';

const filters = [
  { name: 'Relevance', sort: 'rel' },
  { name: 'Price: Low to high', sort: 'asc' },
  { name: 'Price: High to low', sort: 'des' },
];

export default function MobileFilters() {
  const [selected, setSelected] = useState(filters[0]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('sort')) {
      setSelected(filters[0]);
      return;
    }

    filters.map((item) => {
      if (item?.sort === searchParams.get('sort')) {
        setSelected(item);
      }
    });
  }, [searchParams]);

  function handleChangeURL(sort: string) {
    const newUrl = new URLSearchParams(searchParams.toString());
    newUrl.set('sort', sort);

    if (sort === 'rel') {
      newUrl.delete('sort');
    }

    router.replace(createUrl(pathname, newUrl));
  }

  return (
    <>
      <p className="text-xs text-neutral-500 font-medium mb-2 dark:text-neutral-400">
        Sort by
      </p>
      <Select value={selected?.sort} onValueChange={handleChangeURL}>
        <SelectTrigger className="focus:ring-0 focus:ring-offset-0 rounded-full h-12 px-5">
          <SelectValue placeholder={selected?.name} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filters.map((item, index) => (
              <SelectItem
                key={index}
                value={item?.sort}
                onChange={() => setSelected(item)}
              >
                {item?.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
