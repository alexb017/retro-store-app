'use client';

import { useContext, useState } from 'react';
import AddToCart from './add-to-cart';
import FormattedPrice from './formatted-price';
import { AuthContext } from '@/app/AuthContext';
import Link from 'next/link';

export default function ProductInfo({ product }: { product: any }) {
  const { user } = useContext(AuthContext);
  const [colorValue, setColorValue] = useState('');
  const [spaceValue, setSpaceValue] = useState('');
  const [priceValue, setPriceValue] = useState('');
  const [sizeValue, setSizeValue] = useState('');

  let formattedPrice = FormattedPrice(product?.price);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold">{product?.name}</h1>
        <p className="text-gray-500 text-2xl font-medium">{formattedPrice}</p>
      </div>
      {product?.colors?.length > 0 || product?.storage?.length > 0 ? (
        <div className="h-[1px] w-full block bg-gray-200"></div>
      ) : null}
      {product?.colors?.length > 0 && (
        <div>
          <h3 className="text-base mb-2">Choose your color</h3>
          <div className="flex items-center gap-2">
            {product?.colors?.map((color: string) => {
              const isActive = color === colorValue;
              const classname =
                'text-sm font-medium border-2 rounded-full py-1 px-4 hover:border-blue-500 transition-all';

              return (
                <button
                  key={color}
                  type="button"
                  className={
                    isActive
                      ? `${classname} border-blue-500 bg-blue-50`
                      : `${classname} border-gray-200`
                  }
                  onClick={() => setColorValue(color)}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {product?.storage?.length > 0 && (
        <div>
          <h3 className="text-base mb-2">Choose your storage space</h3>
          <div className="flex items-center flex-wrap gap-2">
            {product?.storage?.map((storage: any, index: number) => {
              const isActive = storage?.space === spaceValue;
              const classname =
                'text-sm border-2 rounded-2xl aspect-square w-24 h-24 hover:border-blue-500 transition-all';

              let formattedPrice = FormattedPrice(storage?.price);

              return (
                <button
                  key={index}
                  type="button"
                  className={
                    isActive
                      ? `${classname} border-blue-500 bg-blue-50`
                      : `${classname} border-gray-200`
                  }
                  onClick={() => {
                    setSpaceValue(storage?.space);
                    setPriceValue(storage?.price);
                  }}
                >
                  <div className="flex flex-col">
                    <h3 className="font-medium">{storage?.space} GB</h3>
                    <p className="text-xs text-gray-500">{formattedPrice}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {product?.size?.length > 0 && (
        <div>
          <h3 className="text-base mb-2">Choose your size</h3>
          <div className="flex items-center gap-2">
            {product?.size?.map((size: string) => {
              const isActive = size === sizeValue;
              const classname =
                'text-sm font-medium uppercase border-2 rounded-full py-1 px-4 hover:border-blue-500 transition-all';

              return (
                <button
                  key={size}
                  type="button"
                  className={
                    isActive
                      ? `${classname} border-blue-500 bg-blue-50`
                      : `${classname} border-gray-200`
                  }
                  onClick={() => setSizeValue(size)}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <AddToCart
        product={product}
        color={colorValue}
        space={spaceValue}
        price={priceValue}
        size={sizeValue}
      />
      <div>
        <h3 className="text-sm">Description</h3>
        <p className="text-base mt-2">{product?.description}</p>
      </div>
      {!user && (
        <p className="text-sm text-gray-500">
          You must be{' '}
          <Link href="/login" className="underline">
            sign in
          </Link>{' '}
          to buy.
        </p>
      )}
    </div>
  );
}
