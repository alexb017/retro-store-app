import { UserMetadata } from 'firebase/auth';

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  metadata: UserMetadata;
};

export type ImageUrls = {
  url: string;
  color: string;
};

export type StorageType = {
  price: number;
  space: string;
};

export type ProductInfoType = {
  id: string;
  category: string;
  colors?: string[];
  description: string;
  handle: string;
  imageUrls: ImageUrls[];
  images: string[];
  name: string;
  price: number;
  price_id: string;
  size?: string[];
  storage?: StorageType[];
};

export type Products = {
  id: string;
  name: string;
  price: number;
  image: string;
  handle: string;
  category: string;
  info: string;
};

export type Banner = {
  name: string;
  price: number;
  handle: string;
  image: string;
  description: string;
  colors: string[];
  id: string;
};

export type CartItem = {
  id_cart: string;
  name: string;
  price: number;
  image: string;
  handle: string;
  color: string;
  size?: string;
  space?: string;
  quantity: number;
  price_id: string;
  id_favorite?: string;
};

export type FavoriteItem = {
  id_favorite: string;
  name: string;
  price: number;
  image: string;
  handle: string;
  color: string;
  size?: string;
  space?: string;
  price_id: string;
  path_url?: string;
  favorite?: boolean;
  quantity: number;
};

export type OrderItems = {
  items: CartItem[];
  amount_total: number;
  name: string;
  status: string;
  created_at: number;
  order_id: string;
};
