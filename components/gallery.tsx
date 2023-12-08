'use client';

import Image from 'next/image';
import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from 'next/navigation';
import Link from 'next/link';

export default function Gallery({
  images,
  name,
}: {
  images: { url: string; color: string }[];
  name: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('color') || images[0]?.color;
  const imageIndex = imageSearchParam
    ? images?.findIndex((img) => img.color === imageSearchParam)
    : 0;
  const imageURL = images[imageIndex]?.url as string;

  function createUrl(
    pathname: string,
    params: URLSearchParams | ReadonlyURLSearchParams
  ) {
    const paramsString = params.toString();
    const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

    return `${pathname}${queryString}`;
  }

  return (
    <>
      <div className="relative aspect-square h-full max-h-[500px] w-full overflow-hidden">
        {images[imageIndex]?.url && (
          <Image
            src={imageURL}
            alt={`${name}-${imageIndex}`}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 66vw, 100vw"
            quality={80}
            priority={true}
          />
        )}

        <div className="absolute bottom-0 w-full flex justify-center">
          {images.length > 1 ? (
            <ul className="flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
              {images.map((image: any, index) => {
                const isActive = image?.color === imageSearchParam;
                const classname =
                  'cursor-pointer object-contain py-2 backdrop-blur border-2 rounded-2xl hover:border-blue-500 bg-opacity-30 transition-all';
                const imageSearchParams = new URLSearchParams(
                  searchParams.toString()
                );

                imageSearchParams.set('color', image?.color);
                return (
                  <li key={index} className="flex w-20 h-20">
                    <Link
                      href={createUrl(pathname, imageSearchParams)}
                      className="flex w-20 h-20"
                    >
                      <Image
                        src={image.url}
                        alt={`${name}-${image?.color}`}
                        className={
                          isActive
                            ? `${classname} border-blue-500`
                            : `${classname} border-gray-200`
                        }
                        width={80}
                        height={80}
                        quality={80}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
    </>
  );
}
