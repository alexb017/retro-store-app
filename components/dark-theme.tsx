'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      className="w-6 h-6 bg-transparent text-black hover:text-blue-600 hover:bg-transparent dark:text-neutral-400 dark:hover:text-white"
      onClick={() => {
        if (theme === 'dark') {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      }}
    >
      {theme === 'dark' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </Button>
  );
}
