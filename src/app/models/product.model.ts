// src/app/models/product.model.ts
export interface Product {
  productId: number; // Marked optional for creation
  name: string;
  description: string;
  price: number;
  quantity: number;
    imageUrl?: string;
}
