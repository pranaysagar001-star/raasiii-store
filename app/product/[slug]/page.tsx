'use client';

import { useEffect } from 'react';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/ProductDetail';
import { useStore } from '@/components/providers/StoreProvider';
import { trackEvent } from '@/lib/analytics';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { products, isReady } = useStore();

  if (!isReady) {
    return (
      <section className="py-16">
        <div className="section-wrap premium-panel p-8 text-sm text-white/70">Loading product details...</div>
      </section>
    );
  }

  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  useEffect(() => {
    trackEvent({ type: 'view_product', slug: product.slug });
  }, [product.slug]);

  const relatedProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
