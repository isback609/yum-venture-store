
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">
              <span className="text-purple-600">Dhiraj</span>
              <span className="text-purple-800">Store</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Quality products at affordable prices delivered to your door.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/products" className="hover:text-purple-500 transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="hover:text-purple-500 transition-colors">Electronics</Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="hover:text-purple-500 transition-colors">Clothing</Link>
              </li>
              <li>
                <Link to="/products?category=home" className="hover:text-purple-500 transition-colors">Home Goods</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Account</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/account" className="hover:text-purple-500 transition-colors">My Account</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-purple-500 transition-colors">Orders</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-purple-500 transition-colors">Cart</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Info</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-purple-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-500 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-purple-500 transition-colors">Admin</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Dhiraj Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
