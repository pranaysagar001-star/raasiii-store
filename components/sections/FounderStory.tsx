import Link from 'next/link';

export function FounderStory() {
  return (
    <section className="py-20">
      <div className="section-wrap grid gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-[0_18px_60px_rgba(5,8,15,0.26)] backdrop-blur-md md:grid-cols-2 md:p-12">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Founder Story</p>
          <h2 className="font-display text-5xl">Manasvi Yadala</h2>
          <p className="text-base leading-relaxed text-white/75">
            Manasvi is a student entrepreneur building Raasiii to bring handcrafted threaded bangles into a modern luxury shopping experience.
            Her goal is simple: celebrate Indian artistry with elegant, wearable designs for festivals, weddings, and everyday confidence.
          </p>
          <Link href="/about-founder" className="inline-block rounded-full border border-white/15 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:border-gold hover:text-gold">
            Read Full Story
          </Link>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#0b0f1a_0%,#141a28_50%,#1a1f2e_100%)] p-8 text-cream shadow-[0_18px_60px_rgba(5,8,15,0.26)]">
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
