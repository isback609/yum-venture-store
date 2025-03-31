
import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Edit, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AdminProducts: React.FC = () => {
  // Mock products data
  const products = [
    { id: 1, name: 'Wireless Headphones', price: 89.99, category: 'Electronics', stock: 45 },
    { id: 2, name: 'Cotton T-Shirt', price: 19.99, category: 'Clothing', stock: 120 },
    { id: 3, name: 'Smart Watch', price: 199.99, category: 'Electronics', stock: 32 },
    { id: 4, name: 'Ceramic Mug', price: 12.99, category: 'Home Goods', stock: 67 },
    { id: 5, name: 'Leather Wallet', price: 49.99, category: 'Accessories', stock: 23 },
    { id: 6, name: 'Bluetooth Speaker', price: 79.99, category: 'Electronics', stock: 18 },
    { id: 7, name: 'Desk Lamp', price: 34.99, category: 'Home Goods', stock: 52 },
    { id: 8, name: 'Running Shoes', price: 89.99, category: 'Footwear', stock: 38 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search products..." 
                  className="pl-8"
                />
              </div>
              <select className="rounded-md border border-input px-3 py-2 text-sm">
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home Goods">Home Goods</option>
                <option value="Accessories">Accessories</option>
                <option value="Footwear">Footwear</option>
              </select>
            </div>

            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-medium">ID</th>
                    <th className="p-3 text-left font-medium">Product Name</th>
                    <th className="p-3 text-left font-medium">Category</th>
                    <th className="p-3 text-left font-medium">Price</th>
                    <th className="p-3 text-left font-medium">Stock</th>
                    <th className="p-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b last:border-b-0 hover:bg-muted/50">
                      <td className="p-3">{product.id}</td>
                      <td className="p-3 font-medium">{product.name}</td>
                      <td className="p-3">{product.category}</td>
                      <td className="p-3">${product.price.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          product.stock > 50 ? 'bg-green-100 text-green-800' :
                          product.stock > 20 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing 1-8 of 8 products
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

export default AdminProducts;
