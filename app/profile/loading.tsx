'use client';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-20 h-20 border-t-4 border-b-4 border-green-500 rounded-full animate-spin" />
    </div>
  );
}
