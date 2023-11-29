import StripeIcon from './icons/stripe';

export default function Footer() {
  return (
    <div className="flex flex-col gap-1 items-center sm:gap-0 sm:flex-row sm:justify-between text-sm p-5 sm:py-12">
      <p>&copy; 2023 RetroStore.</p>
      <div className="flex items-center gap-1">
        <p>Powered by</p>
        <StripeIcon classname="text-[#635BFF] w-11 h-auto" />
      </div>
      <div className="flex items-center gap-5">
        <p>Privacy Policy</p>
      </div>
    </div>
  );
}
