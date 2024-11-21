import { Button } from './ui/button';
import { deleteItemCart } from '@/lib/actions';

export default function DeleteItemCart({
  uid,
  id,
}: {
  uid: string;
  id: string;
}) {
  return (
    <Button
      variant="link"
      onClick={async () => await deleteItemCart(uid, id)}
      className="h-4 p-0 text-blue-600 dark:text-blue-400"
    >
      Remove
    </Button>
  );
}
