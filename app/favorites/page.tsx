import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorites',
  description: 'Favorites page',
};

import Favorites from '@/components/favorites';

export default function FavoritesPage() {
  return (
    <div className="w-full md:max-w-3xl mx-auto">
      <div className="p-4">
        <Favorites />
      </div>
    </div>
  );
}
