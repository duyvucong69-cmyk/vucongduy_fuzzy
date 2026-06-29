import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'orders-db.json');

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export interface OrderAddress {
  name: string;
  phone: string;
  addressDetails: string;
}

export type OrderStatus = 'Pending' | 'Preparing' | 'Shipping' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  address: OrderAddress;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
}

export function readOrdersDb(): Order[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data) || [];
  } catch (error) {
    console.error('Error reading orders database file:', error);
    return [];
  }
}

export function writeOrdersDb(orders: Order[]): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing orders database file:', error);
  }
}
