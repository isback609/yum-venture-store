
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/utils/format';
import { ChevronLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock order data - in a real app, this would come from an API
  const order = {
    id: id || 'UNKNOWN',
    date: '2024-05-15',
    status: 'Shipped',
    total: 149.97,
    items: [
      { id: 1, name: 'Wireless Headphones', price: 89.99, quantity: 1, image: '/placeholder.svg' },
      { id: 2, name: 'Smartphone Case', price: 19.99, quantity: 3, image: '/placeholder.svg' },
    ],
    shipping: {
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    payment: {
      method: 'Credit Card',
      cardLast4: '4242',
    },
    timeline: [
      { date: '2024-05-15 10:30 AM', status: 'Order Placed', description: 'Your order has been received' },
      { date: '2024-05-15 11:45 AM', status: 'Payment Confirmed', description: 'Payment has been confirmed' },
      { date: '2024-05-16 09:20 AM', status: 'Processing', description: 'Your order is being processed' },
      { date: '2024-05-17 02:15 PM', status: 'Shipped', description: 'Your order has been shipped' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Shipped':
        return <Truck className="h-5 w-5 text-purple-600" />;
      case 'Processing':
        return <Package className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  return (
    <Layout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/orders" className="flex items-center">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          <h1 className="text-2xl font-bold md:text-3xl">Order #{order.id}</h1>
          <p className="text-muted-foreground">
            Placed on {new Date(order.date).toLocaleDateString()}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order Status</CardTitle>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${
                        index === order.timeline.length - 1 
                          ? 'bg-purple-100' 
                          : 'bg-gray-100'
                      }`}>
                        {index === order.timeline.length - 1 
                          ? getStatusIcon(event.status)
                          : <div className="h-2 w-2 rounded-full bg-gray-400" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <p className="text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md border bg-muted/50 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatCurrency(item.price)}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(order.total - 9.99)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatCurrency(9.99)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
                  <p>{order.shipping.country}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{order.payment.method} ending in {order.payment.cardLast4}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  If you have any questions about your order, please contact our customer support.
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
