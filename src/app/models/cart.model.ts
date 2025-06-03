export interface CartItemDto {
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  quantity: number;
}

export interface CartDto {
  items: CartItemDto[];
}
