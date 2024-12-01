import {
  ArrowPathRoundedSquareIcon,
  CreditCardIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline';

export default function ShippingBanner() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 md:items-center lg:justify-evenly p-8 rounded-3xl bg-neutral-100 dark:bg-neutral-900">
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white dark:bg-neutral-800">
          <ArchiveBoxIcon className="w-8 h-8" />
        </div>
        <div className="text-center lg:text-left">
          <p className="font-semibold">Free Shipping</p>
          <p className="text-neutral-500 dark:text-neutral-400">
            On all orders
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white dark:bg-neutral-800">
          <CreditCardIcon className="w-8 h-8" />
        </div>
        <div className="text-center lg:text-left">
          <p className="font-semibold">Secure Payments</p>
          <p className="text-neutral-500 dark:text-neutral-400">
            100% secure payment
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white dark:bg-neutral-800">
          <ArrowPathRoundedSquareIcon className="w-8 h-8" />
        </div>
        <div className="text-center lg:text-left">
          <p className="font-semibold">Free Return</p>
          <p className="text-neutral-500 dark:text-neutral-400">
            30 days return policy
          </p>
        </div>
      </div>
    </div>
  );
}
