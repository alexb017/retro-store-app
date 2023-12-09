import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import React from 'react';
import MagnifyingIcon from './icons/magnifying';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function createUrl(
    pathname: string,
    params: URLSearchParams | ReadonlyURLSearchParams
  ) {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const inputValue = e.target as HTMLFormElement;
    const searchValue = inputValue.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (searchValue.value) {
      newParams.set('q', searchValue.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-max-[500px] relative w-full lg:w-80 xl:w-full"
    >
      <input
        type="text"
        name="search"
        placeholder="Search for products..."
        className="w-full rounded-md border bg-white px-4 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <MagnifyingIcon classname="w-5 absolute top-0 right-0 mr-3 flex h-full items-center text-gray-500" />
    </form>
  );
}
