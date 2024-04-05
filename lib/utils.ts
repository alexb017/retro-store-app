import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ReadonlyURLSearchParams } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// This function creates a URL by combining a pathname and a URLSearchParams object
// The URLSearchParams object is used to store query parameters
// The function returns a string that represents the URL
export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
}

export function FormattedPrice(price: string) {
  // Check if the last two characters are "00"
  if (price.slice(-2) === '00') {
    // Remove the last two characters and add a dollar sign
    return `$${price.slice(0, -2)}`;
  } else {
    const amount = parseFloat(price) / 100;
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);

    return formatted;
  }
}
