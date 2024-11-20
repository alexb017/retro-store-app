import { deleteItemCart } from '@/lib/actions';

export default function DeleteItemCart({
  uid,
  id,
}: {
  uid: string;
  id: string;
}) {
  return (
    <button
      onClick={async () => await deleteItemCart(uid, id)}
      className="flex items-center text-sm text-blue-500 border-b border-zinc-500 hover:text-black transition-all ease-in-out dark:text-blue-400 dark:hover:border-zinc-400"
    >
      Remove
    </button>
  );
}
