'use client';

import { ResolvableImage } from '@/components/ResolvableImage';
import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';
import { formatPrice } from '@/lib/commerce';

export default function CartPage() {
  const { cart, cartTotal, updateCartQuantity, removeFromCart } = useStore();

  return (
    <section className="py-16">
      <div className="section-wrap grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="premium-panel p-8">
          <h1 className="font-display text-4xl">Your Cart</h1>
          <p className="mt-3 text-sm text-white/70">Review your selections before moving to checkout.</p>

          <div className="mt-8 space-y-4">
            {cart.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-white/15 p-8 text-sm text-white/55">
                Your cart is empty. Add a few beautiful bangles to unlock checkout.
              </div>
            ) : (
              cart.map((item) => (
                <article
                  key={`${item.slug}-${item.size}`}
                  className="grid gap-5 rounded-[24px] border border-white/10 bg-white/5 p-5 md:grid-cols-[120px,1fr,auto]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <ResolvableImage src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-display text-2xl text-white">{item.name}</p>
                    <p className="text-sm text-white/65">Size: {item.size}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-lg font-semibold text-white">₹{formatPrice(item.price)}</p>
                      <p className="text-sm text-white/40 line-through">₹{formatPrice(item.originalPrice)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3 md:items-end">
                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-white">
                      <button type="button" onClick={() => updateCartQuantity(item.slug, item.size, item.quantity - 1)}>
                        -
                      </button>
                      <span className="min-w-6 text-center">{item.quantity}</span>
                      <button type="button" onClick={() => updateCartQuantity(item.slug, item.size, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.slug, item.size)}
                      className="text-xs uppercase tracking-[0.18em] text-white/55 transition hover:text-gold"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <aside className="premium-panel space-y-5 p-8">
          <h2 className="font-display text-3xl">Summary</h2>
          <div className="space-y-2 text-sm text-white/75">
            <p>Items Total: ₹{formatPrice(cartTotal)}</p>
            <p>Shipping: Free Delivery Across India</p>
            <p className="font-semibold text-white">Grand Total: ₹{formatPrice(cartTotal)}</p>
          </div>
          <Link
            href="/checkout"
            className={`inline-flex w-full justify-center rounded-full border px-6 py-3 text-xs uppercase tracking-[0.2em] ${
              cart.length === 0
                ? 'pointer-events-none border-white/10 bg-white/5 text-white/40'
                : 'border-gold bg-gold text-maroon'
            }`}
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
