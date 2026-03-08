import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';

const images = [
  '/images/instagram/insta-1.svg',
  '/images/instagram/insta-2.svg',
  '/images/instagram/insta-3.svg',
  '/images/instagram/insta-4.svg',
  '/images/instagram/insta-5.svg',
  '/images/instagram/insta-6.svg'
];

export function InstagramGallery() {
  return (
    <section className="pb-24 pt-20">
      <div className="section-wrap">
        <SectionHeading title="Instagram Gallery" subtitle="@raasiii.jewels" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((src) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-2xl border border-maroon/10">
              <Image src={src} alt="Raasiii bangle" fill className="object-cover transition duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
