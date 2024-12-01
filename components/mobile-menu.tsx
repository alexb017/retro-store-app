import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Search from './search';
import { Button } from '@/components/ui/button';
import LogoIcon from './icons/logo';

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
    { name: 'All products', href: '/products' },
    { name: 'Phones', href: '/products/phones' },
    { name: 'Watches', href: '/products/watches' },
    { name: 'Earbuds', href: '/products/earbuds' },
    { name: 'T-Shirts', href: '/products/t-shirts' },
    { name: 'Sweaters', href: '/products/sweaters' },
    { name: 'Hats', href: '/products/hats' },
    { name: 'Hoodies', href: '/products/hoodies' },
    { name: 'Drinkware', href: '/products/drinkware' },
  ];

  return (
    <>
      <Button
        onClick={openMenu}
        variant="outline"
        size="icon"
        className="rounded-full focus:outline-none"
      >
        <Bars2Icon className="w-5 h-5" />
      </Button>
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
              <div className="flex flex-col items-start gap-6 p-4 pt-3">
                <Button
                  className="focus:outline-none rounded-full"
                  onClick={closeMenu}
                  aria-label="close mobile menu"
                  variant="outline"
                  size="icon"
                >
                  <XMarkIcon className="w-5 h-5" />
                </Button>
                <Link
                  href="/"
                  className="flex items-center text-xl font-bold leading-none tracking-tighter"
                >
                  <LogoIcon classname="w-8 h-8 -rotate-45" />
                  store
                </Link>
                <Search />
                <div className="flex flex-wrap gap-4">
                  {links.map((link) => (
                    <Button
                      asChild
                      key={link.name}
                      variant="outline"
                      className="px-5 rounded-full"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </Button>
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
