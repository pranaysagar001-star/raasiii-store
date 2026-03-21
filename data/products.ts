export type ProductReview = {
  name: string;
  text: string;
  rating: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  discountPrice: number;
  badge: string;
  tag: string;
  stock: number;
  saleLabel: string;
  shortDescription: string;
  description: string;
  /** Paths, https URLs, or `idb:<uuid>` (uploaded bytes in IndexedDB). Never data: or blob: in localStorage. */
  images: string[];
  /** Optional display names for slots (e.g. uploaded file names), aligned with `images`. */
  imageFileNames?: string[];
  sizes: string[];
  reviews: ProductReview[];
};

export const products: Product[] = [
  {
    id: 'prod-001',
    slug: 'maroon-gold-festival-stack',
    name: 'Maroon Gold Festival Stack',
    price: 1999,
    discountPrice: 1299,
    badge: 'Bestseller',
    tag: 'Bridal Favorite',
    stock: 5,
    saleLabel: 'Sale Ends Tonight',
    shortDescription: 'Rich maroon threads with royal gold bead detailing.',
    description:
      'A handcrafted festive stack made with layered maroon silk threads, metallic beadwork, and a luxe finish for mehendi, sangeet, and festive celebrations.',
    sizes: ['2.2', '2.4', '2.6', '2.8'],
    images: ['/images/products/p1.jpg', '/images/products/p2.jpg', '/images/products/p3.jpg'],
    reviews: [
      { name: 'Nandini', text: 'Looks bridal and feels super light.', rating: 5 },
      { name: 'Rhea', text: 'The gold accents catch light beautifully.', rating: 5 }
    ]
  },
  {
    id: 'prod-002',
    slug: 'ruby-zari-bridal-set',
    name: 'Ruby Zari Bridal Set',
    price: 2199,
    discountPrice: 1499,
    badge: 'Trending',
    tag: 'Wedding Edit',
    stock: 4,
    saleLabel: 'Sale Ends Tonight',
    shortDescription: 'Bridal inspired thread set with intricate zari finishing.',
    description: 'Premium ruby threads woven with zari and bead motifs, perfect for wedding functions and grand celebrations.',
    sizes: ['2.2', '2.4', '2.6'],
    images: ['/images/products/p2.jpg', '/images/products/p4.jpg', '/images/products/p5.jpg'],
    reviews: [{ name: 'Ananya', text: 'Perfect match for my lehenga.', rating: 5 }]
  },
  {
    id: 'prod-003',
    slug: 'beige-maroon-minimal-duo',
    name: 'Beige Maroon Minimal Duo',
    price: 1699,
    discountPrice: 1199,
    badge: 'Trending',
    tag: 'Lightweight Luxe',
    stock: 6,
    saleLabel: 'Sale Ends Tonight',
    shortDescription: 'Subtle elegance for everyday ethnic wear.',
    description: 'A refined two-tone handcrafted bangle set blending cream and maroon threads with understated gold highlights.',
    sizes: ['2.4', '2.6', '2.8'],
    images: ['/images/products/p3.jpg', '/images/products/p6.jpg', '/images/products/p1.jpg'],
    reviews: [{ name: 'Divya', text: 'Minimal but premium.', rating: 4 }]
  },
  {
    id: 'prod-004',
    slug: 'wedding-heirloom-classic',
    name: 'Wedding Heirloom Classic',
    price: 2499,
    discountPrice: 1799,
    badge: 'Bestseller',
    tag: 'Grand Occasion',
    stock: 3,
    saleLabel: 'Sale Ends Tonight',
    shortDescription: 'Traditional handcrafted luxury with heritage tones.',
    description: 'A luxe heirloom-inspired bangle with deep thread wrapping, hand-set beads, and a refined festive silhouette.',
    sizes: ['2.2', '2.4', '2.6', '2.8'],
    images: ['/images/products/p4.jpg', '/images/products/p1.jpg', '/images/products/p5.jpg'],
    reviews: [{ name: 'Samhita', text: 'Got nonstop compliments.', rating: 5 }]
  },
  {
    id: 'prod-005',
    slug: 'golden-kundan-thread-set',
    name: 'Golden Kundan Thread Set',
    price: 2099,
    discountPrice: 1399,
    badge: 'Trending',
    tag: 'Festive Glam',
    stock: 5,
    saleLabel: 'Sale Ends Tonight',
    shortDescription: 'Threaded bangles with gemstone-inspired beadwork.',
    description: 'Designed to bring kundan-like richness through handcrafted thread texture and statement golden highlights.',
    sizes: ['2.2', '2.6', '2.8'],
    images: ['/images/products/p5.jpg', '/images/products/p2.jpg', '/images/products/p6.jpg'],
    reviews: [{ name: 'Laya', text: 'Great quality for festive gifting.', rating: 5 }]
  },
  {
    id: 'prod-006',
    slug: 'royal-maroon-occasion-stack',
    name: 'Royal Maroon Occasion Stack',
    price: 1999,
    discountPrice: 1299,
    badge: 'Bestseller',
    tag: 'Signature Raasiii',
    stock: 5,
    saleLabel: 'Sale Ends Tonight',
    shortDescription: 'Occasion-ready maroon stack with polished details.',
    description: 'A polished handcrafted stack with tonal maroon threading and shimmering gold highlights for celebratory looks.',
    sizes: ['2.4', '2.6', '2.8'],
    images: ['/images/products/p6.jpg', '/images/products/p4.jpg', '/images/products/p3.jpg'],
    reviews: [{ name: 'Kruti', text: 'Exactly the luxe feel I wanted.', rating: 5 }]
  }
];
