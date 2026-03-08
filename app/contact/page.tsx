export default function ContactPage() {
  return (
    <section className="py-16">
      <div className="section-wrap grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl">Contact Raasiii</h1>
          <p className="mt-3 text-sm text-maroon/75">Questions on custom sizes, bulk gifting, or order support.</p>
          <div className="mt-6 space-y-2 text-sm text-maroon/80">
            <p>Email: hello@raasiii.com</p>
            <p>WhatsApp: +91 90000 00000</p>
            <p>Response Time: within 24 hours</p>
          </div>
        </div>
        <form className="space-y-4 rounded-3xl border border-maroon/10 bg-white p-8 shadow-luxe">
          <input placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <textarea rows={5} placeholder="Your message" />
          <button className="rounded-full border border-gold bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-maroon transition hover:bg-maroon hover:text-cream">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
