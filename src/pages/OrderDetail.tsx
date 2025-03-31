
import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Order as OrderType } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils/format';
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get order details from location state (if redirected from checkout)
  // or use a mock order for demo purposes
  const orderDetails = location.state?.orderDetails as OrderType | undefined;
  
  useEffect(() => {
    // If we have order details from checkout, store in session storage
    if (orderDetails) {
      sessionStorage.setItem(`order-${id}`, JSON.stringify(orderDetails));
    }
  }, [id, orderDetails]);
  
  // Try to get order from session storage
  const getOrderFromStorage = (): OrderType | null => {
    const storedOrder = sessionStorage.getItem(`order-${id}`);
    return storedOrder ? JSON.parse(storedOrder) : null;
  };
  
  // Use order from state, session storage, or fall back to a mock order
  const order = orderDetails || getOrderFromStorage() || {
    id: id || 'UNKNOWN',
    items: [],
    total: 57.85,
    status: 'preparing' as OrderType['status'],
    createdAt: new Date().toISOString(),
    deliveryAddress: '123 Main St, San Francisco, CA 94122',
    estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
  
  const getProgressPercent = (status: OrderType['status']) => {
    switch(status) {
      case 'pending': return 0;
      case 'confirmed': return 25;
      case 'preparing': return 50;
      case 'out_for_delivery': return 75;
      case 'delivered': return 100;
      default: return 0;
    }
  };
  
  const progressPercent = getProgressPercent(order.status);
  
  // For demo purposes, using a placeholder image
  const placeholderImage = `/placeholder.svg`;
  
  return (
    <Layout>
      <div className="container px-4 py-8">
        <Button 
          variant="ghost" 
          asChild 
          className="mb-6"
        >
          <Link to="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
        
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
            <p className="mt-1 text-muted-foreground">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
        
        {/* Order Progress */}
        <div className="mb-10 rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Order Status</h2>
          
          <div className="relative mb-8 h-2 rounded-full bg-muted">
            <div 
              className="absolute left-0 top-0 h-2 rounded-full bg-food-orange" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <OrderProgressStep 
              icon={<CheckCircle />}
              title="Order Confirmed"
              date={formatDate(order.createdAt)}
              isActive={['confirmed', 'preparing', 'out_for_delivery', 'delivered'].includes(order.status)}
            />
            <OrderProgressStep 
              icon={<Package />}
              title="Preparing"
              date={order.status === 'pending' ? 'Upcoming' : formatDate(new Date(+new Date(order.createdAt) + 2 * 60 * 60 * 1000).toISOString())}
              isActive={['preparing', 'out_for_delivery', 'delivered'].includes(order.status)}
            />
            <OrderProgressStep 
              icon={<Truck />}
              title="Out for Delivery"
              date={['pending', 'confirmed', 'preparing'].includes(order.status) ? 'Upcoming' : formatDate(new Date(+new Date(order.createdAt) + 4 * 60 * 60 * 1000).toISOString())}
              isActive={['out_for_delivery', 'delivered'].includes(order.status)}
            />
            <OrderProgressStep 
              icon={<CheckCircle />}
              title="Delivered"
              date={order.status === 'delivered' ? formatDate(order.estimatedDelivery || '') : 'Upcoming'}
              isActive={order.status === 'delivered'}
            />
          </div>
        </div>
        
        {/* Order Details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Items</h2>
              
              {/* Use mock items for demo */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
                    <img
                      src={placeholderImage}
                      alt="Product"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium">
                      Artisan Sourdough Bread
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: 2
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="price-tag">$12.98</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
                    <img
                      src={placeholderImage}
                      alt="Product"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium">
                      Organic Mixed Berry Box
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: 1
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="price-tag">$7.99</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
                    <img
                      src={placeholderImage}
                      alt="Product"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-medium">
                      Premium Chicken Stir-Fry Kit
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Quantity: 1
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="price-tag">$12.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="rounded-lg border p-6 space-y-6">
              <div>
                <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 font-medium">Shipping Address</h3>
                <p className="text-sm text-muted-foreground">
                  {order.deliveryAddress}
                </p>
              </div>
              
              <div>
                <h3 className="mb-2 font-medium">Estimated Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  {order.estimatedDelivery 
                    ? formatDate(order.estimatedDelivery) 
                    : 'Not available'}
                </p>
              </div>
              
              <Button 
                asChild 
                className="w-full bg-food-orange hover:bg-food-orange/90"
              >
                <Link to="/products">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;

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
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${bgColor} ${textColor}`}>
      {label}
    </span>
  );
};

// Order Progress Step Component
interface OrderProgressStepProps {
  icon: React.ReactNode;
  title: string;
  date: string;
  isActive: boolean;
}

const OrderProgressStep: React.FC<OrderProgressStepProps> = ({
  icon,
  title,
  date,
  isActive,
}) => {
  return (
    <div className={`flex flex-col items-center text-center ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
      <div className={`mb-2 rounded-full p-2 ${isActive ? 'bg-food-orange text-white' : 'bg-muted'}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' })}
      </div>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-1 text-xs">{date}</p>
    </div>
  );
};
