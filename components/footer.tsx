import StripeIcon from './icons/stripe';

export default function Footer() {
  return (
    <div className="flex flex-col gap-4 items-center sm:gap-0 sm:flex-row sm:justify-between text-sm px-4 py-20">
      <div className="flex items-center gap-4 order-1 sm:order-none">
        <p className="text-center sm:text-start">
          &copy; 2024 RetroStore. All rights reserved.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <p>Powered by</p>
          <StripeIcon classname="text-[#635BFF] w-11 h-auto" />
        </div>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
}
