export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
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
  id: string;
  name: string;
  price: number;
  image: string;
  handle: string;
  color: string;
  size?: string;
  space?: string;
  quantity: number;
  price_id: string;
};
