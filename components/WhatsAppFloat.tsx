'use client';

import { MessageCircle } from 'lucide-react';
import { useMemo } from 'react';
import { useStore } from '@/components/providers/StoreProvider';
import { formatPrice } from '@/lib/commerce';

export function WhatsAppFloat() {
  const { cart } = useStore();

  const whatsappLink = useMemo(() => {
    const firstItem = cart[0];
    const message = firstItem
      ? `Hi, I want to order this bangle:\nProduct: ${firstItem.name}\nPrice: ₹${formatPrice(firstItem.price)}`
      : 'Hi, I want to order a Raasiii bangle. Please share your latest designs.';

    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [cart]);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 right-6 z-[60] inline-flex items-center gap-3 rounded-full bg-[#1f9d55] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(31,157,85,0.35)] transition hover:-translate-y-1 hover:bg-[#16834a]"
      aria-label="Quick Order on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span>Quick Order on WhatsApp</span>
    </a>
  );
}
