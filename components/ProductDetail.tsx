'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ResolvableImage } from '@/components/ResolvableImage';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import type { Product } from '@/data/products';
import { useStore } from '@/components/providers/StoreProvider';
import { formatPrice } from '@/lib/commerce';
import { ProductCard } from '@/components/ProductCard';

export function ProductDetail({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const router = useRouter();
  const { addToCart } = useStore();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImage(product.images[0]);
  }, [product.slug, product.images[0], product.images.length]);

  const addCurrentProduct = () => addToCart(product, size, quantity);

  const handleBuyNow = () => {
    addCurrentProduct();
    router.push('/cart');
  };

  const whatsappLink = useMemo(() => {
    const message = `Hi, I want to order this bangle:\nProduct: ${product.name}\nPrice: ₹${formatPrice(product.discountPrice)}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [product.discountPrice, product.name]);

  return (
    <section className="py-16">
      <div className="section-wrap space-y-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <div className="group relative aspect-square overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-md">
              <ResolvableImage src={selectedImage} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-125" />
              <div className="absolute left-4 top-4 rounded-full bg-[#130c12]/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gold">
                Hover to Zoom
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.images.map((img, thumbIndex) => (
                <button
                  key={`${img}-${thumbIndex}`}
                  type="button"
                  className={`relative aspect-square overflow-hidden rounded-2xl border ${
                    selectedImage === img ? 'border-gold shadow-glow' : 'border-white/10'
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <ResolvableImage src={img} alt={`${product.name} thumbnail`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 text-white">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
                <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-2 text-gold">
                  {product.badge === 'Bestseller' ? 'Bestseller' : 'Trending'}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/75">{product.tag}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white/75">Free delivery across India</span>
              </div>
              <h1 className="font-display text-5xl">{product.name}</h1>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-3xl font-semibold text-white">₹{formatPrice(product.discountPrice)}</p>
                <p className="text-lg text-white/40 line-through">₹{formatPrice(product.price)}</p>
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Flat 20% OFF Today
                </span>
              </div>
              <div className="grid gap-3 text-xs uppercase tracking-[0.18em] sm:grid-cols-2">
                <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/75">Limited Stock Available</span>
                <span className="rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-gold">Sale Ends Tonight</span>
              </div>
              <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
                Only {product.stock} pieces left in stock. Order today for your next special event.
              </p>
            </div>

            <p className="text-white/75">{product.description}</p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-[0.2em] text-white/70">Select Size</label>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  {product.sizes.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-[0.2em] text-white/70">Quantity</label>
                <div className="flex max-w-44 items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white">
                  <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                    -
                  </button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => setQuantity((q) => q + 1)}>
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={addCurrentProduct}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-gold hover:text-gold"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                className="rounded-full border border-gold bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-maroon transition hover:bg-[#efc86a]"
              >
                Buy Now
              </button>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full border border-[#1f9d55]/20 bg-[#eaf8ef] px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#1f9d55] transition hover:bg-[#d7f0df]"
            >
              Quick Order on WhatsApp
            </a>
          </div>
        </div>

        <div className="premium-panel p-8">
          <div className="flex items-center gap-2 text-gold">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={`${product.slug}-${index}`} className="h-4 w-4 fill-current" />
            ))}
            <span className="ml-2 text-xs uppercase tracking-[0.18em] text-white/60">Verified customer reviews</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {product.reviews.map((review, index) => (
              <article key={`${review.name}-${index}`} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-7 text-white/75">"{review.text}"</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">{review.name}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gold">More to Love</p>
              <h2 className="font-display text-4xl text-white">Related Products</h2>
            </div>
            <Link href="/shop" className="text-sm text-white/65 transition hover:text-gold">
              View full collection
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
