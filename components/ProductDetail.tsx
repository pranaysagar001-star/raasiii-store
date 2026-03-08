'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Product } from '@/data/products';

export function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="py-16">
      <div className="section-wrap grid gap-10 lg:grid-cols-2">
        <div>
          <div className="group relative aspect-square overflow-hidden rounded-3xl border border-maroon/10 bg-white">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-125"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.images.map((img) => (
              <button
                key={img}
                className={`relative aspect-square overflow-hidden rounded-xl border ${selectedImage === img ? 'border-gold' : 'border-maroon/10'}`}
                onClick={() => setSelectedImage(img)}
              >
                <Image src={img} alt="thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="font-display text-5xl">{product.name}</h1>
          <p className="text-2xl font-semibold">INR {product.price}</p>
          <p className="text-maroon/80">{product.description}</p>

          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-[0.2em]">Size</label>
            <select value={size} onChange={(e) => setSize(e.target.value)}>
              {product.sizes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-[0.2em]">Quantity</label>
            <div className="flex max-w-40 items-center justify-between rounded-xl border border-maroon/20 bg-white px-4 py-2">
              <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          <button className="rounded-full border border-gold bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-maroon transition hover:bg-maroon hover:text-cream">
            Add to Cart
          </button>

          <div className="rounded-2xl border border-maroon/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Customer Reviews</p>
            <div className="mt-4 space-y-3">
              {product.reviews.map((review, index) => (
                <div key={`${review.name}-${index}`}>
                  <p className="text-sm text-maroon/80">"{review.text}"</p>
                  <p className="text-xs text-maroon/60">- {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
