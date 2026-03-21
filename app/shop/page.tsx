'use client';

import { ProductCard } from '@/components/ProductCard';
import { useStore } from '@/components/providers/StoreProvider';

export default function ShopPage() {
  const { products } = useStore();

  return (
    <section className="py-16">
      <div className="section-wrap">
        <h1 className="font-display text-5xl text-white">Shop Bangles</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/70">
          Luxury threaded bangles curated for festive glamour and wedding elegance, now merchandised with stronger pricing, urgency, and faster purchase actions.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
