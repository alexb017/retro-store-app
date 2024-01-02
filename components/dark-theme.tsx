'use client';

import { useState, useEffect } from 'react';

export default function DarkTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState('');

  useEffect(() => {
    const theme = localStorage.getItem('isDarkThemeStore') || 'light';

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }

    setIsDarkTheme(theme as string);
  }, [isDarkTheme]);

  function handleDarkTheme(theme: string) {
    setIsDarkTheme(theme);
    localStorage.setItem('isDarkThemeStore', theme);
  }

  return (
    <div className="flex items-center border rounded-full border-neutral-300 p-1 dark:border-neutral-700">
      <button
        type="button"
        className={`flex items-center rounded-full p-1 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 dark:text-neutral-500 ${
          isDarkTheme === 'light' ? 'bg-neutral-200' : null
        }`}
        onClick={() => handleDarkTheme('light')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0Zm72 88a64 64 0 1 1-64-64a64.07 64.07 0 0 1 64 64Zm-16 0a48 48 0 1 0-48 48a48.05 48.05 0 0 0 48-48ZM58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68l-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32ZM192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72Zm5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8Zm80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8Zm112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16Z"
          />
        </svg>
      </button>
      {/* <button
        type="button"
        className={`flex items-center rounded-full p-1 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M208 40H48a24 24 0 0 0-24 24v112a24 24 0 0 0 24 24h160a24 24 0 0 0 24-24V64a24 24 0 0 0-24-24Zm8 136a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V64a8 8 0 0 1 8-8h160a8 8 0 0 1 8 8Zm-48 48a8 8 0 0 1-8 8H96a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Z"
          />
        </svg>
      </button> */}
      <button
        type="button"
        className={`flex items-center rounded-full p-1 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 dark:text-neutral-200 ${
          isDarkTheme === 'dark' ? 'bg-neutral-700' : null
        }`}
        onClick={() => handleDarkTheme('dark')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M233.54 142.23a8 8 0 0 0-8-2a88.08 88.08 0 0 1-109.8-109.8a8 8 0 0 0-10-10a104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.09 103.09 0 0 0 62.52-20.88a104.84 104.84 0 0 0 37-52.91a8 8 0 0 0-1.98-7.98Zm-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104a106 106 0 0 0 14.92-1.06a89 89 0 0 1-26.02 31.4Z"
          />
        </svg>
      </button>
    </div>
  );
}
