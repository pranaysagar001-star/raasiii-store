import { Gem, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const items = [
  {
    icon: Gem,
    title: 'Handmade Craftsmanship',
    text: 'Every bangle is finished by artisans, preserving the warmth of handmade detail.'
  },
  {
    icon: ShieldCheck,
    title: 'Premium Thread Quality',
    text: 'Rich thread wraps with durable finishing that keep color and shine through repeated wear.'
  },
  {
    icon: Leaf,
    title: 'Lightweight Comfort',
    text: 'Engineered to feel light all day, ideal for festive events and long wedding rituals.'
  },
  {
    icon: Sparkles,
    title: 'Wedding-Ready Elegance',
    text: 'Curated sets designed to elevate sarees, lehengas, and occasionwear instantly.'
  }
];

export function WhyChoose() {
  return (
    <section className="py-20">
      <div className="section-wrap">
        <SectionHeading title="Why Choose Raasiii" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_18px_60px_rgba(5,8,15,0.26)] backdrop-blur-md">
              <item.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-4 font-display text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm text-white/70">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
