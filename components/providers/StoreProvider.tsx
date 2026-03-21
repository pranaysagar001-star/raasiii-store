'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Product } from '@/data/products';
import {
  adminCredentials,
  calculateCartCount,
  calculateCartTotal,
  createOrderId,
  defaultCommerceState,
  emptyCustomerDetails,
  migrateCartItemFromStorage,
  migrateInstagramImageFromStorage,
  migrateOrderFromStorage,
  migrateProductFromStorage,
  safeLocalStorageSetJSON,
  storageKeys,
  type AdminSession,
  type CartItem,
  type CustomerDetails,
  type InstagramImage,
  type Order,
  type OrderStatus,
  type PaymentMethod,
  type SiteSettings
} from '@/lib/commerce';
import { deleteImageIfStored, isIndexedDbImageRef } from '@/lib/clientImageStorage';
import { trackEvent } from '@/lib/analytics';

type CheckoutPayload = {
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
};

type StoreContextValue = {
  isReady: boolean;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  instagramGallery: InstagramImage[];
  settings: SiteSettings;
  adminSession: AdminSession | null;
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product, size: string, quantity?: number) => void;
  updateCartQuantity: (slug: string, size: string, quantity: number) => void;
  removeFromCart: (slug: string, size: string) => void;
  clearCart: () => void;
  placeOrder: (payload: CheckoutPayload) => Order;
  findOrder: (orderId: string, phone?: string) => Order | undefined;
  loginAdmin: (email: string, password: string) => boolean;
  logoutAdmin: () => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (slug: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateSettings: (nextSettings: SiteSettings) => void;
  saveInstagramImage: (image: InstagramImage) => void;
  deleteInstagramImage: (id: string) => void;
  emptyCustomer: CustomerDetails;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readStorage<T>(key: string, fallback: T) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return;
  }

  safeLocalStorageSetJSON(key, value);
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState(defaultCommerceState.products);
  const [cart, setCart] = useState(defaultCommerceState.cart);
  const [orders, setOrders] = useState(defaultCommerceState.orders);
  const [instagramGallery, setInstagramGallery] = useState(defaultCommerceState.instagramGallery);
  const [settings, setSettings] = useState(defaultCommerceState.settings);
  const [adminSession, setAdminSession] = useState<AdminSession | null>(defaultCommerceState.adminSession);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadedProducts = readStorage(storageKeys.products, defaultCommerceState.products);
    setProducts(loadedProducts.map(migrateProductFromStorage));

    const loadedCart = readStorage(storageKeys.cart, defaultCommerceState.cart);
    setCart(loadedCart.map(migrateCartItemFromStorage));

    const loadedOrders = readStorage(storageKeys.orders, defaultCommerceState.orders);
    setOrders(loadedOrders.map(migrateOrderFromStorage));

    const loadedGallery = readStorage(storageKeys.instagramGallery, defaultCommerceState.instagramGallery);
    setInstagramGallery(loadedGallery.map(migrateInstagramImageFromStorage));

    setSettings(readStorage(storageKeys.settings, defaultCommerceState.settings));
    setAdminSession(readStorage(storageKeys.adminSession, defaultCommerceState.adminSession));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    writeStorage(storageKeys.products, products);
  }, [isReady, products]);

  useEffect(() => {
    if (!isReady) return;
    writeStorage(storageKeys.cart, cart);
  }, [isReady, cart]);

  useEffect(() => {
    if (!isReady) return;
    writeStorage(storageKeys.orders, orders);
  }, [isReady, orders]);

  useEffect(() => {
    if (!isReady) return;
    writeStorage(storageKeys.instagramGallery, instagramGallery);
  }, [instagramGallery, isReady]);

  useEffect(() => {
    if (!isReady) return;
    writeStorage(storageKeys.settings, settings);
  }, [isReady, settings]);

  useEffect(() => {
    if (!isReady) return;
    writeStorage(storageKeys.adminSession, adminSession);
  }, [isReady, adminSession]);

  const value = useMemo<StoreContextValue>(() => {
    const addToCart = (product: Product, size: string, quantity = 1) => {
      trackEvent({ type: 'add_to_cart', slug: product.slug, quantity });
      setCart((currentCart) => {
        const existingIndex = currentCart.findIndex((item) => item.slug === product.slug && item.size === size);

        if (existingIndex >= 0) {
          return currentCart.map((item, index) =>
            index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
          );
        }

        return [
          ...currentCart,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.discountPrice,
            originalPrice: product.price,
            image: product.images[0],
            size,
            quantity
          }
        ];
      });
    };

    const updateCartQuantity = (slug: string, size: string, quantity: number) => {
      setCart((currentCart) =>
        currentCart
          .map((item) => (item.slug === slug && item.size === size ? { ...item, quantity: Math.max(1, quantity) } : item))
          .filter((item) => item.quantity > 0)
      );
    };

    const removeFromCart = (slug: string, size: string) => {
      setCart((currentCart) => currentCart.filter((item) => !(item.slug === slug && item.size === size)));
    };

    const clearCart = () => {
      setCart([]);
    };

    const placeOrder = ({ customer, paymentMethod }: CheckoutPayload) => {
      const subtotal = calculateCartTotal(cart);
      const order: Order = {
        id: createOrderId(),
        createdAt: new Date().toISOString(),
        items: cart,
        customer,
        subtotal,
        total: subtotal,
        paymentMethod,
        status: paymentMethod === 'cod' ? 'Pending' : 'Processing',
        paid: paymentMethod === 'razorpay'
      };

      trackEvent({ type: 'purchase', orderId: order.id, total: order.total });
      setOrders((currentOrders) => [order, ...currentOrders]);
      setCart([]);
      return order;
    };

    const findOrder = (orderId: string, phone?: string) =>
      orders.find((order) => {
        const sameId = order.id.toLowerCase() === orderId.trim().toLowerCase();
        const samePhone = !phone || order.customer.phone === phone.trim();
        return sameId && samePhone;
      });

    const loginAdmin = (email: string, password: string) => {
      const isValid = email === adminCredentials.email && password === adminCredentials.password;

      if (isValid) {
        setAdminSession({
          email,
          loggedInAt: new Date().toISOString()
        });
      }

      return isValid;
    };

    const logoutAdmin = () => setAdminSession(null);

    const saveProduct = (product: Product) => {
      setProducts((currentProducts) => {
        const previous = currentProducts.find((item) => item.slug === product.slug);
        if (previous) {
          for (const url of previous.images) {
            if (isIndexedDbImageRef(url) && !product.images.includes(url)) {
              void deleteImageIfStored(url);
            }
          }
        }

        const exists = currentProducts.some((item) => item.slug === product.slug);
        return exists ? currentProducts.map((item) => (item.slug === product.slug ? product : item)) : [product, ...currentProducts];
      });
    };

    const deleteProduct = (slug: string) => {
      setProducts((currentProducts) => {
        const removed = currentProducts.find((product) => product.slug === slug);
        if (removed) {
          for (const url of removed.images) {
            void deleteImageIfStored(url);
          }
        }

        return currentProducts.filter((product) => product.slug !== slug);
      });
      setCart((currentCart) => currentCart.filter((item) => item.slug !== slug));
    };

    const updateOrderStatus = (orderId: string, status: OrderStatus) => {
      setOrders((currentOrders) => currentOrders.map((order) => (order.id === orderId ? { ...order, status } : order)));
    };

    const updateSettings = (nextSettings: SiteSettings) => setSettings(nextSettings);

    const saveInstagramImage = (image: InstagramImage) => {
      setInstagramGallery((currentGallery) => {
        const existing = currentGallery.find((item) => item.id === image.id);
        if (existing && existing.src !== image.src) {
          void deleteImageIfStored(existing.src);
        }

        const exists = currentGallery.some((item) => item.id === image.id);
        return exists ? currentGallery.map((item) => (item.id === image.id ? image : item)) : [image, ...currentGallery];
      });
    };

    const deleteInstagramImage = (id: string) => {
      setInstagramGallery((currentGallery) => {
        const target = currentGallery.find((image) => image.id === id);
        if (target) {
          void deleteImageIfStored(target.src);
        }

        return currentGallery.filter((image) => image.id !== id);
      });
    };

    return {
      isReady,
      products,
      cart,
      orders,
      instagramGallery,
      settings,
      adminSession,
      cartCount: calculateCartCount(cart),
      cartTotal: calculateCartTotal(cart),
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
      findOrder,
      loginAdmin,
      logoutAdmin,
      saveProduct,
      deleteProduct,
      updateOrderStatus,
      updateSettings,
      saveInstagramImage,
      deleteInstagramImage,
      emptyCustomer: emptyCustomerDetails()
    };
  }, [adminSession, cart, instagramGallery, isReady, orders, products, settings]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }

  return context;
}
