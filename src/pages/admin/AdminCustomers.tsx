
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Mail, Phone, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminCustomers: React.FC = () => {
  // Mock customers data
  const customers = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '(555) 123-4567', orders: 5, spent: 297.45 },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', phone: '(555) 234-5678', orders: 3, spent: 185.90 },
    { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com', phone: '(555) 345-6789', orders: 7, spent: 512.75 },
    { id: 4, name: 'Emma Wilson', email: 'emma.wilson@example.com', phone: '(555) 456-7890', orders: 2, spent: 128.50 },
    { id: 5, name: 'David Lee', email: 'david.lee@example.com', phone: '(555) 567-8901', orders: 4, spent: 345.20 },
    { id: 6, name: 'Lisa Wang', email: 'lisa.wang@example.com', phone: '(555) 678-9012', orders: 6, spent: 423.75 },
    { id: 7, name: 'Robert Chen', email: 'robert.chen@example.com', phone: '(555) 789-0123', orders: 1, spent: 59.99 },
    { id: 8, name: 'Jennifer Taylor', email: 'jennifer.taylor@example.com', phone: '(555) 890-1234', orders: 8, spent: 675.33 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <User className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search customers..." 
                className="pl-8"
              />
            </div>

            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-medium">ID</th>
                    <th className="p-3 text-left font-medium">Name</th>
                    <th className="p-3 text-left font-medium">Email</th>
                    <th className="p-3 text-left font-medium">Phone</th>
                    <th className="p-3 text-center font-medium">Orders</th>
                    <th className="p-3 text-right font-medium">Total Spent</th>
                    <th className="p-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b last:border-b-0 hover:bg-muted/50">
                      <td className="p-3">{customer.id}</td>
                      <td className="p-3 font-medium">{customer.name}</td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          {customer.email}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          {customer.phone}
                        </div>
                      </td>
                      <td className="p-3 text-center">{customer.orders}</td>
                      <td className="p-3 text-right">${customer.spent.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
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
                Showing 1-8 of 8 customers
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

export default AdminCustomers;
