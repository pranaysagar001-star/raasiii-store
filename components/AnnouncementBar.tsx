'use client';

import { useStore } from '@/components/providers/StoreProvider';

export function AnnouncementBar() {
  const { settings } = useStore();

  return (
    <div className="border-b border-white/10 bg-[#0b0f1a] px-4 py-3 text-center text-xs uppercase tracking-[0.22em] text-white/70">
      {settings.bannerText}
    </div>
  );
}
