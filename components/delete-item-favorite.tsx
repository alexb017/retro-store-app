import { Button } from './ui/button';
import { deleteItemFavorite } from '@/lib/actions';
import { Trash2 } from 'lucide-react';

export default function DeleteItemFavorite({
  uid,
  id,
}: {
  uid: string;
  id: string;
}) {
  return (
    <Button
      variant="ghost"
      onClick={async () => await deleteItemFavorite(uid, id)}
      className="text-xs rounded-full transition-all duration-200 ease-in"
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </Button>
  );
}
