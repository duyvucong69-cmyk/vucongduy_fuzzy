import fs from 'fs';
import path from 'path';
import { isMongoDbEnabled, connectToDatabase } from './mongodb';

const ORIGINAL_DB_FILE = path.join(process.cwd(), 'users-db.json');
const DB_FILE = process.env.VERCEL ? path.join('/tmp', 'users-db.json') : ORIGINAL_DB_FILE;

if (process.env.VERCEL && !fs.existsSync(DB_FILE)) {
  try {
    if (fs.existsSync(ORIGINAL_DB_FILE)) {
      fs.copyFileSync(ORIGINAL_DB_FILE, DB_FILE);
    } else {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Failed to initialize users DB in /tmp:', err);
  }
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressDetails: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  phone: string;
  birthday: string;
  avatar: string;
  addresses: Address[];
}

// Read database file (sync version for local fallback)
export function readDb(): User[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data) || [];
  } catch (error) {
    console.error('Error reading database file:', error);
    return [];
  }
}

// Write database file (sync version for local fallback)
export function writeDb(users: User[]): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing database file:', error);
  }
}

// Async database functions supporting both JSON and MongoDB
export async function getAllUsers(): Promise<User[]> {
  if (isMongoDbEnabled()) {
    const { db } = await connectToDatabase();
    return db.collection<User>('users').find({}).toArray();
  }
  return readDb();
}

export async function saveAllUsers(users: User[]): Promise<void> {
  if (isMongoDbEnabled()) {
    const { db } = await connectToDatabase();
    // Re-sync entire collection (convenient for test CRUD sync)
    await db.collection('users').deleteMany({});
    if (users.length > 0) {
      await db.collection('users').insertMany(users);
    }
    return;
  }
  writeDb(users);
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  if (isMongoDbEnabled()) {
    const { db } = await connectToDatabase();
    const user = await db.collection<User>('users').findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    return user || undefined;
  }
  const users = readDb();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export async function findUserById(id: string): Promise<User | undefined> {
  if (isMongoDbEnabled()) {
    const { db } = await connectToDatabase();
    const user = await db.collection<User>('users').findOne({ id });
    return user || undefined;
  }
  const users = readDb();
  return users.find(u => u.id === id);
}

export async function updateUser(id: string, updatedFields: Partial<User>): Promise<User | null> {
  if (isMongoDbEnabled()) {
    const { db } = await connectToDatabase();
    const user = await db.collection<User>('users').findOne({ id });
    if (!user) return null;
    
    const updatedUser = {
      ...user,
      ...updatedFields,
      id: user.id, // Prevent overwriting id
      email: user.email, // Prevent overwriting email
    };
    
    await db.collection('users').replaceOne({ id }, updatedUser);
    return updatedUser;
  }

  const users = readDb();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;

  const updatedUser = {
    ...users[idx],
    ...updatedFields,
    id: users[idx].id,
    email: users[idx].email,
  };

  users[idx] = updatedUser;
  writeDb(users);
  return updatedUser;
}
