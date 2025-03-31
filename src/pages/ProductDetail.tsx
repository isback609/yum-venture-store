
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';
import { Heart, MinusCircle, PlusCircle, ShoppingCart } from 'lucide-react';
import { toast } from "sonner";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProductById(id) : undefined;
  
  if (!product) {
    return (
      <Layout>
        <div className="container flex flex-col items-center justify-center px-4 py-16">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="mb-6 mt-2 text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/products')}>
            Browse All Products
          </Button>
        </div>
      </Layout>
    );
  }
  
  const relatedProducts = getRelatedProducts(product);
  
  const handleIncrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(q => q + 1);
    } else {
      toast.error("Maximum available stock reached");
    }
  };
  
  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  // Use placeholder images for demo
  const placeholderImage = `/placeholder.svg`;
  
  return (
    <Layout>
      <div className="container px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-food-orange">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-food-orange">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-food-orange">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
        
        {/* Product detail */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg overflow-hidden border">
            <img
              src={placeholderImage}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <span className="category-badge mt-2">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
            </div>
            
            <p className="price-tag text-3xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
            
            <p className="text-muted-foreground">
              {product.description}
            </p>
            
            <div className="pt-2">
              <p className="mb-2 text-sm text-muted-foreground">
                Availability: 
                <span className={product.stock > 0 ? "text-food-green ml-1" : "text-food-red ml-1"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              {product.stock < 10 && product.stock > 0 && (
                <p className="text-sm text-food-red">
                  Only {product.stock} left in stock
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecrementQuantity}
                  disabled={quantity <= 1}
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleIncrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-food-orange hover:bg-food-orange/90"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <ProductGrid
              products={relatedProducts}
              title="You Might Also Like"
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
