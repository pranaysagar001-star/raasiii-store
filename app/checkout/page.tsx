'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [pincode, setPincode] = useState('');
  const [shipping, setShipping] = useState<string | null>(null);

  const calcShipping = () => {
    const code = Number(pincode);
    if (!Number.isInteger(code) || pincode.length !== 6) {
      setShipping('Enter a valid 6-digit PIN code.');
      return;
    }

    const estimate = code % 2 === 0 ? 99 : 149;
    setShipping(`Estimated shipping: INR ${estimate} (3-6 business days)`);
  };

  return (
    <section className="py-16">
      <div className="section-wrap grid gap-8 lg:grid-cols-[2fr,1fr]">
        <form className="space-y-5 rounded-3xl border border-maroon/10 bg-white p-8 shadow-luxe">
          <h1 className="font-display text-4xl">Checkout</h1>
          <input placeholder="Full Name" />
          <input placeholder="Phone Number" />
          <input placeholder="Address" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="PIN Code" />
            <button
              type="button"
              onClick={calcShipping}
              className="rounded-xl border border-maroon/30 px-4 py-3 text-xs uppercase tracking-[0.2em] transition hover:border-gold hover:text-gold"
            >
              Calculate Shipping
            </button>
          </div>
          {shipping ? <p className="text-sm text-maroon/75">{shipping}</p> : null}

          <div className="rounded-2xl border border-maroon/10 bg-cream p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Payment Options</p>
            <div className="mt-3 space-y-2 text-sm text-maroon/80">
              <label className="flex items-center gap-2"><input type="radio" name="payment" defaultChecked /> Stripe (International Cards)</label>
              <label className="flex items-center gap-2"><input type="radio" name="payment" /> Razorpay (India UPI/Cards/Netbanking)</label>
            </div>
            <p className="mt-3 text-xs text-maroon/60">Connect your Stripe and Razorpay keys in backend API routes before going live.</p>
          </div>

          <button className="rounded-full border border-gold bg-gold px-8 py-3 text-xs uppercase tracking-[0.2em] text-maroon transition hover:bg-maroon hover:text-cream">
            Place Order
          </button>
        </form>

        <aside className="rounded-3xl border border-maroon/10 bg-white p-8 shadow-luxe">
          <h2 className="font-display text-3xl">Order Summary</h2>
          <div className="mt-5 space-y-2 text-sm text-maroon/80">
            <p>Subtotal: INR 1899</p>
            <p>Shipping: Calculated at checkout</p>
            <p className="font-semibold">Total: INR 1899 + shipping</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
