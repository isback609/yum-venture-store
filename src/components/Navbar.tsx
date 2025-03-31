
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, User, Menu, Search, Home } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const { totalItems } = useCart();
  const isMobile = useIsMobile();

  const NavLinks = () => (
    <div className="flex items-center gap-6">
      <Link to="/" className="text-foreground hover:text-food-orange transition-colors">
        Home
      </Link>
      <Link to="/products" className="text-foreground hover:text-food-orange transition-colors">
        Products
      </Link>
      <Link to="/about" className="text-foreground hover:text-food-orange transition-colors">
        About
      </Link>
      <Link to="/orders" className="text-foreground hover:text-food-orange transition-colors">
        My Orders
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] md:w-[300px]">
                <div className="flex flex-col gap-6 py-4">
                  <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                    <Home className="h-5 w-5 text-food-orange" />
                    <span>YumVenture</span>
                  </Link>
                  <div className="flex flex-col gap-4">
                    <Link to="/" className="text-foreground hover:text-food-orange transition-colors">
                      Home
                    </Link>
                    <Link to="/products" className="text-foreground hover:text-food-orange transition-colors">
                      Products
                    </Link>
                    <Link to="/about" className="text-foreground hover:text-food-orange transition-colors">
                      About
                    </Link>
                    <Link to="/orders" className="text-foreground hover:text-food-orange transition-colors">
                      My Orders
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-food-orange">Yum</span>
            <span className="text-food-green">Venture</span>
          </Link>
        </div>
        {!isMobile && <NavLinks />}
        <div className="hidden md:flex relative max-w-sm items-center">
          <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 max-w-xs"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="hidden md:flex"
          >
            <Link to="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative"
          >
            <Link to="/cart">
              <ShoppingCart className={cn(
                "h-5 w-5", 
                totalItems > 0 && "text-food-orange"
              )} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-food-orange text-[10px] font-medium text-white animate-cart-bounce">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
