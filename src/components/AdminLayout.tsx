
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout } = useAdmin();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white hidden md:block">
        <div className="p-6">
          <Link to="/admin" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-purple-400">Dhiraj</span>
            <span>Admin</span>
          </Link>
        </div>
        <nav className="px-4 py-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                    location.pathname === item.path
                      ? "bg-purple-700 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-2 mt-auto absolute bottom-4 w-full">
          <Button
            variant="ghost"
            className="flex w-full items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors mt-2"
          >
            <span>Back to Store</span>
          </Link>
        </div>
      </div>

      {/* Mobile header and content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center md:hidden">
          <Link to="/admin" className="text-xl font-bold">
            <span className="text-purple-600">Dhiraj Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
            <Link to="/">
              <Button variant="ghost" size="sm">
                Back
              </Button>
            </Link>
          </div>
        </header>
        
        {/* Breadcrumb */}
        <div className="bg-gray-50 px-6 py-3">
          <div className="flex items-center text-sm">
            <Link to="/admin" className="text-gray-500 hover:text-purple-600">Admin</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="font-medium text-gray-900">{location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1) || 'Dashboard'}</span>
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
