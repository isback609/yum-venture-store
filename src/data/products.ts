
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Fresh Avocado (2 count)',
    description: 'Ripe, ready-to-eat avocados perfect for guacamole, salads, or toast.',
    price: 4.99,
    image: '/avocado.jpg',
    category: 'fresh',
    stock: 30,
    featured: true,
  },
  {
    id: '2',
    name: 'Artisan Sourdough Bread',
    description: 'Freshly baked sourdough bread with a crispy crust and soft interior.',
    price: 6.49,
    image: '/sourdough.jpg',
    category: 'bakery',
    stock: 15,
  },
  {
    id: '3',
    name: 'Organic Mixed Berry Box',
    description: 'A mix of fresh organic strawberries, blueberries, and raspberries.',
    price: 7.99,
    image: '/berries.jpg',
    category: 'fresh',
    stock: 20,
    featured: true,
  },
  {
    id: '4',
    name: 'Premium Chicken Stir-Fry Kit',
    description: 'Everything you need for a delicious chicken stir-fry ready in 15 minutes.',
    price: 12.99,
    image: '/stirfry.jpg',
    category: 'meals',
    stock: 10,
  },
  {
    id: '5',
    name: 'Chocolate Lava Cake (2 pack)',
    description: 'Decadent chocolate cakes with a molten center, ready to heat and serve.',
    price: 8.49,
    image: '/lavacake.jpg',
    category: 'bakery',
    stock: 12,
    featured: true,
  },
  {
    id: '6',
    name: 'Farm Fresh Eggs (Dozen)',
    description: 'Free-range eggs from locally raised chickens.',
    price: 5.29,
    image: '/eggs.jpg',
    category: 'fresh',
    stock: 40,
  },
  {
    id: '7',
    name: 'Vegetable Lasagna',
    description: 'Hearty vegetable lasagna with layers of zucchini, eggplant, and ricotta cheese.',
    price: 14.99,
    image: '/lasagna.jpg',
    category: 'meals',
    stock: 8,
    featured: true,
  },
  {
    id: '8',
    name: 'Assorted Macaron Box (8 pieces)',
    description: 'Delicate French macarons in a variety of flavors.',
    price: 16.99,
    image: '/macarons.jpg',
    category: 'bakery',
    stock: 9,
  },
  {
    id: '9',
    name: 'Spinach and Feta Breakfast Wrap',
    description: 'Ready-to-heat breakfast wrap with spinach, feta, and cage-free eggs.',
    price: 6.99,
    image: '/breakfastwrap.jpg',
    category: 'meals',
    stock: 15,
  },
  {
    id: '10',
    name: 'Fresh Italian Basil Bunch',
    description: 'Aromatic fresh basil, perfect for pasta dishes and homemade pesto.',
    price: 3.49,
    image: '/basil.jpg',
    category: 'fresh',
    stock: 25,
  },
  {
    id: '11',
    name: 'Beef Bolognese Family Meal',
    description: 'Traditional beef bolognese with pasta, enough to feed a family of four.',
    price: 24.99,
    image: '/bolognese.jpg',
    category: 'meals',
    stock: 5,
    featured: true,
  },
  {
    id: '12',
    name: 'Artisan Cheese Platter',
    description: 'Selection of premium cheeses with dried fruits and crackers.',
    price: 18.99,
    image: '/cheeseplatter.jpg',
    category: 'fresh',
    stock: 7,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};
