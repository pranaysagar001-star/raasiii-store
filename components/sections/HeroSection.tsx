'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useStore } from '@/components/providers/StoreProvider';

export function HeroSection() {
  const { settings } = useStore();
  const heroOffer = settings.discountsEnabled ? settings.heroOffer : 'Wedding & Festive Collections Live';

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(27,39,63,0.75),transparent_34%),linear-gradient(135deg,#0B0F1A_0%,#121726_45%,#1A1F2E_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_46%,rgba(255,214,111,0.62),transparent_11%),radial-gradient(circle_at_70%_46%,rgba(245,189,72,0.24),transparent_24%),radial-gradient(circle_at_70%_46%,rgba(255,231,163,0.12),transparent_36%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,15,26,0.95)_0%,rgba(11,15,26,0.78)_50%,rgba(11,15,26,0.3)_100%)]" />

      <div className="section-wrap relative z-20 grid min-h-[90vh] items-center gap-12 py-16 text-cream lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
        <div className="max-w-xl lg:pr-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-5 inline-flex rounded-full border border-gold/25 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-gold"
          >
            Premium Handmade Jewelry
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-display text-5xl font-semibold leading-tight text-white md:text-7xl"
          >
            {settings.heroTitle}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 space-y-3"
          >
            <p className="text-xl text-cream/90 md:text-3xl">{settings.heroSubtitle}</p>
            <p className="text-2xl font-semibold text-[#f6d488] md:text-4xl">{heroOffer}</p>
            <p className="text-base text-cream/90 md:text-xl">{settings.heroShipping}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/shop"
              className="rounded-full border border-gold bg-gold px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-maroon shadow-glow transition hover:-translate-y-1 hover:bg-[#efc86a]"
            >
              Shop Bangles
            </Link>
            <Link
              href="#collection"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-cream transition hover:-translate-y-1 hover:border-gold/60 hover:text-gold"
            >
              Explore Designs
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-cream/85 backdrop-blur-md"
          >
            <span className="mr-2">✨</span>
            <span>{settings.trustLine}</span>
          </motion.div>
        </div>

        <div className="relative flex w-full items-center justify-center">
          <div className="absolute inset-0 m-auto h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,212,105,0.7)_0%,rgba(255,212,105,0.24)_26%,transparent_68%)] blur-3xl sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />
          <motion.img
            src="/images/hero/bangle.png"
            alt="Luxury thread bangle"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
            className="relative z-10 w-[300px] opacity-95 drop-shadow-[0_0_40px_rgba(255,212,105,0.35)] sm:w-[380px] md:w-[430px] lg:w-[520px]"
          />
        </div>
      </div>
    </section>
  );
}
