'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const filters = [
  { name: 'Relevance', sort: 'rel' },
  { name: 'Price: Low to high', sort: 'asc' },
  { name: 'Price: High to low', sort: 'des' },
];

export default function MobileFilters() {
  const [selected, setSelected] = useState(filters[0]);
  const router = useRouter();
  const pathname = usePathname();

  function handleChangeURL(sort: any) {
    // console.log(sort);
    if (sort === 'rel') {
      router.replace(pathname);
    }

    if (sort === 'asc') {
      router.replace(`${pathname}?sort=${sort}`);
    }

    if (sort === 'des') {
      router.replace(`${pathname}?sort=${sort}`);
    }
  }

  return (
    <>
      <p className="text-sm text-zinc-500 font-medium mb-2 dark:text-zinc-400">
        Sort by
      </p>
      <Select value={selected?.sort} onValueChange={handleChangeURL}>
        <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
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
