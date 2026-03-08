import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about-founder', label: 'About Founder' },
  { href: '/contact', label: 'Contact' },
  { href: '/cart', label: 'Cart' },
  { href: '/checkout', label: 'Checkout' }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-maroon/10 bg-cream/85 backdrop-blur-xl">
      <div className="section-wrap flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-3xl font-semibold tracking-[0.22em] text-maroon">
          RAASIII
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/shop" className="rounded-full border border-gold px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-gold hover:text-white">
          Shop Now
        </Link>
      </div>
    </header>
  );
}
