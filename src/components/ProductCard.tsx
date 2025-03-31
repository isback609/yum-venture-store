
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Use placeholder images for demo
  const placeholderImage = `/placeholder.svg`;

  return (
    <Link 
      to={`/products/${product.id}`}
      className={cn("product-card group", className)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={placeholderImage}
          alt={product.name}
          className="product-card-image"
        />
        <span className="category-badge absolute left-2 top-2">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-medium">{product.name}</h3>
        <p className="line-clamp-2 mt-1 text-sm text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="price-tag text-lg">${product.price.toFixed(2)}</span>
          <Button 
            onClick={handleAddToCart}
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            Add
          </Button>
        </div>
        {product.stock < 10 && (
          <p className="mt-1 text-xs text-food-red">
            Only {product.stock} left in stock
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
