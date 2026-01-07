import type { StaticImageData } from 'next/image';

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string | StaticImageData;
  description: string;
  rating?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Electronics' | 'Clothing' | 'Home';
