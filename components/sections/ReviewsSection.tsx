import { SectionHeading } from '@/components/ui/SectionHeading';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Aadya R.',
    quote: 'The thread quality is stunning. My bridal stack looked premium and stayed comfortable all day.',
    highlight: 'Bridal order'
  },
  {
    name: 'Megha V.',
    quote: 'Exactly what I wanted for festive gifting. Beautiful finish and classy packaging vibe.',
    highlight: 'Festive gifting'
  },
  {
    name: 'Ishita K.',
    quote: 'Loved the gold bead detailing. Looks handcrafted and luxurious in person.',
    highlight: 'Repeat customer'
  }
];

export function ReviewsSection() {
  return (
    <section className="py-20">
      <div className="section-wrap">
        <SectionHeading title="Customer Reviews" subtitle="Real feedback that reassures first-time buyers and strengthens purchase confidence." />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_18px_60px_rgba(5,8,15,0.26)] backdrop-blur-md">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={`${review.name}-${index}`} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-white/75">"{review.quote}"</p>
              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">{review.name}</p>
                <p className="rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/60">{review.highlight}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
