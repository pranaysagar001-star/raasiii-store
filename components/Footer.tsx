import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0b0f1a] py-12 text-white">
      <div className="section-wrap grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-[0.2em]">RAASIII</p>
          <p className="mt-3 text-sm text-white/75">Luxury thread bangles handcrafted for weddings, gifting, and festive moments.</p>
        </div>
        <div className="space-y-2 text-sm text-white/75">
          <p>Founder: Manasvi Yadala</p>
          <p>Student Entrepreneur</p>
          <p>Dropshipping across India</p>
        </div>
        <div className="space-y-2 text-sm">
          <Link href="/tracking" className="block hover:text-gold">Track Order</Link>
          <Link href="/contact" className="block hover:text-gold">Contact Support</Link>
          <p className="text-white/55">Payments: Razorpay & Cash on Delivery</p>
        </div>
      </div>
    </footer>
  );
}
