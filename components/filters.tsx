'use client';

import {
  useRouter,
  useSearchParams,
  ReadonlyURLSearchParams,
  usePathname,
} from 'next/navigation';

export default function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pathQuery = new URLSearchParams(searchParams.toString());

  function createUrl(
    pathname: string,
    params: URLSearchParams | ReadonlyURLSearchParams
  ) {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="text-sm text-gray-500 font-medium">Sort by</h3>
      <ul className="flex flex-row gap-2">
        <li>
          <button
            className={`text-sm py-1 px-3 border-2 rounded-full text-black transition-colors ${
              pathQuery.toString() === ''
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-100 bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => {
              router.replace(pathname, { scroll: false });
            }}
          >
            Relevance
          </button>
        </li>
        <li>
          <button
            className={`text-sm py-1 px-3 border-2 rounded-full text-black transition-colors ${
              pathQuery.toString() === 'sort=asc'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-100 bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => {
              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('sort', 'asc');

              const optionUrl = createUrl(pathname, optionSearchParams);

              router.replace(optionUrl, { scroll: false });
            }}
          >
            Price: Low to high
          </button>
        </li>
        <li>
          <button
            className={`text-sm py-1 px-3 border-2 rounded-full text-black transition-colors ${
              pathQuery.toString() === 'sort=des'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-100 bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => {
              const optionSearchParams = new URLSearchParams(
                searchParams.toString()
              );

              optionSearchParams.set('sort', 'des');

              const optionUrl = createUrl(pathname, optionSearchParams);

              router.replace(optionUrl, { scroll: false });
            }}
          >
            Price: High to low
          </button>
        </li>
      </ul>
    </div>
  );
}
