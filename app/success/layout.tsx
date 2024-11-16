import { Suspense } from 'react';

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
