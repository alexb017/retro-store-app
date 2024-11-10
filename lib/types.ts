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
  id_document: string;
  category: string;
  colors?: string[];
  description: string;
  handle: string;
  imageUrls: string[];
  images: string[];
  name: string;
  price: number;
  price_id: string;
  size?: string[];
  storage?: StorageType[];
};

export type Products = {
  id_document: string;
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
  id_document: string;
};

export type CartItems = {
  name: string;
  price: string;
  image: string;
  handle: string;
  color: string;
  size: string;
  space: string;
  quantity: number;
  price_id: string;
};

export type FavoriteType = {
  name: string;
  price: string;
  image: string;
  handle: string;
  color: string;
  size: string;
  space: string;
  price_id: string;
  pathUrl: string;
  images: string[];
  favorite: boolean;
};

export type OrderType = {
  item: {
    name: string;
    handle: string;
    image: string;
    color: string;
    price: string;
    price_id: string;
    quantity: number;
    size: string;
    space: string;
  };
  order_nr: number;
};

export type ProductInfoAddTo = {
  handle: string;
  name: string;
  price: string;
  space?: string;
  size?: string;
  images?: string[];
  image?: string;
  price_id?: string;
  colors?: string[];
};
