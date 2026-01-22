export interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user: string;
  total_price: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: number;
  tag: string;
}