
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';
import { getFeaturedProducts } from '@/data/products';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-food-cream">
        <div className="container flex flex-col items-center gap-8 px-4 py-12 text-center md:flex-row md:text-left lg:py-20">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-food-orange">Fresh Food</span> <br />
              <span>Delivered to Your Door</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:mx-0">
              Farm-fresh ingredients, gourmet meals, and artisanal treats — all just a few clicks away.
            </p>
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Button asChild size="lg" className="bg-food-orange hover:bg-food-orange/90">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="/placeholder.svg"
              alt="Fresh food selection"
              className="mx-auto h-[300px] w-[400px] rounded-lg object-cover shadow-lg md:h-[400px] md:w-[500px]"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">
          Browse Categories
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Link 
            to="/products?category=fresh" 
            className="group relative overflow-hidden rounded-lg"
          >
            <img
              src="/placeholder.svg"
              alt="Fresh Produce"
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex items-end">
              <h3 className="text-xl font-semibold text-white">Fresh Produce</h3>
            </div>
          </Link>
          <Link 
            to="/products?category=bakery" 
            className="group relative overflow-hidden rounded-lg"
          >
            <img
              src="/placeholder.svg"
              alt="Bakery Items"
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex items-end">
              <h3 className="text-xl font-semibold text-white">Bakery Items</h3>
            </div>
          </Link>
          <Link 
            to="/products?category=meals" 
            className="group relative overflow-hidden rounded-lg"
          >
            <img
              src="/placeholder.svg"
              alt="Ready Meals"
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex items-end">
              <h3 className="text-xl font-semibold text-white">Ready Meals</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container px-4 py-12">
        <ProductGrid products={featuredProducts} title="Featured Products" />
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/50 py-12">
        <div className="container px-4">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight">
            Why Choose YumVenture?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-food-lightOrange p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-food-orange">
                  <path d="M12 22v-5"></path><path d="m9 8 3-6 3 6"></path><path d="M9 8h6"></path><path d="m15 8-3.5 8-2.5-4H8"></path><path d="M13.5 8h.5"></path><path d="M17 17h.5"></path><path d="m14 17 3.5-8 2.5 5h.5"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Farm-Fresh Quality
              </h3>
              <p className="text-muted-foreground">
                We source directly from local farms to ensure the freshest ingredients.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-food-lightGreen p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-food-green">
                  <path d="M5 12h14"></path><path d="M12 5v14"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Same-Day Delivery
              </h3>
              <p className="text-muted-foreground">
                Order by noon for same-day delivery to your doorstep.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-food-lightOrange p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-food-orange">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Satisfaction Guaranteed
              </h3>
              <p className="text-muted-foreground">
                Not satisfied? We'll refund or replace any item, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
