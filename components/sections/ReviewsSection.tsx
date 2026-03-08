import { SectionHeading } from '@/components/ui/SectionHeading';

const reviews = [
  {
    name: 'Aadya R.',
    quote: 'The thread quality is stunning. My bridal stack looked premium and stayed comfortable all day.'
  },
  {
    name: 'Megha V.',
    quote: 'Exactly what I wanted for festive gifting. Beautiful finish and classy packaging vibe.'
  },
  {
    name: 'Ishita K.',
    quote: 'Loved the gold bead detailing. Looks handcrafted and luxurious in person.'
  }
];

export function ReviewsSection() {
  return (
    <section className="py-20">
      <div className="section-wrap">
        <SectionHeading title="Customer Reviews" />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-2xl border border-maroon/10 bg-white p-6 shadow-luxe">
              <p className="text-sm leading-relaxed text-maroon/80">"{review.quote}"</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold">{review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
