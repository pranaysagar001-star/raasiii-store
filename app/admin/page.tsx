'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import { AlertTriangle, Boxes, ImagePlus, LogOut, PackageSearch, ShoppingCart, Trash2, TrendingUp, Wallet } from 'lucide-react';
import type { Product } from '@/data/products';
import { useStore } from '@/components/providers/StoreProvider';
import { ResolvableImage } from '@/components/ResolvableImage';
import {
  formatPrice,
  type InstagramImage,
  type OrderStatus
} from '@/lib/commerce';
import { deleteImageIfStored, putImageBlob, toIndexedDbImageRef } from '@/lib/clientImageStorage';
import { SalesChart } from '@/components/admin/SalesChart';

const lowStockThreshold = 5;

const emptyProduct: Product = {
  id: '',
  slug: '',
  name: '',
  price: 1999,
  discountPrice: 1299,
  badge: 'Bestseller',
  tag: 'New Arrival',
  stock: 5,
  saleLabel: 'Sale Ends Tonight',
  shortDescription: '',
  description: '',
  images: [],
  imageFileNames: [],
  sizes: ['2.4', '2.6'],
  reviews: []
};

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sumOrders(total: number, value: number) {
  return total + value;
}

function createObjectId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const maxImageUploadBytes = 2 * 1024 * 1024;

function padImageFileNames(product: Product): string[] {
  const len = product.images.length;
  const base = product.imageFileNames ?? [];
  return Array.from({ length: len }, (_, i) => base[i] ?? '');
}

