import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MenuIcon from './icons/menu';
import CloseIcon from './icons/close';
import Search from './search';
import DarkTheme from './dark-theme';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button onClick={openMenu} className="focus:outline-none">
        <MenuIcon classname="h-6" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div
              className="fixed inset-0 bg-white/30 dark:bg-black/30"
              aria-hidden="true"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white dark:bg-neutral-950 pb-5">
              <div className="flex flex-col items-start gap-4 p-4">
                <button
                  className="flex items-center justify-center transition-color focus:outline-none"
                  onClick={closeMenu}
                  aria-label="close mobile menu"
                >
                  <CloseIcon classname="h-6" />
                </button>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="flex items-center text-xl font-bold uppercase leading-none"
                  >
                    store
                  </Link>
                  <Link
                    href="/search"
                    className="flex text-lg font-medium hover:text-neutral-500 transition-colors"
                  >
                    All
                  </Link>
                  <Link
                    href="/search/phones"
                    className="flex text-lg font-medium hover:text-neutral-500 transition-colors"
                  >
                    Phones
                  </Link>
                  <Link
                    href="/search/t-shirts"
                    className="flex text-lg font-medium hover:text-neutral-500 transition-colors"
                  >
                    T-Shirts
                  </Link>
                </div>
                <Search />
                <DarkTheme />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
