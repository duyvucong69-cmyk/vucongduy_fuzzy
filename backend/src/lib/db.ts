import fs from 'fs';
import path from 'path';

// Define the file path for the JSON database inside the workspace temporary area or backend root
const DB_FILE = path.join(process.cwd(), 'users-db.json');

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

// Read database file
export function readDb(): User[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      // Initialize with empty users array
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

// Write database file
export function writeDb(users: User[]): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing database file:', error);
  }
}

// Find user by email
export function findUserByEmail(email: string): User | undefined {
  const users = readDb();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Find user by id
export function findUserById(id: string): User | undefined {
  const users = readDb();
  return users.find(u => u.id === id);
}

// Update user details
export function updateUser(id: string, updatedFields: Partial<User>): User | null {
  const users = readDb();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;

  // Preserve email, id, and password if not updating
  const updatedUser = {
    ...users[idx],
    ...updatedFields,
    id: users[idx].id, // Prevent overwriting id
    email: users[idx].email, // Prevent overwriting email
  };

  users[idx] = updatedUser;
  writeDb(users);
  return updatedUser;
}