export default function AdminPage() {
  const {
    adminSession,
    loginAdmin,
    logoutAdmin,
    products,
    orders,
    instagramGallery,
    settings,
    saveProduct,
    deleteProduct,
    updateOrderStatus,
    updateSettings,
    saveInstagramImage,
    deleteInstagramImage
  } = useStore();

  const loginFormRef = useRef<HTMLFormElement>(null);
  const productFormRef = useRef<HTMLFormElement>(null);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [productForm, setProductForm] = useState<Product>(emptyProduct);
  const [productError, setProductError] = useState('');
  const [orderNotice, setOrderNotice] = useState('');

  const sortedOrders = useMemo(() => [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [orders]);
  const today = new Date().toISOString().slice(0, 10);
  const todaySales = orders
    .filter((order) => order.createdAt.slice(0, 10) === today)
    .map((order) => order.total)
    .reduce(sumOrders, 0);
  const weeklySales = orders
    .slice(0, 7)
    .map((order) => order.total)
    .reduce(sumOrders, 0);
  const monthlySales = orders.map((order) => order.total).reduce(sumOrders, 0);
  const topProducts = [...products]
    .sort(
      (left, right) =>
        orders.filter((order) => order.items.some((item) => item.slug === right.slug)).length -
        orders.filter((order) => order.items.some((item) => item.slug === left.slug)).length
    )
    .slice(0, 4);
  const inventoryAlerts = products.filter((product) => product.stock < lowStockThreshold);

  const dailyPoints = [
    { label: 'Mon', value: 2200 },
    { label: 'Tue', value: 3400 },
    { label: 'Wed', value: 2900 },
    { label: 'Thu', value: 4200 },
    { label: 'Fri', value: 5100 },
    { label: 'Sat', value: 6600 },
    { label: 'Sun', value: 5900 }
  ];
  const weeklyPoints = [
    { label: 'W1', value: 12400 },
    { label: 'W2', value: 14800 },
    { label: 'W3', value: 17300 },
    { label: 'W4', value: 16400 }
  ];
  const monthlyPoints = [
    { label: 'Dec', value: 42000 },
    { label: 'Jan', value: 48600 },
    { label: 'Feb', value: 53100 },
    { label: 'Mar', value: 57900 }
  ];

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!loginFormRef.current?.reportValidity()) {
      return;
    }

    const success = loginAdmin(credentials.email, credentials.password);
    setLoginError(success ? '' : 'Invalid admin credentials. Use the configured hidden admin login.');
  };

  const handleProductSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!productFormRef.current?.reportValidity()) {
      return;
    }

    if (productForm.images.length === 0) {
      setProductError('At least one product image is required.');
      return;
    }

    const nextSlug = productForm.slug || toSlug(productForm.name);
    const names = padImageFileNames(productForm);
    const imageFileNames =
      names.some((n) => n.length > 0) ? names.slice(0, productForm.images.length) : undefined;

    saveProduct({
      ...productForm,
      id: productForm.id || createObjectId('prod'),
      slug: nextSlug,
      imageFileNames
    });
    setProductError('');
    setProductForm(emptyProduct);
  };

  const updateProductImages = async (files: FileList | null) => {
    if (!files?.length) return;

    const fileArray = Array.from(files);
    for (const file of fileArray) {
      if (file.size > maxImageUploadBytes) {
        alert('Image too large. Please upload smaller image.');
        return;
      }
    }

    const slotsLeft = 8 - productForm.images.length;
    if (slotsLeft <= 0) {
      return;
    }

    const toAdd = fileArray.slice(0, slotsLeft);
    const newRefs: string[] = [];

    try {
      for (const file of toAdd) {
        const id = crypto.randomUUID();
        await putImageBlob(id, file);
        newRefs.push(toIndexedDbImageRef(id));
      }
    } catch {
      setProductError('Could not save images. Check browser storage permissions.');
      return;
    }

    setProductForm((current) => {
      const room = 8 - current.images.length;
      if (room <= 0) {
        return current;
      }

      const batch = newRefs.slice(0, room);
      const names = padImageFileNames(current);
      const newImages = [...current.images, ...batch].slice(0, 8);
      const newNames = [...names, ...toAdd.slice(0, batch.length).map((f) => f.name)].slice(0, 8);

      return { ...current, images: newImages, imageFileNames: newNames };
    });

    setProductError('');
  };

  const replaceProductImage = async (index: number, file: File | null) => {
    if (!file) return;

    if (file.size > maxImageUploadBytes) {
      alert('Image too large. Please upload smaller image.');
      return;
    }

    const previousRef = productForm.images[index];
    const id = crypto.randomUUID();

    try {
      await putImageBlob(id, file);
    } catch {
      setProductError('Could not save image. Check browser storage permissions.');
      return;
    }

    await deleteImageIfStored(previousRef);

    setProductForm((current) => {
      const names = padImageFileNames(current);
      names[index] = file.name;
      const imgs = [...current.images];
      imgs[index] = toIndexedDbImageRef(id);

      return { ...current, images: imgs, imageFileNames: names };
    });
  };

  const removeProductImage = (index: number) => {
    setProductForm((current) => {
      const ref = current.images[index];
      void deleteImageIfStored(ref);

      const names = padImageFileNames(current);
      return {
        ...current,
        images: current.images.filter((_, itemIndex) => itemIndex !== index),
        imageFileNames: names.filter((_, itemIndex) => itemIndex !== index)
      };
    });
  };

  const updateProductStock = (product: Product, stock: number) => {
    saveProduct({ ...product, stock: Math.max(0, stock) });
  };

  const updateGalleryImage = async (image: InstagramImage | null, file: File | null) => {
    if (!file) return;

    if (file.size > maxImageUploadBytes) {
      alert('Image too large. Please upload smaller image.');
      return;
    }

    const nextId = image?.id ?? createObjectId('insta');

    const id = crypto.randomUUID();

    try {
      await putImageBlob(id, file);
    } catch {
      return;
    }

    saveInstagramImage({
      id: nextId,
      src: toIndexedDbImageRef(id),
      alt: image?.alt ?? 'Raasiii Instagram gallery image',
      fileName: file.name
    });
  };

  if (!adminSession) {
    return (
      <section className="min-h-[calc(100vh-160px)] py-16">
        <div className="section-wrap max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 text-white shadow-[0_25px_70px_rgba(5,8,15,0.35)] backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.24em] text-gold/80">Hidden Admin Access</p>
          <h1 className="mt-3 font-display text-4xl">Raasiii Admin</h1>
          <p className="mt-2 text-sm text-white/70">Secure login for catalog, orders, offers, and performance overview.</p>

          <form ref={loginFormRef} onSubmit={handleLogin} noValidate className="mt-8 space-y-4">
            <input
              required
              type="email"
              placeholder="Admin Email"
              value={credentials.email}
              onChange={(e) => setCredentials((current) => ({ ...current, email: e.target.value.slice(0, 80) }))}
            />
            <input
              required
              minLength={8}
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials((current) => ({ ...current, password: e.target.value.slice(0, 50) }))}
            />
            <button type="submit" className="w-full rounded-full border border-gold bg-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-maroon">
              Sign In
            </button>
          </form>

          {loginError ? <p className="mt-4 text-sm text-[#ffcfba]">{loginError}</p> : null}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 text-white">
      <div className="section-wrap space-y-8">
        <div className="flex flex-col gap-4 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold/80">Admin Dashboard</p>
            <h1 className="mt-2 font-display text-5xl">Business Control Center</h1>
            <p className="mt-2 text-sm text-white/70">Today sales, inventory, images, orders, and social gallery control.</p>
          </div>
          <button
            type="button"
            onClick={logoutAdmin}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.2em] text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="admin-card"><Wallet className="h-5 w-5 text-gold" /><p className="mt-4 text-sm text-white/70">Today Sales</p><p className="mt-2 text-4xl font-semibold">₹{formatPrice(todaySales)}</p></div>
          <div className="admin-card"><TrendingUp className="h-5 w-5 text-gold" /><p className="mt-4 text-sm text-white/70">Weekly Sales</p><p className="mt-2 text-4xl font-semibold">₹{formatPrice(weeklySales)}</p></div>
          <div className="admin-card"><Boxes className="h-5 w-5 text-gold" /><p className="mt-4 text-sm text-white/70">Monthly Sales</p><p className="mt-2 text-4xl font-semibold">₹{formatPrice(monthlySales)}</p></div>
          <div className="admin-card"><ShoppingCart className="h-5 w-5 text-gold" /><p className="mt-4 text-sm text-white/70">Total Orders</p><p className="mt-2 text-4xl font-semibold">{orders.length}</p></div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <SalesChart title="Daily Sales" points={dailyPoints} />
          <SalesChart title="Weekly Trends" points={weeklyPoints} />
          <SalesChart title="Monthly Performance" points={monthlyPoints} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr,0.9fr]">
          <div className="admin-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-gold/80">Orders Table</p>
                <h2 className="mt-1 font-display text-4xl">Recent Orders</h2>
              </div>
              <p className="text-sm text-white/60">{orders.length} total orders</p>
            </div>

            <div className="mt-6 space-y-3">
              {sortedOrders.map((order) => (
                <div key={order.id} className="grid gap-3 rounded-[24px] border border-white/10 bg-white/5 p-4 lg:grid-cols-[1fr,1.1fr,auto,auto]">
                  <div>
                    <p className="text-sm font-semibold">{order.id}</p>
                    <p className="text-xs text-white/60">{order.customer.name}</p>
                  </div>
                  <div className="text-xs text-white/70">
                    <p>{order.items.map((item) => `${item.name} x ${item.quantity}`).join(', ')}</p>
                    <p>{order.customer.city}, {order.customer.state}</p>
                  </div>
                  <p className="text-sm text-gold">₹{formatPrice(order.total)}</p>
                  <select
                    value={order.status}
                    onChange={(e) => {
                      updateOrderStatus(order.id, e.target.value as OrderStatus);
                      setOrderNotice(`Updated ${order.id} to ${e.target.value}.`);
                    }}
                    className="min-w-36"
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </div>
              ))}
            </div>
            {orderNotice ? <p className="mt-4 text-sm text-white/70">{orderNotice}</p> : null}
          </div>

          <div className="space-y-6">
            <div className="admin-card">
              <p className="text-xs uppercase tracking-[0.22em] text-gold/80">Top Products</p>
              <h2 className="mt-1 font-display text-4xl">Best Movers</h2>
              <div className="mt-5 space-y-3">
                {topProducts.map((product) => (
                  <div key={product.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold">{product.name}</p>
                    <p className="mt-1 text-xs text-white/65">{product.badge} • ₹{formatPrice(product.discountPrice)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-card">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-gold" />
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-gold/80">Low Stock</p>
                  <h2 className="mt-1 font-display text-4xl">Inventory Alerts</h2>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {inventoryAlerts.map((product) => (
                  <div key={product.id} className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 md:grid-cols-[1fr,90px] md:items-center">
                    <div>
                      <p>{product.name}</p>
                      <p className="mt-1 text-sm text-gold">Below threshold ({lowStockThreshold})</p>
                    </div>
                    <input
                      type="number"
                      min={0}
                      value={product.stock}
                      onChange={(e) => updateProductStock(product, Number(e.target.value))}
                      aria-label={`Low stock quantity for ${product.name}`}
                    />
                  </div>
                ))}
                {inventoryAlerts.length === 0 ? <p className="text-sm text-white/65">No low stock alerts right now.</p> : null}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          <div className="admin-card">
            <div className="flex items-center gap-3">
              <PackageSearch className="h-5 w-5 text-gold" />
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-gold/80">Product Management</p>
                <h2 className="mt-1 font-display text-4xl">Product Management</h2>
              </div>
            </div>

            <form ref={productFormRef} onSubmit={handleProductSubmit} noValidate className="mt-6 grid gap-4 md:grid-cols-2">
              <input
                required
                maxLength={80}
                placeholder="Name"
                value={productForm.name}
                onChange={(e) => setProductForm((current) => ({ ...current, name: e.target.value.slice(0, 80), slug: toSlug(e.target.value) }))}
              />
              <input
                required
                pattern="[a-z0-9-]+"
                maxLength={90}
                placeholder="Slug"
                title="Use lowercase letters, numbers, and hyphens only."
                value={productForm.slug}
                onChange={(e) => setProductForm((current) => ({ ...current, slug: toSlug(e.target.value) }))}
              />
              <input
                required
                min={1}
                type="number"
                placeholder="Price"
                value={productForm.price}
                onChange={(e) => setProductForm((current) => ({ ...current, price: Number(e.target.value) }))}
              />
              <input
                required
                min={1}
                type="number"
                placeholder="Discount Price"
                value={productForm.discountPrice}
                onChange={(e) => setProductForm((current) => ({ ...current, discountPrice: Number(e.target.value) }))}
              />
              <input
                required
                min={0}
                type="number"
                placeholder="Stock"
                value={productForm.stock}
                onChange={(e) => setProductForm((current) => ({ ...current, stock: Number(e.target.value) }))}
              />
              <input
                required
                maxLength={40}
                placeholder="Tag"
                value={productForm.tag}
                onChange={(e) => setProductForm((current) => ({ ...current, tag: e.target.value.slice(0, 40) }))}
              />
              <input
                required
                maxLength={30}
                placeholder="Sizes (comma separated)"
                value={productForm.sizes.join(', ')}
                onChange={(e) =>
                  setProductForm((current) => ({ ...current, sizes: e.target.value.split(',').map((size) => size.trim()).filter(Boolean) }))
                }
              />
              <select value={productForm.badge} onChange={(e) => setProductForm((current) => ({ ...current, badge: e.target.value }))}>
                <option>Bestseller</option>
                <option>Trending</option>
              </select>
              <textarea
                required
                maxLength={120}
                placeholder="Short Description"
                value={productForm.shortDescription}
                onChange={(e) => setProductForm((current) => ({ ...current, shortDescription: e.target.value.slice(0, 120) }))}
                rows={3}
                className="md:col-span-2"
              />
              <textarea
                required
                maxLength={280}
                placeholder="Description"
                value={productForm.description}
                onChange={(e) => setProductForm((current) => ({ ...current, description: e.target.value.slice(0, 280) }))}
                rows={4}
                className="md:col-span-2"
              />

              <div className="md:col-span-2 space-y-3">
                <label className="block text-sm font-medium text-white/80">Product Images</label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {productForm.images.map((image, index) => (
                    <div key={`${image}-${index}`} className="rounded-[22px] border border-white/10 bg-white/5 p-3">
                      <div className="relative aspect-square overflow-hidden rounded-2xl">
                        <ResolvableImage src={image} alt={`Product preview ${index + 1}`} fill className="object-cover" />
                      </div>
                      <div className="mt-3 flex gap-2">
                        <label className="flex-1 cursor-pointer rounded-full border border-white/10 px-3 py-2 text-center text-[11px] uppercase tracking-[0.18em] text-white/80">
                          Replace Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              void replaceProductImage(index, e.target.files?.[0] ?? null);
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => removeProductImage(index)}
                          className="rounded-full border border-[#8a2c3b]/40 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-[#ffcad2]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/80">
                  <ImagePlus className="h-4 w-4 text-gold" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      void updateProductImages(e.target.files);
                      e.target.value = '';
                    }}
                  />
                </label>
                {productError ? <p className="text-sm text-[#ffcfba]">{productError}</p> : null}
              </div>

              <button type="submit" className="rounded-full border border-gold bg-gold px-6 py-3 text-xs uppercase tracking-[0.2em] text-maroon">
                Save Changes
              </button>
            </form>

            <div className="mt-6 space-y-3">
              {products.map((product) => (
                <div key={product.id} className="grid gap-4 rounded-[22px] border border-white/10 bg-white/5 p-4 md:grid-cols-[88px,1fr,90px,auto,auto] md:items-center">
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <ResolvableImage src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-white/60">₹{formatPrice(product.discountPrice)} • {product.images.length} images</p>
                  </div>
                  <input
                    type="number"
                    min={0}
                    value={product.stock}
                    onChange={(e) => updateProductStock(product, Number(e.target.value))}
                    aria-label={`Stock for ${product.name}`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setProductForm(product);
                      setProductError('');
                    }}
                    className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProduct(product.slug)}
                    className="rounded-full border border-[#8a2c3b]/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#ffcad2]"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="admin-card">
              <p className="text-xs uppercase tracking-[0.22em] text-gold/80">Instagram Gallery Management</p>
              <h2 className="mt-1 font-display text-4xl">Instagram Gallery</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {instagramGallery.map((image) => (
                  <div key={image.id} className="rounded-[22px] border border-white/10 bg-white/5 p-3">
                    <div className="relative aspect-square overflow-hidden rounded-2xl">
                      <ResolvableImage src={image.src} alt={image.alt} fill className="object-cover" />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <label className="flex-1 cursor-pointer rounded-full border border-white/10 px-3 py-2 text-center text-[11px] uppercase tracking-[0.18em] text-white/80">
                        Replace Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            void updateGalleryImage(image, e.target.files?.[0] ?? null);
                            e.target.value = '';
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => deleteInstagramImage(image.id)}
                        className="rounded-full border border-[#8a2c3b]/40 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-[#ffcad2]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/80">
                <ImagePlus className="h-4 w-4 text-gold" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    void updateGalleryImage(null, e.target.files?.[0] ?? null);
                    e.target.value = '';
                  }}
                />
              </label>
            </div>

            <div className="admin-card">
              <p className="text-xs uppercase tracking-[0.22em] text-gold/80">Offer Management</p>
              <h2 className="mt-1 font-display text-4xl">Hero Offers & Banners</h2>
              <div className="mt-6 space-y-4">
                <input value={settings.heroTitle} onChange={(e) => updateSettings({ ...settings, heroTitle: e.target.value.slice(0, 80) })} placeholder="Hero Title" />
                <input value={settings.heroSubtitle} onChange={(e) => updateSettings({ ...settings, heroSubtitle: e.target.value.slice(0, 100) })} placeholder="Hero Subtitle" />
                <input value={settings.heroOffer} onChange={(e) => updateSettings({ ...settings, heroOffer: e.target.value.slice(0, 60) })} placeholder="Hero Offer" />
                <input value={settings.heroShipping} onChange={(e) => updateSettings({ ...settings, heroShipping: e.target.value.slice(0, 60) })} placeholder="Shipping Text" />
                <input value={settings.trustLine} onChange={(e) => updateSettings({ ...settings, trustLine: e.target.value.slice(0, 80) })} placeholder="Trust Line" />
                <input value={settings.urgencyTitle} onChange={(e) => updateSettings({ ...settings, urgencyTitle: e.target.value.slice(0, 50) })} placeholder="Urgency Title" />
                <input value={settings.urgencyText} onChange={(e) => updateSettings({ ...settings, urgencyText: e.target.value.slice(0, 80) })} placeholder="Urgency Text" />
                <textarea value={settings.bannerText} onChange={(e) => updateSettings({ ...settings, bannerText: e.target.value.slice(0, 140) })} rows={3} placeholder="Banner Text" />
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                  <input
                    type="checkbox"
                    checked={settings.discountsEnabled}
                    onChange={(e) => updateSettings({ ...settings, discountsEnabled: e.target.checked })}
                  />
                  <span>Enable hero discount messaging</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
