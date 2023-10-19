'use client';

import { useState } from 'react';
import AddToCart from './add-to-cart';

export default function ProductInfo({ product }: { product: any }) {
  const [colorValue, setColorValue] = useState('');
  const [spaceValue, setSpaceValue] = useState('');

  const price = Number.parseInt(product?.price, 10);

  let formattedPrice = null;

  if (price < 100) {
    formattedPrice = price.toFixed(2);
  }

  if (price >= 100 && price < 1000) {
    formattedPrice = price;
  }

  if (price >= 1000 && price < 10000) {
    formattedPrice = (price / 1000).toLocaleString('en-US');
  }

  return (
    <>
      <div className="mb-5 flex flex-col border-b border-neutral-200 pb-5">
        <h1 className="mb-2 text-5xl font-bold">{product?.name}</h1>
        {product?.storage?.length > 1 ? (
          <p className="text-neutral-500">From ${formattedPrice} USD</p>
        ) : (
          <p className="text-neutral-500">${formattedPrice} USD</p>
        )}
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
                      : `${classname} border-neutral-200`
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

              const price = Number.parseInt(storage?.price, 10);

              let formattedPrice = null;

              if (price < 100) {
                formattedPrice = price.toFixed(2);
              }

              if (price >= 100 && price < 1000) {
                formattedPrice = price;
              }

              if (price >= 1000) {
                formattedPrice = (price / 1000).toLocaleString('en-US');
              }

              return (
                <button
                  key={index}
                  type="button"
                  className={
                    isActive
                      ? `${classname} border-2 border-blue-500`
                      : `${classname} border-neutral-200`
                  }
                  onClick={() => setSpaceValue(storage?.space)}
                >
                  <div className="flex flex-col">
                    <h3 className="font-medium">{storage?.space} GB</h3>
                    <p className="text-xs text-neutral-500">
                      ${formattedPrice}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      <p className="my-5 text-base">{product?.description}</p>
      <AddToCart product={product} color={colorValue} space={spaceValue} />
    </>
  );
}
