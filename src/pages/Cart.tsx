
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle, Trash2, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleClearCart = () => {
    clearCart();
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container flex flex-col items-center justify-center px-4 py-16">
          <div className="rounded-full bg-muted p-6">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Your Cart is Empty</h1>
          <p className="mb-6 mt-2 text-center text-muted-foreground max-w-md">
            Looks like you haven't added anything to your cart yet. Browse our products and find something delicious!
          </p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      </Layout>
    );
  }
  
  // For demo purposes, using a placeholder image
  const placeholderImage = `/placeholder.svg`;
  
  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Button
            variant="ghost"
            onClick={handleClearCart}
            className="text-muted-foreground hover:text-food-red"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <div key={item.product.id} className="mb-4 rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <Link to={`/products/${item.product.id}`} className="shrink-0">
                    <img
                      src={placeholderImage}
                      alt={item.product.name}
                      className="h-24 w-24 rounded-md object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/products/${item.product.id}`} className="text-lg font-medium hover:text-food-orange">
                      {item.product.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                      {item.product.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="price-tag">${(item.product.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-muted-foreground hover:text-food-red"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <Button 
                variant="outline" 
                asChild
                className="gap-2"
              >
                <Link to="/products">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="mt-4 w-full bg-food-orange hover:bg-food-orange/90"
                >
                  Proceed to Checkout
                </Button>
                <p className="mt-4 text-xs text-muted-foreground text-center">
                  Payment processing will be implemented later. This is just a UI demo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

// SVG icon component for empty cart
const ShoppingCart = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="8" cy="21" r="1"></circle>
    <circle cx="19" cy="21" r="1"></circle>
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
  </svg>
);
