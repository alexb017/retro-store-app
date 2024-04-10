'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      className="w-5 h-5 bg-transparent text-black hover:text-blue-600 hover:bg-transparent dark:text-zinc-400 dark:hover:text-white"
      onClick={() => {
        if (theme === 'dark') {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      }}
    >
      {theme === 'dark' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
