import Link from 'next/link';

export default function CartPage() {
  return (
    <section className="py-16">
      <div className="section-wrap grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-3xl border border-maroon/10 bg-white p-8 shadow-luxe">
          <h1 className="font-display text-4xl">Your Cart</h1>
          <p className="mt-3 text-sm text-maroon/75">Cart state can be connected to your preferred store backend.</p>
          <div className="mt-6 rounded-2xl border border-dashed border-maroon/25 p-6 text-sm text-maroon/60">
            Sample item: Maroon Gold Festival Stack x 1
          </div>
        </div>

        <aside className="space-y-4 rounded-3xl border border-maroon/10 bg-white p-8 shadow-luxe">
          <h2 className="font-display text-3xl">Summary</h2>
          <div className="space-y-2 text-sm">
            <p>Subtotal: INR 1899</p>
            <p>Estimated Shipping: INR 120</p>
          </div>
          <Link href="/checkout" className="inline-block rounded-full border border-gold bg-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-maroon">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}
