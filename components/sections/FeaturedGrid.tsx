'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function FeaturedGrid() {
  return (
    <section className="py-20">
      <div className="section-wrap">
        <SectionHeading title="Featured Bangles" subtitle="Designed to complement bridal, festive, and everyday ethnic looks." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product) => (
            <motion.div
              key={product.slug}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-3xl border border-maroon/10 bg-white shadow-luxe"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-3 p-5">
                <p className="font-display text-2xl">{product.name}</p>
                <p className="text-sm text-maroon/70">{product.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">INR {product.price}</p>
                  <Link href={`/product/${product.slug}`} className="text-xs uppercase tracking-[0.18em] text-gold hover:text-maroon">
                    View Product
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

