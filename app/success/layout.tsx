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
  return <div className="w-full md:max-w-3xl mx-auto p-5">{children}</div>;
}
