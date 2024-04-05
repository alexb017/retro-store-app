'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectItem,
} from './ui/select';

const collections = [
  { label: 'All', value: '/search' },
  { label: 'Phones', value: '/search/phones' },
  { label: 'Watches', value: '/search/watches' },
  { label: 'Sweaters', value: '/search/sweaters' },
  { label: 'Drinkware', value: '/search/drinkware' },
  { label: 'Hats', value: '/search/hats' },
  { label: 'T-Shirts', value: '/search/t-shirts' },
  { label: 'Hoodies', value: '/search/hoodies' },
  { label: 'Earbuds', value: '/search/earbuds' },
];

export default function MobileCollections() {
  const [selected, setSelected] = useState(collections[0]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    collections.map((item) => {
      if (item?.value === pathname) {
        setSelected(item);
      }
    });
  }, [pathname]);

  function handleChangeURL(value: any) {
    router.push(value);
  }

  return (
    <>
      <p className="text-sm text-zinc-500 font-medium mb-2 dark:text-zinc-400">
        Collections
      </p>
      <Select value={selected?.value} onValueChange={handleChangeURL}>
        <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder={selected?.label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {collections.map((item, index) => (
              <SelectItem key={index} value={item?.value}>
                {item?.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
