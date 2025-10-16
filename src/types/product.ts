export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export const CATEGORIES = [
  "Electronics",
  "Fitness",
  "Home",
  "Fashion",
  "Books",
  "Food",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
