import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success',
  description: 'Success page',
};

export default function LayoutSuccess({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>{children}</Suspense>
    </>
  );
}
