import BannerNewsletter from '@/components/banner-newsletter';
import Footer from '@/components/footer';
import ShippingBanner from '@/components/shipping-banner';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about RetroStore',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12 p-5 pt-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold tracking-tighter lg:text-5xl">
          Welcome to RetroStore!
        </h1>
        <h4 className="text-xl tracking-tight">
          We are a family-owned business that specializes in vintage and
          retro-inspired products. Our mission is to bring back the nostalgia of
          yesteryear by offering a curated selection of high-quality items that
          celebrate the past.
        </h4>
      </div>
      <div className="w-full h-full">
        <Image
          className="w-full h-full rounded-3xl"
          src="https://firebasestorage.googleapis.com/v0/b/task-app-771ec.appspot.com/o/photo-woman-pixel-8.jpg?alt=media&token=44a023ad-1879-444b-aa54-e503072af7c0"
          alt="photo-woman-pixel-8"
          width={1200}
          height={600}
        />
      </div>
      <ShippingBanner />
      <div className="flex w-full justify-center">
        <div className="flex flex-col max-w-md xl:max-w-full gap-5">
          <div className="flex flex-col xl:flex-row gap-5">
            <div className="flex items-center w-full xl:w-1/3 rounded-3xl aspect-square p-12 bg-neutral-100 dark:bg-neutral-900">
              <h4 className="text-xl font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
                We take pride in our commitment to customer satisfaction and
                strive to provide a seamless shopping experience for all of our
                customers.
              </h4>
            </div>
            <div className="w-full xl:w-1/3 rounded-3xl overflow-hidden aspect-square">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/task-app-771ec.appspot.com/o/Google-Pixel-Watch-2.jpg?alt=media&token=5894c6fa-fa91-4541-a169-747dc83e3a80"
                alt="google-pixel-watch-2"
                width={500}
                height={500}
              />
            </div>
            <div className="flex items-center w-full xl:w-1/3 rounded-3xl aspect-square p-12 bg-neutral-100 dark:bg-neutral-900">
              <h4 className="text-xl font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
                Thank you for visiting RetroStore. We hope you enjoy your
                shopping experience and find something special that brings back
                fond memories of days gone by.
              </h4>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row gap-5">
            <div className="w-full xl:w-1/3 rounded-3xl overflow-hidden aspect-square">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/task-app-771ec.appspot.com/o/photo-max-pixel-watch-2.jpg?alt=media&token=9358ea31-001c-4c6e-a491-5f1fab63349b"
                alt="photo-max-pixel-watch-2"
                width={500}
                height={500}
              />
            </div>
            <div className="flex items-center w-full xl:w-1/3 rounded-3xl aspect-square p-12 bg-neutral-100 dark:bg-neutral-900">
              <h4 className="text-xl font-semibold tracking-tight text-neutral-500 dark:text-neutral-400">
                Whether you&apos;re a collector, a hobbyist, or just looking for
                a unique gift, RetroStore has something for everyone. From
                classic video games to vintage clothing, we have a wide range of
                products that are sure to delight and inspire.
              </h4>
            </div>
            <div className="w-full xl:w-1/3 rounded-3xl overflow-hidden aspect-square">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/task-app-771ec.appspot.com/o/photo-woman-pixel-watch-2.jpg?alt=media&token=fc1e6697-7d57-4f4d-a0e5-b70ddc8787ed"
                alt="photo-woman-pixel-watch-2"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </div>
      <BannerNewsletter />
      <Footer />
    </div>
  );
}
