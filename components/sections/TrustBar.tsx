import { Award, PackageCheck, ShieldCheck, Sparkles } from 'lucide-react';

const trustItems = [
  { icon: Award, label: '1000+ Happy Customers' },
  { icon: Sparkles, label: 'Handmade Quality' },
  { icon: PackageCheck, label: 'Fast Delivery' },
  { icon: ShieldCheck, label: 'Premium Finish' }
];

export function TrustBar() {
  return (
    <section className="relative z-20 -mt-8 pb-8">
      <div className="section-wrap">
        <div className="grid gap-3 rounded-[28px] border border-gold/20 bg-[#120d16]/90 p-4 text-cream shadow-[0_20px_70px_rgba(7,10,20,0.35)] backdrop-blur-xl md:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-4">
              <item.icon className="h-5 w-5 text-gold" />
              <p className="text-sm font-medium tracking-[0.08em] text-cream/90">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
