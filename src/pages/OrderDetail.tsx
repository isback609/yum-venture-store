import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format, formatDistanceToNow } from 'date-fns';
import { Loader2, Truck } from 'lucide-react';

import { Order } from '@/types/product';
import { formatDate, formatCurrency } from '@/utils/format';
import Layout from '@/components/Layout';

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { isLoading, error, data: order } = useQuery<Order>({
    queryKey: ['order', id],
    queryFn: async () => {
      const res = await fetch(`/api/orders/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch order');
      }
      return res.json();
    },
  });

  if (isLoading) return <Layout><div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-6 w-6" /></div></Layout>;
  if (error) return <Layout><div className="flex justify-center items-center h-screen text-red-500">Error: {(error as Error).message}</div></Layout>;
  if (!order) return <Layout><div className="flex justify-center items-center h-screen">Order not found</div></Layout>;

  const deliveryDate = order.estimatedDelivery ? new Date(order.estimatedDelivery) : null;

  return (
    <Layout>
      <div className="container mx-auto mt-8 p-4">
        <Link to="/orders" className="inline-block mb-4 text-blue-500 hover:underline">
          ← Back to Orders
        </Link>
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Order Information</h2>
            <p>Order ID: {order.id}</p>
            <p>Order Date: {formatDate(order.createdAt)}</p>
            <p>Delivery Address: {order.deliveryAddress}</p>
            <div className="flex items-center mt-2">
              Status:
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                order.status === 'pending' ? 'bg-yellow-200 text-yellow-700' :
                order.status === 'confirmed' ? 'bg-blue-200 text-blue-700' :
                order.status === 'preparing' ? 'bg-gray-200 text-gray-700' :
                order.status === 'out_for_delivery' ? 'bg-purple-200 text-purple-700 flex items-center' :
                'bg-green-200 text-green-700'
              }`}>
                {
                  (order.status || '').charAt(0).toUpperCase() + (order.status || '').slice(1).replace('_', ' ')
                }
                {order.status === 'out_for_delivery' && <Truck className="ml-1 w-4 h-4 inline-block" />}
              </span>
            </div>
            {deliveryDate && (
              <p>
                Estimated Delivery:{' '}
                {formatDistanceToNow(deliveryDate, { addSuffix: true })}
              </p>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.product.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {item.product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{item.quantity}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Total</h2>
            <p className="text-gray-900">
              {formatCurrency(order.total)}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;
