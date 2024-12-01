'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';

const collections = [
  { label: 'All products', value: '/products' },
  { label: 'Phones', value: '/products/phones' },
  { label: 'Watches', value: '/products/watches' },
  { label: 'Sweaters', value: '/products/sweaters' },
  { label: 'Drinkware', value: '/products/drinkware' },
  { label: 'Hats', value: '/products/hats' },
  { label: 'T-Shirts', value: '/products/t-shirts' },
  { label: 'Hoodies', value: '/products/hoodies' },
  { label: 'Earbuds', value: '/products/earbuds' },
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
      <p className="text-xs text-neutral-500 font-medium mb-2 dark:text-neutral-400">
        Collections
      </p>
      <Select value={selected?.value} onValueChange={handleChangeURL}>
        <SelectTrigger className="focus:ring-0 focus:ring-offset-0 rounded-full h-12 px-5">
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
