'use client';

import { useRouter } from 'next/navigation';
import {
  CodeBracketIcon,
  ArrowLeftEndOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { ModeToggle } from './dark-theme';
import Link from 'next/link';

export default function MenuPopup() {
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="rounded-full">
          Account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 rounded-xl shadow-2xl" align="end">
        <DropdownMenuLabel>Welcome!</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ModeToggle />
          <DropdownMenuItem asChild className="rounded-xl">
            <Link
              href="https://github.com/alexb017/retro-store-app"
              target="_blank"
            >
              <CodeBracketIcon className="w-5 h-5 mr-2" />
              <span>Source code</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="rounded-xl"
            onClick={() => router.push(`/sign-in`)}
          >
            <ArrowLeftEndOnRectangleIcon className="w-5 h-5 mr-2" />
            <span>Sign In</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
