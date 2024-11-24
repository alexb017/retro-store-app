import StripeIcon from './icons/stripe';
import LogoIcon from './icons/logo';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex p-12 border-b border-neutral-200 dark:border-neutral-700">
        <div className="w-1/4">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center text-xl font-bold leading-none tracking-tighter"
            >
              <LogoIcon classname="w-8 h-8 -rotate-45" />
              store
            </Link>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              The best place to find the awesome products you love.
            </p>
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex justify-center">
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Store</p>
              <Link
                href="/about"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex justify-center">
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Products</p>
              <Link
                href="/products/phones"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                Phones
              </Link>
              <Link
                href="/products/watches"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                Watches
              </Link>
              <Link
                href="/products/t-shirts"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                T-shirts
              </Link>
              <Link
                href="/products/hats"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                Hats
              </Link>
              <Link
                href="/products/hoodies"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                Hoodies
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="flex justify-center">
            <div className="flex flex-col items-start gap-2">
              <p className="font-medium">Social</p>
              <Link
                href="#"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-black dark:hover:text-white text-neutral-500 dark:text-neutral-400"
              >
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-center sm:text-start text-neutral-500 dark:text-neutral-400">
          &copy; 2024 Retro Store. All rights reserved.
        </p>
        <div className="flex items-center">
          <StripeIcon classname="text-[#635BFF] w-11 h-auto" />
        </div>
      </div>
    </div>
  );
}
