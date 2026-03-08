import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';

export default function ShopPage() {
  return (
    <section className="py-16">
      <div className="section-wrap">
        <h1 className="font-display text-5xl">Shop Bangles</h1>
        <p className="mt-3 max-w-2xl text-sm text-maroon/75">Luxury threaded bangles curated for festive glamour and wedding elegance.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.slug} className="overflow-hidden rounded-3xl border border-maroon/10 bg-white shadow-luxe">
              <div className="relative aspect-[4/5]">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h2 className="font-display text-2xl">{product.name}</h2>
                <p className="mt-1 text-sm text-maroon/70">INR {product.price}</p>
                <p className="mt-2 text-sm text-maroon/70">{product.shortDescription}</p>
                <Link href={`/product/${product.slug}`} className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-gold hover:text-maroon">
                  Explore Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
