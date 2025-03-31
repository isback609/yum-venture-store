
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, FileText, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminOrders: React.FC = () => {
  // Mock orders data
  const orders = [
    { id: 'ORD-001', customer: 'John Smith', date: '2024-05-01', status: 'Delivered', total: 125.99 },
    { id: 'ORD-002', customer: 'Sarah Johnson', date: '2024-05-02', status: 'Processing', total: 89.50 },
    { id: 'ORD-003', customer: 'Michael Brown', date: '2024-05-03', status: 'Shipped', total: 245.00 },
    { id: 'ORD-004', customer: 'Emma Wilson', date: '2024-05-03', status: 'Pending', total: 64.75 },
    { id: 'ORD-005', customer: 'David Lee', date: '2024-05-04', status: 'Delivered', total: 178.25 },
    { id: 'ORD-006', customer: 'Lisa Wang', date: '2024-05-04', status: 'Processing', total: 112.30 },
    { id: 'ORD-007', customer: 'Robert Chen', date: '2024-05-05', status: 'Pending', total: 59.99 },
    { id: 'ORD-008', customer: 'Jennifer Taylor', date: '2024-05-05', status: 'Shipped', total: 195.45 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search orders..." 
                  className="pl-8"
                />
              </div>
              <select className="rounded-md border border-input px-3 py-2 text-sm">
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-medium">Order ID</th>
                    <th className="p-3 text-left font-medium">Customer</th>
                    <th className="p-3 text-left font-medium">
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </th>
                    <th className="p-3 text-left font-medium">Status</th>
                    <th className="p-3 text-right font-medium">Total</th>
                    <th className="p-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b last:border-b-0 hover:bg-muted/50">
                      <td className="p-3">{order.id}</td>
                      <td className="p-3">{order.customer}</td>
                      <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">${order.total.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                          <FileText className="mr-1 h-4 w-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing 1-8 of 8 orders
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
