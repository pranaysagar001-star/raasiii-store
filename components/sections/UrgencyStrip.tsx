'use client';

import { Clock3, Flame } from 'lucide-react';
import { useStore } from '@/components/providers/StoreProvider';

export function UrgencyStrip() {
  const { settings } = useStore();

  return (
    <section className="pb-6">
      <div className="section-wrap">
        <div className="grid gap-4 rounded-[28px] border border-gold/20 bg-[linear-gradient(135deg,#1b0f15_0%,#261119_55%,#0d111b_100%)] p-5 text-cream shadow-[0_18px_50px_rgba(15,11,15,0.32)] md:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <Flame className="h-5 w-5 text-gold" />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Urgency</p>
              <p className="text-sm">{`🔥 ${settings.urgencyTitle}`}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <Clock3 className="h-5 w-5 text-gold" />
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Today Only</p>
              <p className="text-sm">{`⏳ ${settings.urgencyText}`}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
