
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <section className="py-6">
      {title && (
        <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
