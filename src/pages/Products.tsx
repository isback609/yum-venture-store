
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';
import { products, getProductsByCategory } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  useEffect(() => {
    let result = [...products];
    
    // Filter by category if specified
    if (category) {
      result = getProductsByCategory(category);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(result);
  }, [category, searchQuery]);
  
  const handleCategoryChange = (newCategory: string) => {
    if (category === newCategory) {
      // If clicking the active category, clear it
      searchParams.delete('category');
    } else {
      searchParams.set('category', newCategory);
    }
    setSearchParams(searchParams);
  };
  
  const categoryButtons = [
    { id: 'fresh', label: 'Fresh Produce' },
    { id: 'bakery', label: 'Bakery' },
    { id: 'meals', label: 'Ready Meals' },
  ];
  
  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {category 
              ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` 
              : 'All Products'}
          </h1>
          
          {/* Search and filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categoryButtons.map((catBtn) => (
                <Button
                  key={catBtn.id}
                  variant={category === catBtn.id ? "default" : "outline"}
                  onClick={() => handleCategoryChange(catBtn.id)}
                  className={category === catBtn.id ? "bg-food-orange hover:bg-food-orange/90" : ""}
                >
                  {catBtn.label}
                </Button>
              ))}
              {category && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    searchParams.delete('category');
                    setSearchParams(searchParams);
                  }}
                >
                  Clear Filter
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="my-16 text-center">
            <h3 className="text-xl font-medium">No products found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
