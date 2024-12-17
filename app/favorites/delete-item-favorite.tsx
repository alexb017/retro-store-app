import { Button } from '../../components/ui/button';
import { deleteItemFavorite } from '@/lib/actions';

export default function DeleteItemFavorite({
  uid,
  id,
}: {
  uid: string;
  id: string;
}) {
  return (
    <Button
      variant="link"
      onClick={async () => await deleteItemFavorite(uid, id)}
      className="h-4 p-0 text-blue-600 dark:text-blue-400"
    >
      Remove
    </Button>
  );
}
