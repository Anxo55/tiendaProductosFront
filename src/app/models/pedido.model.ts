export interface PedidoItem {
  id: number;
  productName: string;
  productPrice: number;
  quantity: number;
  // no hace falta el campo pedido aquí
}

export interface Pedido {
  id: number;
  fecha: string; // ISO date string
  total: number;
  user?: any; // o crea modelo User si quieres
  items: PedidoItem[];
}
