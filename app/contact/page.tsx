'use client';

import { type FormEvent, useRef, useState } from 'react';

const namePattern = "[A-Za-z ]+";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current?.reportValidity()) {
      return;
    }

    setSent(true);
  };

  return (
    <section className="py-16">
      <div className="section-wrap grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h1 className="font-display text-5xl text-white">Contact Raasiii</h1>
          <p className="mt-3 text-sm text-white/70">Questions on custom sizes, bulk gifting, or order support.</p>
          <div className="mt-6 space-y-2 text-sm text-white/75">
            <p>Email: hello@raasiii.com</p>
            <p>WhatsApp: +91 90000 00000</p>
            <p>Response Time: within 24 hours</p>
          </div>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4 premium-panel p-8">
          <input
            required
            pattern={namePattern}
            maxLength={50}
            placeholder="Full Name"
            title="Use only alphabets and spaces."
            value={form.name}
            onChange={(e) => setForm((current) => ({ ...current, name: e.target.value.replace(/[^A-Za-z ]/g, '').slice(0, 50) }))}
          />
          <input
            required
            type="email"
            maxLength={80}
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((current) => ({ ...current, email: e.target.value.slice(0, 80) }))}
          />
          <input
            required
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="Phone Number"
            title="Enter exactly 10 digits."
            value={form.phone}
            onChange={(e) => setForm((current) => ({ ...current, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
          />
          <textarea
            required
            rows={5}
            maxLength={220}
            placeholder="Your message"
            title="Keep your message under 220 characters."
            value={form.message}
            onChange={(e) => setForm((current) => ({ ...current, message: e.target.value.slice(0, 220) }))}
          />
          <button className="rounded-full border border-gold bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-maroon transition hover:bg-[#efc86a]">
            Send Message
          </button>
          {sent ? <p className="text-sm text-white/70">Your message has been validated and is ready to send.</p> : null}
        </form>
      </div>
    </section>
  );
}
