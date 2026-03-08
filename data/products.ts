export type Product = {
  slug: string;
  name: string;
  price: number;
  shortDescription: string;
  description: string;
  images: string[];
  sizes: string[];
  reviews: { name: string; text: string }[];
};

export const products: Product[] = [
  {
    slug: 'maroon-gold-festival-stack',
    name: 'Maroon Gold Festival Stack',
    price: 1899,
    shortDescription: 'Rich maroon threads with royal gold bead detailing.',
    description:
      'A handcrafted festive stack made with layered maroon silk threads and metallic beadwork for statement ethnic styling.',
    sizes: ['2.2', '2.4', '2.6', '2.8'],
    images: ['/images/products/p1.jpg', '/images/products/p2.jpg', '/images/products/p3.jpg'],
    reviews: [
      { name: 'Nandini', text: 'Looks bridal and feels super light.' },
      { name: 'Rhea', text: 'The gold accents catch light beautifully.' }
    ]
  },
  {
    slug: 'ruby-zari-bridal-set',
    name: 'Ruby Zari Bridal Set',
    price: 2499,
    shortDescription: 'Bridal inspired thread set with intricate zari finishing.',
    description: 'Premium ruby threads woven with zari and bead motifs, perfect for wedding functions and grand celebrations.',
    sizes: ['2.2', '2.4', '2.6'],
    images: ['/images/products/p2.jpg', '/images/products/p4.jpg', '/images/products/p5.jpg'],
    reviews: [{ name: 'Ananya', text: 'Perfect match for my lehenga.' }]
  },
  {
    slug: 'beige-maroon-minimal-duo',
    name: 'Beige Maroon Minimal Duo',
    price: 1399,
    shortDescription: 'Subtle elegance for everyday ethnic wear.',
    description: 'A refined two-tone handcrafted bangle set blending cream and maroon threads with understated gold highlights.',
    sizes: ['2.4', '2.6', '2.8'],
    images: ['/images/products/p3.jpg', '/images/products/p6.jpg', '/images/products/p1.jpg'],
    reviews: [{ name: 'Divya', text: 'Minimal but premium.' }]
  },
  {
    slug: 'wedding-heirloom-classic',
    name: 'Wedding Heirloom Classic',
    price: 2799,
    shortDescription: 'Traditional handcrafted luxury with heritage tones.',
    description: 'A luxe heirloom-inspired bangle with deep thread wrapping, hand-set beads, and a refined festive silhouette.',
    sizes: ['2.2', '2.4', '2.6', '2.8'],
    images: ['/images/products/p4.jpg', '/images/products/p1.jpg', '/images/products/p5.jpg'],
    reviews: [{ name: 'Samhita', text: 'Got nonstop compliments.' }]
  },
  {
    slug: 'golden-kundan-thread-set',
    name: 'Golden Kundan Thread Set',
    price: 2299,
    shortDescription: 'Threaded bangles with gemstone-inspired beadwork.',
    description: 'Designed to bring kundan-like richness through handcrafted thread texture and statement golden highlights.',
    sizes: ['2.2', '2.6', '2.8'],
    images: ['/images/products/p5.jpg', '/images/products/p2.jpg', '/images/products/p6.jpg'],
    reviews: [{ name: 'Laya', text: 'Great quality for festive gifting.' }]
  },
  {
    slug: 'royal-maroon-occasion-stack',
    name: 'Royal Maroon Occasion Stack',
    price: 1999,
    shortDescription: 'Occasion-ready maroon stack with polished details.',
    description: 'A polished handcrafted stack with tonal maroon threading and shimmering gold highlights for celebratory looks.',
    sizes: ['2.4', '2.6', '2.8'],
    images: ['/images/products/p6.jpg', '/images/products/p4.jpg', '/images/products/p3.jpg'],
    reviews: [{ name: 'Kruti', text: 'Exactly the luxe feel I wanted.' }]
  }
];
