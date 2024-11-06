import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useState, useEffect } from 'react';
import MagnifyingIcon from './icons/magnifying';
import { Input } from './ui/input';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(
    searchParams.get('q')?.toString() || ''
  );

  useEffect(() => {
    setSearchValue(searchParams.get('q')?.toString() || '');
  }, [pathname]);

  // It creates a new URLSearchParams object with the input value
  // It uses the useDebouncedCallback hook to debounce the search function
  // This prevents the search function from being called too frequently
  const handleSearch = useDebouncedCallback((value: string) => {
    // console.log(`Searching for: ${value}`);
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    router.replace(`/search?${params.toString()}`);
  }, 300);

  return (
    <div className="relative w-full">
      <Input
        type="text"
        name="search"
        placeholder="Search for products..."
        className="block w-full rounded-full bg-zinc-100 hover:bg-zinc-200 focus-visible:bg-zinc-200 border-none py-[9px] pl-10 text-sm placeholder:text-zinc-500 focus-visible:ring-offset-0 focus-visible:ring-0 dark:placeholder:text-zinc-400 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors dark:focus-visible:bg-zinc-800"
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleSearch(e.target.value);
        }}
        value={searchValue || ''}
      />
      <MagnifyingIcon classname="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500" />
    </div>
  );
}
