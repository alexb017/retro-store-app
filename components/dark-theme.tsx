'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { DropdownMenuItem } from './ui/dropdown-menu';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenuItem
      className="rounded-xl"
      onClick={() => {
        if (theme === 'dark') {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      }}
    >
      {theme === 'dark' ? (
        <>
          <MoonIcon className="w-5 h-5 mr-2" />
          <span>Switch to dark theme</span>
        </>
      ) : (
        <>
          <SunIcon className="w-5 h-5 mr-2" />
          <span>Switch to light theme</span>
        </>
      )}
    </DropdownMenuItem>
  );
}
