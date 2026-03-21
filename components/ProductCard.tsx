'use client';

import { ResolvableImage } from '@/components/ResolvableImage';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Product } from '@/data/products';
import { useStore } from '@/components/providers/StoreProvider';
import { formatPrice } from '@/lib/commerce';

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useStore();

  const handleAddToCart = () => {
    addToCart(product, product.sizes[0]);
  };

  const handleBuyNow = () => {
    addToCart(product, product.sizes[0]);
    router.push('/cart');
  };

  const badgeLabel = product.badge === 'Bestseller' ? 'Bestseller' : 'Trending';

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 text-white shadow-[0_18px_60px_rgba(5,8,15,0.26)] backdrop-blur-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="absolute left-4 top-4 z-10 flex gap-2">
          <span className="rounded-full border border-gold/30 bg-[#2b0811]/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f6d488] backdrop-blur-sm">
            {badgeLabel}
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
            {product.tag}
          </span>
        </div>
        <ResolvableImage
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0f1a] to-transparent" />
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <Link href={`/product/${product.slug}`} className="block font-display text-2xl transition group-hover:text-gold">
            {product.name}
          </Link>
          <p className="text-sm text-white/65">{product.shortDescription}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <p className="text-2xl font-semibold text-white">₹{formatPrice(product.discountPrice)}</p>
          <p className="text-sm text-white/40 line-through">₹{formatPrice(product.price)}</p>
          <p className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Save ₹{formatPrice(product.price - product.discountPrice)}
          </p>
        </div>

        <div className="grid gap-2 text-xs uppercase tracking-[0.18em] text-white/70 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">Limited Stock Available</div>
          <div className="rounded-2xl border border-gold/20 bg-gold/10 px-3 py-2 text-gold">Sale Ends Tonight</div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:-translate-y-0.5 hover:border-gold hover:text-gold"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="rounded-full border border-gold bg-gold px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-maroon shadow-glow transition hover:-translate-y-0.5 hover:bg-[#f1c96a]"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.article>
  );
}
