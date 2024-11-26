import Profile from '@/components/profile';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile details',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full md:max-w-3xl mx-auto">
      <div className="flex gap-4 p-5">
        <div className="w-1/3">
          <Profile />
        </div>
        <div className="w-2/3">{children}</div>
      </div>
    </div>
  );
}
