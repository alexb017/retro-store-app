import BannerNewsletter from '@/components/banner-newsletter';
import Footer from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact us',
};

export default function Contact() {
  return (
    <div className="flex flex-col gap-12 p-5 pt-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold tracking-tighter lg:text-5xl">
          Contact
        </h1>
        <div>
          <h4 className="text-xl tracking-tight">
            If you have any questions or need assistance, please contact us.
          </h4>
          <h4 className="text-xl tracking-tight">
            We&apos;re available Monday through Friday from 9am to 5pm.
          </h4>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col justify-between w-full md:w-1/3 bg-neutral-100 p-5 rounded-3xl aspect-square dark:bg-neutral-900">
          <h4 className="text-xl font-semibold tracking-tight">
            Phone number <br /> 1-800-555-5555
          </h4>
          <h4 className="text-xl tracking-tight">
            Call us during business hours to speak with a customer service
            representative.
          </h4>
        </div>
        <div className="flex flex-col justify-between w-full md:w-1/3 bg-neutral-100 p-5 rounded-3xl aspect-square dark:bg-neutral-900">
          <h4 className="text-xl font-semibold tracking-tight">
            Email address <br /> retrostore@gmail.com
          </h4>
          <h4 className="text-xl tracking-tight">
            Send us an email and we&apos;ll get back to you as soon as possible.
          </h4>
        </div>
        <div className="flex flex-col justify-between w-full md:w-1/3 bg-neutral-100 p-5 rounded-3xl aspect-square dark:bg-neutral-900">
          <h4 className="text-xl font-semibold tracking-tight">
            Address <br /> 123 Main St. <br /> New York, NY 10001
          </h4>
          <h4 className="text-xl tracking-tight">
            Stop by our store during business hours to speak with a customer
            service representative.
          </h4>
        </div>
      </div>
      <BannerNewsletter />
      <Footer />
    </div>
  );
}
