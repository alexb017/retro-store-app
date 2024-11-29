import { Suspense } from 'react';
import SuccessMessage from '@/components/success-message';

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessMessage />
    </Suspense>
  );
}
