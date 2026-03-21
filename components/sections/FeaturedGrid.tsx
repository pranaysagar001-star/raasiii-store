'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/components/providers/StoreProvider';

export function FeaturedGrid() {
  const { products } = useStore();

  return (
    <section id="collection" className="py-20">
      <div className="section-wrap">
        <SectionHeading title="Featured Bangles" subtitle="Designed to move customers from first glance to checkout with premium styling, visible savings, and instant purchase options." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

