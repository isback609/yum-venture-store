
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/format';
import { ChevronRight, Package, ShoppingBag } from 'lucide-react';

const Orders: React.FC = () => {
  // Mock orders data - in a real app, this would come from an API
  const orders = [
    { id: 'ORD-1234', date: '2024-05-15', status: 'Delivered', items: 3, total: 149.97 },
    { id: 'ORD-1235', date: '2024-05-10', status: 'Shipped', items: 2, total: 89.98 },
    { id: 'ORD-1236', date: '2024-05-05', status: 'Processing', items: 1, total: 59.99 },
    { id: 'ORD-1237', date: '2024-04-28', status: 'Delivered', items: 4, total: 199.96 },
  ];

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

  return (
    <Layout>
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="mb-6">
          <h1 className="text-2xl font-bold md:text-3xl">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage your orders
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet.
              </p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link to="/products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`hidden sm:inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-4">
                        <Package className="h-9 w-9 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                          <p className="font-medium">{formatCurrency(order.total)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex sm:hidden">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center border-t sm:border-t-0 sm:border-l p-4 sm:p-6">
                      <Button asChild variant="ghost" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                        <Link to={`/orders/${order.id}`} className="flex items-center">
                          View Details
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
