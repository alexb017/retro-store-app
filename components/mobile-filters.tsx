'use client';

import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import CheckIcon from './icons/check';
import CaretUpDownIcon from './icons/caret-up-down';
import { useRouter, usePathname } from 'next/navigation';

const filters = [
  { name: 'Relevance', sort: 'rel' },
  { name: 'Price: Low to high', sort: 'asc' },
  { name: 'Price: High to low', sort: 'des' },
];

export default function MobileFilters() {
  const [selected, setSelected] = useState(filters[0]);
  const router = useRouter();
  const pathname = usePathname();

  function handleChangeURL(option: any) {
    if (option.sort === 'rel') {
      setSelected(option);
      router.push(pathname);
    }

    if (option.sort === 'asc') {
      setSelected(option);
      router.push(`${pathname}?sort=${option.sort}`);
    }

    if (option.sort === 'des') {
      setSelected(option);
      router.push(`${pathname}?sort=${option.sort}`);
    }
  }

  return (
    <>
      <Listbox value={selected} onChange={handleChangeURL}>
        <div className="relative z-10 w-full">
          <Listbox.Label className="text-sm text-gray-500 font-medium leading-7">
            Sort by:
          </Listbox.Label>
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-blue-50 py-2 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretUpDownIcon
                classname="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filters.map((item, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-950'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon classname="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}
