'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/components/providers/StoreProvider';
import { formatPrice, type Order, type PaymentMethod } from '@/lib/commerce';
import { trackEvent } from '@/lib/analytics';

const namePattern = '[A-Za-z ]+';
const phonePattern = '[0-9]{10}';
const pincodePattern = '[0-9]{6}';

export default function CheckoutPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { cart, cartTotal, emptyCustomer, placeOrder } = useStore();
  const [customer, setCustomer] = useState(emptyCustomer);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const [message, setMessage] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const itemSummary = useMemo(
    () => cart.map((item) => `${item.name} x ${item.quantity} (${item.size})`).join(', '),
    [cart]
  );

  useEffect(() => {
    if (cart.length > 0) {
      trackEvent({ type: 'begin_checkout', total: cartTotal });
    }
  }, [cart.length, cartTotal]);

  const handlePlaceOrder = () => {
    const form = formRef.current;

    if (!form?.reportValidity()) {
      return;
    }

    if (cart.length === 0) {
      setMessage('Your cart is empty. Add items before checking out.');
      return;
    }

    const order = placeOrder({ customer, paymentMethod });
    setMessage('');
    setPlacedOrder(order);
  };

  const handleCloseSuccess = () => {
    if (!placedOrder) return;
    router.push(`/tracking?orderId=${placedOrder.id}`);
  };

  return (
    <>
      <section className="py-16">
        <div className="section-wrap grid gap-8 lg:grid-cols-[2fr,1fr]">
          <form ref={formRef} className="space-y-6 premium-panel p-8" noValidate>
            <div>
              <h1 className="font-display text-4xl text-white">Checkout</h1>
              <p className="mt-2 text-sm text-white/70">Enter your delivery details and confirm your order securely.</p>
            </div>

            {cart.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-white/15 p-8 text-sm text-white/55">
                Your cart is empty. Head back to <Link href="/shop" className="text-gold">shop</Link> and add products first.
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    required
                    pattern={namePattern}
                    maxLength={50}
                    placeholder="Full Name"
                    title="Use only alphabets and spaces."
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer((prev) => ({ ...prev, name: e.target.value.replace(/[^A-Za-z ]/g, '').slice(0, 50) }))
                    }
                  />
                  <input
                    required
                    inputMode="numeric"
                    pattern={phonePattern}
                    maxLength={10}
                    placeholder="Phone Number"
                    title="Enter exactly 10 digits."
                    value={customer.phone}
                    onChange={(e) => setCustomer((prev) => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                  />
                </div>

                <textarea
                  required
                  maxLength={180}
                  placeholder="Full Address"
                  title="Address should be under 180 characters."
                  value={customer.address}
                  onChange={(e) => setCustomer((prev) => ({ ...prev, address: e.target.value.slice(0, 180) }))}
                  rows={4}
                />

                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    required
                    pattern={namePattern}
                    maxLength={40}
                    placeholder="City"
                    title="Use only alphabets and spaces."
                    value={customer.city}
                    onChange={(e) =>
                      setCustomer((prev) => ({ ...prev, city: e.target.value.replace(/[^A-Za-z ]/g, '').slice(0, 40) }))
                    }
                  />
                  <input
                    required
                    pattern={namePattern}
                    maxLength={40}
                    placeholder="State"
                    title="Use only alphabets and spaces."
                    value={customer.state}
                    onChange={(e) =>
                      setCustomer((prev) => ({ ...prev, state: e.target.value.replace(/[^A-Za-z ]/g, '').slice(0, 40) }))
                    }
                  />
                  <input
                    required
                    inputMode="numeric"
                    pattern={pincodePattern}
                    maxLength={6}
                    placeholder="PIN Code"
                    title="Enter a valid 6 digit PIN code."
                    value={customer.pincode}
                    onChange={(e) => setCustomer((prev) => ({ ...prev, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                  />
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">Payment Options</p>
                  <div className="mt-4 space-y-3 text-sm text-white/80">
                    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'razorpay'}
                        onChange={() => setPaymentMethod('razorpay')}
                      />
                      <span>Razorpay (UPI, Cards, Netbanking)</span>
                    </label>
                    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                      <span>Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="rounded-full border border-gold bg-gold px-8 py-3 text-xs uppercase tracking-[0.2em] text-maroon transition hover:bg-[#efc86a]"
                >
                  Place Order
                </button>

                {message ? <p className="text-sm text-white/70">{message}</p> : null}
              </>
            )}
          </form>

          <aside className="premium-panel space-y-5 p-8">
            <h2 className="font-display text-3xl text-white">Order Summary</h2>
            <div className="space-y-3 text-sm text-white/75">
              <p><span className="font-semibold text-white">Products:</span> {itemSummary || 'No items added yet'}</p>
              <p><span className="font-semibold text-white">Quantity:</span> {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p><span className="font-semibold text-white">Total:</span> ₹{formatPrice(cartTotal)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
              Free delivery across India is included in this checkout flow.
            </div>
          </aside>
        </div>
      </section>

      {placedOrder ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0f1a]/80 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-[32px] border border-white/10 bg-[#121726] p-8 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={handleCloseSuccess}
              className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-white/70 transition hover:text-white"
              aria-label="Close success message"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Order Placed</p>
            <h2 className="mt-3 font-display text-4xl">Your order is confirmed</h2>
            <div className="mt-5 space-y-2 text-sm text-white/75">
              <p>Order ID: <span className="font-semibold text-white">{placedOrder.id}</span></p>
              <p>Payment: {placedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid via Razorpay mock flow'}</p>
              <p>Total: ₹{formatPrice(placedOrder.total)}</p>
            </div>
            <p className="mt-5 text-sm text-white/65">
              Close this message using the X button to continue to the Track Orders page.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
