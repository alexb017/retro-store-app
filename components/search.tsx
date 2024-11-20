import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useDebouncedCallback } from 'use-debounce';
import { createUrl } from '@/lib/utils';

export default function SearchNavbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // const [searchValue, setSearchValue] = useState(
  //   searchParams.get('q')?.toString() || ''
  // );

  // useEffect(() => {
  //   setSearchValue(searchParams.get('q')?.toString() || '');
  // }, [pathname]);

  // It creates a new URLSearchParams object with the input value
  // It uses the useDebouncedCallback hook to debounce the search function
  // This prevents the search function from being called too frequently
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    router.replace(createUrl(pathname, params));
  }, 300);

  return (
    <div className="relative w-full">
      <Input
        type="text"
        name="search"
        placeholder="Search for products..."
        className="block w-full rounded-full bg-neutral-100 hover:bg-neutral-200 focus-visible:bg-zinc-200 border-none py-[9px] pl-10 text-sm placeholder:text-neutral-500 focus-visible:ring-offset-0 focus-visible:ring-0 dark:placeholder:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors dark:focus-visible:bg-neutral-800"
        onChange={(e) => {
          // If the pathname is not "/products" or "/products/[...slug]" redirect to "/products"
          if (
            pathname !== '/products' &&
            !/^\/products\/[^/]+$/.test(pathname)
          ) {
            router.push('/products');
          }

          // setSearchValue(e.target.value);
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('q')?.toString()}
      />
      <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500" />
    </div>
  );
}
