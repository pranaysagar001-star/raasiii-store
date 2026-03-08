import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-maroon/10 bg-maroon py-12 text-cream">
      <div className="section-wrap grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-[0.2em]">RAASIII</p>
          <p className="mt-3 text-sm text-cream/80">Handcrafted Threaded Bangles</p>
        </div>
        <div className="space-y-2 text-sm text-cream/80">
          <p>Founder: Manasvi Yadala</p>
          <p>Student Entrepreneur</p>
          <p>Dropshipping across India</p>
        </div>
        <div className="space-y-2 text-sm">
          <Link href="/tracking" className="block hover:text-gold">Track Order</Link>
          <Link href="/contact" className="block hover:text-gold">Contact Support</Link>
          <p className="text-cream/60">Payments: Stripe & Razorpay</p>
        </div>
      </div>
    </footer>
  );
}
