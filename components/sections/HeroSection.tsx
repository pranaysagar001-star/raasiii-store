'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BangleScene } from '@/components/three/BangleScene';

export function HeroSection() {
  return (
    <section className="relative min-h-[86vh] overflow-hidden">
      <div className="absolute inset-0">
        <BangleScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-maroon/70" />

      <div className="section-wrap relative z-10 flex min-h-[86vh] flex-col items-center justify-center text-center text-cream">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 text-xs uppercase tracking-[0.35em] text-gold">
          Handcrafted Luxury
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-6xl font-semibold tracking-[0.25em] md:text-8xl"
        >
          RAASIII
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 text-xl md:text-2xl">
          Handcrafted Threaded Bangles
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mt-2 text-base text-cream/90 md:text-lg">
          Elegance Woven by Hand
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-10">
          <Link
            href="/shop"
            className="rounded-full border border-gold bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-maroon shadow-glow transition hover:-translate-y-1 hover:bg-transparent hover:text-gold"
          >
            Shop Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
