'use client';

import { useState } from 'react';
import AddToCart from './add-to-cart';
import FormattedPrice from './formatted-price';

export default function ProductInfo({ product }: { product: any }) {
  const [colorValue, setColorValue] = useState('');
  const [spaceValue, setSpaceValue] = useState('');
  const [priceValue, setPriceValue] = useState('');

  let formattedPrice = FormattedPrice(product?.price);

  return (
    <>
      <div className="mb-5 flex flex-col border-b border-gray-200 pb-5">
        <h1 className="mb-2 text-4xl font-bold">{product?.name}</h1>
        <p className="text-gray-500 text-2xl">{formattedPrice}</p>
      </div>
      {product?.colors?.length > 0 && (
        <>
          <h3 className="text-xl mb-2">Choose your color</h3>
          <div className="flex items-center gap-2">
            {product?.colors?.map((color: string) => {
              const isActive = color === colorValue;
              const classname =
                'text-sm font-medium border rounded-full py-1 px-4 hover:border-blue-500 hover:scale-105 transition-all';

              return (
                <button
                  key={color}
                  type="button"
                  className={
                    isActive
                      ? `${classname} border-2 border-blue-500`
                      : `${classname} border-gray-200`
                  }
                  onClick={() => setColorValue(color)}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </>
      )}
      {product?.storage?.length > 0 && (
        <div className="my-5">
          <h3 className="text-xl mb-2">Choose your storage space</h3>
          <div className="flex items-center flex-wrap gap-2">
            {product?.storage?.map((storage: any, index: number) => {
              const isActive = storage?.space === spaceValue;
              const classname =
                'text-sm border rounded-2xl aspect-square w-24 h-24 hover:border-blue-500 hover:scale-105 transition-all';

              let formattedPrice = FormattedPrice(storage?.price);

              return (
                <button
                  key={index}
                  type="button"
                  className={
                    isActive
                      ? `${classname} border-2 border-blue-500`
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
      <p className="my-5 text-base">{product?.description}</p>
      <AddToCart
        product={product}
        color={colorValue}
        space={spaceValue}
        price={priceValue}
      />
    </>
  );
}
