import fs from 'fs';
import path from 'path';
import { isMongoDbEnabled, connectToDatabase } from './mongodb';

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

// Async database functions supporting both JSON and MongoDB
export async function readOrdersDbAsync(): Promise<Order[]> {
  if (isMongoDbEnabled()) {
    const { db } = await connectToDatabase();
    return db.collection<Order>('orders').find({}).toArray();
  }
  return readOrdersDb();
}

export async function writeOrdersDbAsync(orders: Order[]): Promise<void> {
  if (isMongoDbEnabled()) {
    const { db } = await connectToDatabase();
    await db.collection('orders').deleteMany({});
    if (orders.length > 0) {
      await db.collection('orders').insertMany(orders);
    }
    return;
  }
  writeOrdersDb(orders);
}
