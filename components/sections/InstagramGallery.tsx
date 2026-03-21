'use client';

import { ResolvableImage } from '@/components/ResolvableImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useStore } from '@/components/providers/StoreProvider';

export function InstagramGallery() {
  const { instagramGallery } = useStore();

  return (
    <section className="pb-24 pt-20">
      <div className="section-wrap">
        <SectionHeading title="Instagram Gallery" subtitle="@raasiii.jewels" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {instagramGallery.map((image) => (
            <div key={image.id} className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <ResolvableImage src={image.src} alt={image.alt} fill className="object-cover transition duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
