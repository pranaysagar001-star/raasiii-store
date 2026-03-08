'use client';

import { useState } from 'react';

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState('');

  const trackOrder = () => {
    if (!orderId.trim()) {
      setResult('Please enter a valid order ID.');
      return;
    }
    setResult(`Order ${orderId.toUpperCase()} is in transit and expected within 2-4 business days.`);
  };

  return (
    <section className="py-16">
      <div className="section-wrap max-w-2xl rounded-3xl border border-maroon/10 bg-white p-8 shadow-luxe">
        <h1 className="font-display text-4xl">Track Your Order</h1>
        <p className="mt-2 text-sm text-maroon/75">Enter your order ID received via email/WhatsApp.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Order ID" className="flex-1" />
          <button onClick={trackOrder} className="rounded-full border border-gold bg-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-maroon">
            Track
          </button>
        </div>
        {result ? <p className="mt-5 text-sm text-maroon/80">{result}</p> : null}
      </div>
    </section>
  );
}
