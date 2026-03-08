import Link from 'next/link';

export function FounderStory() {
  return (
    <section className="py-20">
      <div className="section-wrap grid gap-10 rounded-3xl border border-maroon/10 bg-white p-8 shadow-luxe md:grid-cols-2 md:p-12">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Founder Story</p>
          <h2 className="font-display text-5xl">Manasvi Yadala</h2>
          <p className="text-base leading-relaxed text-maroon/80">
            Manasvi is a student entrepreneur building Raasiii to bring handcrafted threaded bangles into a modern luxury shopping experience.
            Her goal is simple: celebrate Indian artistry with elegant, wearable designs for festivals, weddings, and everyday confidence.
          </p>
          <Link href="/about-founder" className="inline-block rounded-full border border-maroon px-6 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-maroon hover:text-cream">
            Read Full Story
          </Link>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-maroon via-rose to-maroon p-8 text-cream shadow-luxe">
          <p className="font-display text-3xl">Raasiii Promise</p>
          <ul className="mt-6 space-y-4 text-sm text-cream/90">
            <li>Curated dropshipping catalog with premium quality control.</li>
            <li>Elegant bangles crafted to blend tradition with modern styling.</li>
            <li>Fast and reliable shipping support across India.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
