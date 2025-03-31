import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { Product, CartItem } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);
  
  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // If item exists, update quantity
        const newQuantity = existingItem.quantity + quantity;
        
        // Check if we have enough stock
        if (newQuantity > product.stock) {
          toast.error("Not enough stock available");
          return prevItems;
        }
        
        const updatedItems = prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: newQuantity } 
            : item
        );
        
        toast.success(`Updated ${product.name} quantity in your cart`);
        return updatedItems;
      } else {
        // If item doesn't exist, add it
        if (quantity > product.stock) {
          toast.error("Not enough stock available");
          return prevItems;
        }
        
        toast.success(`Added ${product.name} to your cart`);
        return [...prevItems, { product, quantity }];
      }
    });
  };
  
  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.product.name} from your cart`);
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prevItems => {
      const productToUpdate = prevItems.find(item => item.product.id === productId)?.product;
      
      if (!productToUpdate) {
        return prevItems;
      }
      
      // Check if we have enough stock
      if (quantity > productToUpdate.stock) {
        toast.error("Not enough stock available");
        return prevItems;
      }
      
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        return prevItems.filter(item => item.product.id !== productId);
      }
      
      // Otherwise update the quantity
      return prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      );
    });
  };
  
  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared");
  };
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider 
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
