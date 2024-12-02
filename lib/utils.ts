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

export function FormattedPrice(price: number) {
  const priceInDollars = price / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceInDollars);
}

export function FormattedDate(createdAt: number) {
  const date = new Date(createdAt * 1000);
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.toLocaleDateString('en-US', { day: '2-digit' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  return `${weekday}, ${day} ${month} ${year} at ${time}`;
}

export function cleanedDate(dateTime: string | undefined) {
  const cleanedDateTime = dateTime?.replace(' GMT', '');

  const [weekDay, day, month, year, time] = cleanedDateTime?.split(' ') ?? [];

  return `${weekDay} ${day} ${month} ${year} at ${time}`;
}
