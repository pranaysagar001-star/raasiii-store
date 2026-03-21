'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/components/providers/StoreProvider';

export function FloatingCartButton() {
  const { cartCount, isReady } = useStore();

  return (
    <AnimatePresence>
      {isReady && cartCount > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          className="fixed bottom-6 right-6 z-[70]"
        >
          <Link
            href="/cart"
            className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-[#140b12] px-5 py-3 text-sm font-semibold text-cream shadow-[0_16px_40px_rgba(20,11,18,0.45)] transition hover:-translate-y-1"
          >
            <ShoppingBag className="h-5 w-5 text-gold" />
            <span>View Cart ({cartCount})</span>
          </Link>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
