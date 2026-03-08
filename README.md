# Raasiii - Handcrafted Threaded Bangles

Premium Next.js frontend for a luxury Indian jewelry dropshipping store.

## Tech Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS
- React Three Fiber / Three.js
- Framer Motion

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`

## Pages
- `/` Home (immersive 3D hero, featured products, brand sections)
- `/shop` Shop listing
- `/product/[slug]` Product detail
- `/about-founder` Founder story
- `/contact` Contact form
- `/cart` Cart overview
- `/checkout` Checkout + shipping calculator + Stripe/Razorpay options
- `/tracking` Order tracking

## Deployment on Vercel
1. Push this project to GitHub.
2. Go to [vercel.com](https://vercel.com), import repository.
3. Framework preset: `Next.js` (auto detected).
4. Add environment variables when backend is connected:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
5. Click Deploy.

## Backend Integration Notes
- Current project is frontend-only.
- Add API routes or headless commerce backend for:
  - Cart persistence
  - Checkout session creation (Stripe)
  - Razorpay order creation and verification
  - Live shipping rates
  - Real order tracking data
