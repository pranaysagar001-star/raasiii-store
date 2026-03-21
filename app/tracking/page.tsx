'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/components/providers/StoreProvider';

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const { findOrder } = useStore();
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const fromQuery = searchParams.get('orderId');
    if (fromQuery) {
      setOrderId(fromQuery);
    }
  }, [searchParams]);

  const trackOrder = () => {
    const order = findOrder(orderId, phone || undefined);

    if (!order) {
      setResult('No order matched those details. Please check your order ID and phone number.');
      return;
    }

    setResult(
      `Order ${order.id} for ${order.customer.name} is currently ${order.status}. Payment: ${
        order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid via Razorpay'
      }.`
    );
  };

  return (
    <section className="py-16">
      <div className="section-wrap max-w-2xl premium-panel p-8">
        <h1 className="font-display text-4xl text-white">Track Your Order</h1>
        <p className="mt-2 text-sm text-white/70">Enter your order ID and phone number received during checkout or WhatsApp confirmation.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr,1fr,auto]">
          <input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="Order ID" className="flex-1" />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="Phone Number"
            maxLength={10}
            inputMode="numeric"
            className="flex-1"
          />
          <button onClick={trackOrder} className="rounded-full border border-gold bg-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-maroon">
            Track
          </button>
        </div>
        {result ? <p className="mt-5 text-sm text-white/75">{result}</p> : null}
      </div>
    </section>
  );
}
