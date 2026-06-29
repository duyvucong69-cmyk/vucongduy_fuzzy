import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'products-db.json');

export interface Category {
  id: string;
  name: string;
  icon: string; // iconsax data-icon code (e.g. 'archive')
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
  colors: string[]; // hex codes
  sizes: string[]; // e.g. ['S', 'M', 'L']
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
}

// Initial seed data to make the app populated out of the box
const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Chairs', icon: 'chair' },
  { id: 'cat-2', name: 'Sofas', icon: 'sofa' },
  { id: 'cat-3', name: 'Beds', icon: 'bed' },
  { id: 'cat-4', name: 'Tables', icon: 'table' },
  { id: 'cat-5', name: 'Cabinets', icon: 'archive' },
];

const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Modern Accent Chair',
    description: 'A stylish and comfortable modern accent chair, perfect for any living room or home office setup. Crafted with premium fabric and solid oak legs.',
    price: 180,
    stock: 24,
    categoryId: 'cat-1',
    images: ['images/product/1.png', 'images/product/2.png', 'images/product/3.png'],
    colors: ['#122636', '#ffb300', '#d9534f'],
    sizes: ['Standard'],
    rating: 4.8,
    reviewsCount: 42,
    isNew: true
  },
  {
    id: 'prod-2',
    name: 'Luxury Velvet Sofa',
    description: 'Indulge in comfort with this premium velvet three-seater sofa. Features elegant tufting and a sturdy hardwood frame.',
    price: 850,
    stock: 8,
    categoryId: 'cat-2',
    images: ['images/product/4.png', 'images/product/5.png', 'images/product/6.png'],
    colors: ['#122636', '#3b7a57', '#800020'],
    sizes: ['3-Seater', 'L-Shape'],
    rating: 4.9,
    reviewsCount: 18
  },
  {
    id: 'prod-3',
    name: 'Solid Wood Dining Table',
    description: 'Durable and classic solid wood dining table that seats up to six people comfortably. Hand-polished natural grain finish.',
    price: 450,
    stock: 12,
    categoryId: 'cat-4',
    images: ['images/product/7.png', 'images/product/8.png'],
    colors: ['#5c4033', '#c19a6b'],
    sizes: ['6-Seater', '8-Seater'],
    rating: 4.6,
    reviewsCount: 29
  },
  {
    id: 'prod-4',
    name: 'Minimalist Wooden Desk',
    description: 'Clean lines and spacious surface area make this desk ideal for study, work, or gaming. Includes two integrated drawers.',
    price: 220,
    stock: 15,
    categoryId: 'cat-4',
    images: ['images/product/9.png', 'images/product/10.png'],
    colors: ['#ffffff', '#5c4033'],
    sizes: ['Medium', 'Large'],
    rating: 4.5,
    reviewsCount: 56,
    isNew: true
  },
  {
    id: 'prod-5',
    name: 'Comfy Lounge Armchair',
    description: 'Relax in style. This ergonomic lounge armchair provides optimal lumbar support and features stain-resistant linen upholstery.',
    price: 320,
    stock: 18,
    categoryId: 'cat-1',
    images: ['images/product/11.png', 'images/product/12.png'],
    colors: ['#808080', '#e3a857'],
    sizes: ['Standard'],
    rating: 4.7,
    reviewsCount: 33
  },
  {
    id: 'prod-6',
    name: 'King Size Platform Bed',
    description: 'Elegant low-profile platform bed with a tufted headboard. No box spring required, fits standard King mattress.',
    price: 680,
    stock: 5,
    categoryId: 'cat-3',
    images: ['images/product/13.png', 'images/product/14.png'],
    colors: ['#122636', '#808080'],
    sizes: ['Queen', 'King'],
    rating: 4.9,
    reviewsCount: 15
  },
  {
    id: 'prod-7',
    name: 'Scandinavian Sideboard',
    description: 'A retro Scandinavian sideboard featuring three spacious drawers and double cabinets for ample dinnerware storage.',
    price: 380,
    stock: 10,
    categoryId: 'cat-5',
    images: ['images/product/15.png', 'images/product/16.png'],
    colors: ['#c19a6b', '#ffffff'],
    sizes: ['Standard'],
    rating: 4.4,
    reviewsCount: 22
  },
  {
    id: 'prod-8',
    name: 'Ergonomic Office Chair',
    description: 'High-back ergonomic mesh office chair with adjustable headrest, armrests, and dynamic lumbar support.',
    price: 250,
    stock: 40,
    categoryId: 'cat-1',
    images: ['images/product/17.png', 'images/product/18.png'],
    colors: ['#000000', '#122636', '#808080'],
    sizes: ['Standard'],
    rating: 4.8,
    reviewsCount: 112,
    isNew: true
  },
  {
    id: 'prod-9',
    name: 'Mid-Century Leather Sofa',
    description: 'Top-grain aniline Italian leather sofa with tapered wooden legs. Develops a beautiful natural patina over time.',
    price: 1200,
    stock: 4,
    categoryId: 'cat-2',
    images: ['images/product/19.png', 'images/product/20.png'],
    colors: ['#8b4513', '#000000'],
    sizes: ['3-Seater'],
    rating: 4.9,
    reviewsCount: 9
  },
  {
    id: 'prod-10',
    name: 'Tall Bedroom Wardrobe',
    description: 'Spacious tall wardrobe with built-in hanger rails and adjustable shelves. Features soft-closing hinged doors.',
    price: 520,
    stock: 6,
    categoryId: 'cat-5',
    images: ['images/product/21.png', 'images/product/22.png'],
    colors: ['#5c4033', '#ffffff'],
    sizes: ['2-Door', '3-Door'],
    rating: 4.5,
    reviewsCount: 25
  },
  {
    id: 'prod-11',
    name: 'Relaxing Fabric Rocker',
    description: 'A cozy fabric rocking chair with a solid wood base, ideal for nurseries or reading corners.',
    price: 199,
    stock: 14,
    categoryId: 'cat-1',
    images: ['images/product/23.png', 'images/product/24.png'],
    colors: ['#808080', '#ffffff'],
    sizes: ['Standard'],
    rating: 4.7,
    reviewsCount: 14
  },
  {
    id: 'prod-12',
    name: 'Compact Sofa Bed',
    description: 'A convertible sleeper sofa that easily transitions from a stylish loveseat to a comfortable twin bed for guests.',
    price: 349,
    stock: 20,
    categoryId: 'cat-2',
    images: ['images/product/25.png', 'images/product/26.png'],
    colors: ['#122636', '#808080'],
    sizes: ['Twin'],
    rating: 4.6,
    reviewsCount: 30,
    isNew: true
  }
];

export interface DbData {
  categories: Category[];
  products: Product[];
}

export function readProductsDb(): DbData {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialData: DbData = { categories: initialCategories, products: initialProducts };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products database file:', error);
    return { categories: [], products: [] };
  }
}

export function writeProductsDb(data: DbData): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing products database file:', error);
  }
}
