import PlusIcon from './icons/plus';
import { setCart } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { AuthContext } from '../app/AuthContext';

export default function AddToCart({
  product,
  color,
  space,
}: {
  product: any;
  color: string;
  space: string;
}) {
  const { user, googleSignIn, googleSignOut } = useContext(AuthContext);
  const router = useRouter();
  let defaultVariant = color === '' || space === '';

  if (product?.colors === undefined && product?.storage === undefined) {
    defaultVariant = false;
  }

  if (color !== '' && product?.storage === undefined) {
    defaultVariant = false;
  }

  let price = product?.price;

  if (space === '256') {
    price = '1059';
  }

  if (space === '512') {
    price = '1179';
  }

  if (space === '1') {
    price = '1399';
  }

  const data = {
    name: product?.name,
    price,
    color,
    space,
    image: product?.images[0],
    quantity: 1,
  };

  return (
    <button
      type="button"
      disabled={defaultVariant}
      className={`flex items-center justify-center gap-2 w-full p-4 mt-5 rounded-full bg-blue-500 text-white hover:opacity-90 ${
        defaultVariant
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer opacity-100'
      }`}
      onClick={async () => {
        await setCart(data);
        //router.refresh();
      }}
    >
      <PlusIcon classname="w-6 h-6" />
      Add item to cart
    </button>
  );
}
