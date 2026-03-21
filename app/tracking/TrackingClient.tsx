'use client';

import { useSearchParams } from 'next/navigation';

export default function TrackingClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="text-center text-white">
      <h1>Track Your Order</h1>
      <p>Order ID: {orderId}</p>
    </div>
  );
}