import { products as seedProducts, type Product } from '@/data/products';

export type InstagramImage = {
  id: string;
  /** Site path, https URL, or `idb:<uuid>` (blob in IndexedDB). Never data: or blob:. */
  src: string;
  alt: string;
  fileName?: string;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  size: string;
  quantity: number;
};

export type PaymentMethod = 'razorpay' | 'cod';
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered';

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: CustomerDetails;
  subtotal: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  paid: boolean;
};

export type SiteSettings = {
  heroTitle: string;
  heroSubtitle: string;
  heroOffer: string;
  heroShipping: string;
  trustLine: string;
  urgencyTitle: string;
  urgencyText: string;
  bannerText: string;
  discountsEnabled: boolean;
};

export type AdminSession = {
  email: string;
  loggedInAt: string;
};

export type CommerceState = {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  instagramGallery: InstagramImage[];
  settings: SiteSettings;
  adminSession: AdminSession | null;
};

/** Used when an admin upload has no durable URL (blob/data URLs are not persisted). */
export const PLACEHOLDER_PRODUCT_IMAGE = '/images/products/p6.jpg';
export const PLACEHOLDER_INSTAGRAM_IMAGE = '/images/instagram/insta-1.svg';

export function isEphemeralImageUrl(url: string) {
  return url.startsWith('data:') || url.startsWith('blob:');
}

export function safeLocalStorageSetItem(key: string, value: string) {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    console.warn('Storage limit exceeded');
    return false;
  }
}

export function safeLocalStorageSetJSON<T>(key: string, value: T) {
  return safeLocalStorageSetItem(key, JSON.stringify(value));
}

export function migrateProductFromStorage(product: Product): Product {
  const hasBadImages = product.images.some((url) => isEphemeralImageUrl(url));
  if (!hasBadImages) {
    return product;
  }

  return {
    ...product,
    images: product.images.map((url) => (isEphemeralImageUrl(url) ? PLACEHOLDER_PRODUCT_IMAGE : url))
  };
}

export function migrateInstagramImageFromStorage(image: InstagramImage): InstagramImage {
  if (!isEphemeralImageUrl(image.src)) {
    return image;
  }

  return { ...image, src: PLACEHOLDER_INSTAGRAM_IMAGE };
}

export function migrateCartItemFromStorage(item: CartItem): CartItem {
  if (!isEphemeralImageUrl(item.image)) {
    return item;
  }

  return { ...item, image: PLACEHOLDER_PRODUCT_IMAGE };
}

export function migrateOrderFromStorage(order: Order): Order {
  return {
    ...order,
    items: order.items.map(migrateCartItemFromStorage)
  };
}

export const storageKeys = {
  products: 'raasiii-products',
  cart: 'raasiii-cart',
  orders: 'raasiii-orders',
  instagramGallery: 'raasiii-instagram-gallery',
  settings: 'raasiii-settings',
  adminSession: 'raasiii-admin-session'
} as const;

export const adminCredentials = {
  email: 'admin@raasiii.com',
  password: 'Raasiii@123'
};

export const defaultSettings: SiteSettings = {
  heroTitle: 'Luxury Thread Bangles',
  heroSubtitle: 'Handcrafted for Weddings & Special Moments',
  heroOffer: 'Flat 20% OFF Today',
  heroShipping: 'Free Delivery Across India',
  trustLine: 'Loved by 1000+ Customers Across India',
  urgencyTitle: 'Limited Stock Available',
  urgencyText: 'Sale ends tonight on our bridal and festive collections.',
  bannerText: 'Luxury handcrafted bangles with free delivery and festive savings across India.',
  discountsEnabled: true
};

const sampleOrders: Order[] = [
  {
    id: 'RAA10241',
    createdAt: '2026-03-21T09:30:00.000Z',
    items: [
      {
        slug: 'ruby-zari-bridal-set',
        name: 'Ruby Zari Bridal Set',
        productId: 'prod-002',
        price: 1499,
        originalPrice: 2199,
        image: '/images/products/p2.jpg',
        size: '2.4',
        quantity: 1
      }
    ],
    customer: {
      name: 'Priya Sharma',
      phone: '9876543210',
      address: '22 Lotus Avenue',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081'
    },
    subtotal: 2499,
    total: 2499,
    paymentMethod: 'razorpay',
    status: 'Delivered',
    paid: true
  },
  {
    id: 'RAA10242',
    createdAt: '2026-03-20T13:10:00.000Z',
    items: [
      {
        slug: 'wedding-heirloom-classic',
        name: 'Wedding Heirloom Classic',
        productId: 'prod-004',
        price: 1799,
        originalPrice: 2499,
        image: '/images/products/p4.jpg',
        size: '2.6',
        quantity: 2
      }
    ],
    customer: {
      name: 'Sneha Reddy',
      phone: '9988776655',
      address: '4 Green Residency',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560102'
    },
    subtotal: 5598,
    total: 5598,
    paymentMethod: 'cod',
    status: 'Pending',
    paid: false
  },
  {
    id: 'RAA10243',
    createdAt: '2026-03-18T17:45:00.000Z',
    items: [
      {
        slug: 'golden-kundan-thread-set',
        name: 'Golden Kundan Thread Set',
        productId: 'prod-005',
        price: 1399,
        originalPrice: 2099,
        image: '/images/products/p5.jpg',
        size: '2.8',
        quantity: 1
      }
    ],
    customer: {
      name: 'Ritika Jain',
      phone: '9012345678',
      address: '91 Heritage Enclave',
      city: 'Jaipur',
      state: 'Rajasthan',
      pincode: '302021'
    },
    subtotal: 2299,
    total: 2299,
    paymentMethod: 'razorpay',
    status: 'Shipped',
    paid: true
  }
];

const sampleInstagramGallery: InstagramImage[] = [
  { id: 'insta-1', src: '/images/instagram/insta-1.svg', alt: 'Raasiii bangle gallery 1' },
  { id: 'insta-2', src: '/images/instagram/insta-2.svg', alt: 'Raasiii bangle gallery 2' },
  { id: 'insta-3', src: '/images/instagram/insta-3.svg', alt: 'Raasiii bangle gallery 3' },
  { id: 'insta-4', src: '/images/instagram/insta-4.svg', alt: 'Raasiii bangle gallery 4' },
  { id: 'insta-5', src: '/images/instagram/insta-5.svg', alt: 'Raasiii bangle gallery 5' },
  { id: 'insta-6', src: '/images/instagram/insta-6.svg', alt: 'Raasiii bangle gallery 6' }
];

export const defaultCommerceState: CommerceState = {
  products: seedProducts,
  cart: [],
  orders: sampleOrders,
  instagramGallery: sampleInstagramGallery,
  settings: defaultSettings,
  adminSession: null
};

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-IN').format(price);
}

export function calculateCartTotal(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateCartCount(cart: CartItem[]) {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function createOrderId() {
  return `RAA${Date.now().toString().slice(-6)}`;
}

export function emptyCustomerDetails(): CustomerDetails {
  return {
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  };
}
