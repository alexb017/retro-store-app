import Favorite from '@/app/favorites/favorites';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorites',
  description: 'Favorites page',
};

export default function FavoritesPage() {
  return (
    <div className="w-full md:max-w-3xl mx-auto">
      <Favorite />
    </div>
  );
}
