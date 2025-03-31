
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Order as OrderType } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils/format';

// Mock orders data
const mockOrders: OrderType[] = [
  {
    id: 'ORD7823X4',
    items: [],
    total: 42.97,
    status: 'delivered',
    createdAt: '2024-04-10T14:30:00Z',
    deliveryAddress: '123 Main St, San Francisco, CA 94122',
    estimatedDelivery: '2024-04-12T14:30:00Z',
  },
  {
    id: 'ORD4567Y2',
    items: [],
    total: 67.45,
    status: 'out_for_delivery',
    createdAt: '2024-04-15T09:45:00Z',
    deliveryAddress: '123 Main St, San Francisco, CA 94122',
    estimatedDelivery: '2024-04-16T12:00:00Z',
  },
  {
    id: 'ORD9012Z8',
    items: [],
    total: 23.94,
    status: 'preparing',
    createdAt: '2024-04-16T11:20:00Z',
    deliveryAddress: '123 Main St, San Francisco, CA 94122',
    estimatedDelivery: '2024-04-17T15:00:00Z',
  },
];

const OrdersPage: React.FC = () => {
  return (
    <Layout>
      <div className="container px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">My Orders</h1>
        
        {mockOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-muted-foreground">
              <path d="M9 14 4 9l5-5"></path>
              <path d="M4 9h16"></path>
              <path d="M15 4v10"></path>
              <path d="M15 14l5 5-5 5"></path>
            </svg>
            <h2 className="text-xl font-semibold">No Orders Yet</h2>
            <p className="mt-2 text-muted-foreground max-w-md">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button asChild className="mt-6 bg-food-orange hover:bg-food-orange/90">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="rounded-lg border p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium">${order.total.toFixed(2)}</p>
                    <Button asChild variant="link" className="px-0 text-food-orange">
                      <Link to={`/orders/${order.id}`}>View Order Details</Link>
                    </Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">Shipping Address</p>
                      <p className="text-sm text-muted-foreground">
                        {order.deliveryAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Estimated Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        {order.estimatedDelivery 
                          ? formatDate(order.estimatedDelivery) 
                          : 'Not available'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;

// Order Status Badge Component
const OrderStatusBadge: React.FC<{ status: OrderType['status'] }> = ({ status }) => {
  let bgColor = '';
  let textColor = '';
  let label = '';
  
  switch (status) {
    case 'pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      label = 'Pending';
      break;
    case 'confirmed':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      label = 'Confirmed';
      break;
    case 'preparing':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
      label = 'Preparing';
      break;
    case 'out_for_delivery':
      bgColor = 'bg-food-lightOrange';
      textColor = 'text-food-orange';
      label = 'Out for Delivery';
      break;
    case 'delivered':
      bgColor = 'bg-food-lightGreen';
      textColor = 'text-food-green';
      label = 'Delivered';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      label = status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
  }
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${bgColor} ${textColor}`}>
      {label}
    </span>
  );
};
