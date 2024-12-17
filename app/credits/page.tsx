import BannerNewsletter from '@/components/banner-newsletter';
import Footer from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Credits',
  description: 'The people who made this possible.',
};

const creditsData = [
  {
    title: 'White shirt mockup',
    href: 'https://www.freepik.com/free-psd/isolated-black-t-shirt-front_16188005.htm#query=t%20shirt%20mockup&position=3&from_view=keyword&track=ais',
  },
  {
    title: 'Black shirt mockup',
    href: 'https://www.freepik.com/free-psd/isolated-white-t-shirt-front-view_16188195.htm#query=t%20shirt%20mockup&position=7&from_view=keyword&track=ais',
  },
  {
    title: 'White hoodie mockup',
    href: 'https://www.freepik.com/free-psd/isolated-back-white-hoodie_18218933.htm#page=2&query=hoodie%20mockup&position=1&from_view=search&track=country_rows_v2',
  },
  {
    title: 'Black hoodie mockup',
    href: 'https://www.freepik.com/free-psd/isolated-back-black-hoodie_18218926.htm#query=hoodie%20mockup&position=30&from_view=search&track=country_rows_v2',
  },
  {
    title: 'Green sweater mockup',
    href: 'https://www.freepik.com/free-photo/green-front-sweater_13237319.htm#page=17&query=jacket%20mockup&position=29&from_view=search&track=ais',
  },
];

export default function CreditsPage() {
  return (
    <div className="flex flex-col gap-12 p-5 pt-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold tracking-tighter lg:text-5xl">
          Credits
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-lg">
            The following resources were used in the creation of this project:
          </p>
          <ul className="list-disc pl-5">
            {creditsData.map((credit) => (
              <li key={credit.title}>
                <a
                  href={credit.href}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {credit.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BannerNewsletter />
      <Footer />
    </div>
  );
}
