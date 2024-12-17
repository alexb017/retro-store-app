import LogoIcon from './icons/logo';
import Link from 'next/link';

const storeLinks = [
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
  {
    title: 'FAQ',
    href: '/faq',
  },
];

const productLinks = [
  {
    title: 'Phones',
    href: '/products/phones',
  },
  {
    title: 'Watches',
    href: '/products/watches',
  },
  {
    title: 'T-shirts',
    href: '/products/t-shirts',
  },
  {
    title: 'Hats',
    href: '/products/hats',
  },
  {
    title: 'Hoodies',
    href: '/products/hoodies',
  },
];

export default function Footer() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-between gap-6 md:gap-0 p-12 border-b border-neutral-200 dark:border-neutral-700">
        <div className="w-1/2 md:w-1/4">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center text-2xl font-bold leading-none tracking-tighter"
            >
              <LogoIcon classname="w-8 h-8 -rotate-45" />
              store
            </Link>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              The best place to find the awesome products you love.
            </p>
          </div>
        </div>
        <div className="w-1/3 md:w-1/4">
          <div className="flex justify-center">
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Store</p>
              {storeLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400 transition-all duration-200 ease-in"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3 md:w-1/4">
          <div className="flex justify-center">
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Products</p>
              {productLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400 transition-all duration-200 ease-in"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3 md:w-1/4">
          <div className="flex justify-center">
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Social</p>
              <a
                href="#"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400 transition-all duration-200 ease-in"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400 transition-all duration-200 ease-in"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400 transition-all duration-200 ease-in"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <p className="text-sm sm:text-start text-neutral-500 dark:text-neutral-400 order-1 md:order-none">
          &copy; 2024 Retro Store App. All rights reserved.
        </p>
        <div className="flex items-center gap-1 italic text-sm text-neutral-500 dark:text-neutral-400">
          Powered by
          <p className="text-[#635BFF] text-base font-black tracking-tight">
            stripe
          </p>
        </div>
      </div>
    </div>
  );
}
