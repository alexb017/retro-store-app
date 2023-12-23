import Link from 'next/link';
import Image from 'next/image';
import TagIcon from './icons/tag';
import FormattedPrice from './formatted-price';

export default function Carousel({ products }: { products: any[] }) {
  return (
    <div className="w-full overflow-x-auto scrollbar cursor-pointer">
      <ul className="flex gap-6 mb-6">
        {products.map((item, index) => {
          const price = FormattedPrice(item?.price);

          return (
            <li key={index} className="flex-none max-w-[262px]">
              <Link
                href={`/product/${item?.handle}`}
                className="group relative"
              >
                <div className="w-44 sm:w-full h-52 sm:h-64 md:h-72 xl:h-80 overflow-hidden rounded-3xl bg-gray-100 group-hover:opacity-80 transition-all">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    width={320}
                    height={320}
                    quality={80}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                <div className="mt-4 flex flex-col gap-1 items-start">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl sm:text-2xl font-semibold">
                      {item?.name}
                    </h1>
                  </div>
                  <h1 className="text-sm sm:text-base font-semibold">
                    {price}
                  </h1>
                  <div className="text-sm flex items-center gap-2 py-1 px-2 pr-3 font-medium text-black bg-green-100 rounded-full">
                    <TagIcon classname="h-5" />
                    Add to cart
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
