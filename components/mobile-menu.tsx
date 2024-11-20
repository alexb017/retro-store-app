import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Search from './search';
import { Button } from './ui/button';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'All', href: '/search' },
    { name: 'Phones', href: '/search/phones' },
    { name: 'Watches', href: '/search/watches' },
    { name: 'Earbuds', href: '/search/earbuds' },
    { name: 'T-Shirts', href: '/search/t-shirts' },
    { name: 'Sweaters', href: '/search/sweaters' },
    { name: 'Hats', href: '/search/hats' },
    { name: 'Hoodies', href: '/search/hoodies' },
    { name: 'Drinkware', href: '/search/drinkware' },
  ];

  return (
    <>
      <button onClick={openMenu} className="focus:outline-none">
        <Menu className="w-6 h-6" />
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
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white dark:bg-zinc-950 pb-5">
              <div className="flex flex-col items-start gap-6 p-4">
                <Button
                  className="flex items-center justify-center transition-color focus:outline-none"
                  onClick={closeMenu}
                  aria-label="close mobile menu"
                >
                  <X />
                </Button>
                <Link
                  href="/"
                  className="flex items-center text-xl font-bold uppercase leading-none tracking-tight"
                >
                  store
                </Link>
                <Search />
                <div className="flex flex-wrap gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="inline-flex text-base py-1 px-3 rounded-full bg-zinc-100 dark:bg-zinc-900"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
