
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from "sonner";
import { CreditCard, Truck } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        toast.error(`Please fill in your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    
    // In a real app, we would process the order here
    
    // Create a mock order ID
    const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    // Clear the cart
    clearCart();
    
    // Redirect to order confirmation
    navigate(`/orders/${orderId}`, { 
      state: { 
        orderPlaced: true,
        orderDetails: {
          id: orderId,
          items,
          total: subtotal,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
          deliveryAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
          estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        }
      } 
    });
  };
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <Layout>
      <div className="container px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 flex items-center text-xl font-semibold">
                  <Truck className="mr-2 h-5 w-5 text-food-orange" />
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 flex items-center text-xl font-semibold">
                  <CreditCard className="mr-2 h-5 w-5 text-food-orange" />
                  Payment Information
                </h2>
                <p className="mb-4 text-muted-foreground">
                  Payment processing will be implemented later with Stripe. For now, you can place the order without entering payment details.
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-food-orange hover:bg-food-orange/90"
              >
                Place Order
              </Button>
            </form>
          </div>
          
          <div className="lg:col-span-1">
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="mt-4 space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <div>
                      <span>{item.quantity} x {item.product.name}</span>
                    </div>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
