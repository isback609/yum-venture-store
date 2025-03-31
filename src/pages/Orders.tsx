import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Order } from '@/types/product';
import { formatDate, formatCurrency } from '@/utils/format';

const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch('/api/orders');
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
};

const OrdersPage: React.FC = () => {
  const { data: orders, isLoading, isError, error } = useQuery('orders', fetchOrders);

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-2">{formatCurrency(order.total)}</td>
                <td className="px-4 py-2">
                  <span className={`
                    inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${order.status === 'pending' ? 'bg-gray-200 text-gray-700'
                      : order.status === 'confirmed' ? 'bg-blue-200 text-blue-700'
                        : order.status === 'preparing' ? 'bg-yellow-200 text-yellow-700'
                          : order.status === 'out_for_delivery' ? 'bg-purple-200 text-purple-700'
                            : 'bg-green-200 text-green-700'}
                  `}>
                    {(order.status || '').charAt(0).toUpperCase() + (order.status || '').slice(1).replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Link to={`/orders/${order.id}`} className="text-blue-500 hover:text-blue-700">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
