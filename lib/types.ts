export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  handle: string;
  category: string;
  info: string;
};

export type Item = {
  name: string;
  description: string;
  image: string;
  price: string;
  handle: string;
  colors: string[];
};

export type Products = {
  id_document: string;
  id: string;
  name: string;
  price: string;
  image: string;
  handle: string;
  category: string;
  info: string;
};

export type Banner = {
  name: string;
  price: string;
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
