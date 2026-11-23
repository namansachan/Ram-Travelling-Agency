# Ram Traveling Agency — website starter

A responsive travel agency website built with React + Vite + React Router.

## Features included

- Home, destinations, tour packages, package detail pages, About, Gallery, Contact and FAQ.
- Tour package discovery inspired by modern travel listing pages: keyword search, quick destination chips, travel-style filters, budget filters, duration filters, sorting by price/review count/rating, results count and load-more.
- WhatsApp enquiry links using the provided phone number.
- Click-to-call, email and Instagram links.
- Expanded editable sample package list including Manali, Goa, Jaipur, Kerala, Rishikesh, Andaman, Kashmir, Shimla, Agra and Uttarakhand.
- Sample reviews, destinations, photos, prices and itineraries.
- Google Maps search link placeholder (replace with the real agency address).
- Demo admin panel at `/admin` for adding, editing and deleting packages in the current browser.
- Export packages as JSON from the admin panel.
- Responsive mobile navigation and layouts.

## Run locally

1. Install Node.js (LTS) from https://nodejs.org/
2. Unzip this folder and open a terminal in the `ram-traveling-agency` folder.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite, usually `http://localhost:5173`.
5. To test the production build:

   ```bash
   npm run build
   npm run preview
   ```

## Most important files to edit

- `src/data.js`: package names, destinations, prices, sample reviews, FAQs, itineraries and images.
- `src/App.jsx`: business name, phone, WhatsApp country code, email, Instagram, page structure and form behaviour.
- `src/styles.css`: colours, typography, spacing, cards, mobile breakpoints and overall visual design.
- `index.html`: browser title and SEO description.

### Tour packages page updates

The `/packages` page now includes quick destination search, travel-style chips, budget and duration filters, sorting, clear-filters, load-more behavior, and a note explaining that package prices are sample estimates. The extra packages are placeholders and must be verified and updated before publishing.

### Contact details already configured

- Phone: `1234567890` for calls.
- WhatsApp: `+91 1234567890` (country code is included in the WhatsApp URL).
- Email: `ramtravelingagency@gmail.com`
- Instagram: `buildwith_shaurya`

If the phone number is not an Indian number, update `PHONE_DIGITS` in `src/App.jsx`.

## Admin demo

Visit `/admin`.

Demo password: `ramdemo123`

The admin panel is intentionally a **local-only demo**. Changes are saved in your browser's `localStorage`; they are not shared across devices and may disappear if browser storage is cleared. The demo password is visible in frontend code and is NOT secure.

Before using this publicly, replace it with a real backend, secure authentication and role-based access. Suggested production stack: Supabase Auth + PostgreSQL, with Row Level Security policies. Never put a service-role key or payment secret in frontend code.

## Online payments

Online payment is **not enabled** in this starter. To accept real payments, create an account with a payment provider such as Razorpay or Stripe (availability depends on your business/country), create payment orders on a secure backend, verify signatures server-side, and only then mark bookings as paid. Do not collect card details directly in this website or trust a client-side “payment successful” result.

## Forms and enquiries

The enquiry form opens WhatsApp with a pre-filled message. It does not store enquiries in a database or email them automatically. If WhatsApp does not open, check that the number is correct and WhatsApp is available on the device.

## Google Maps

The contact page currently uses a generic Google Maps search for India because no office address was provided. Update `mapsLink` in `src/App.jsx` to a specific address or a proper Google Maps embed URL once the agency location is known.

## Sample content warning

The packages, prices, ratings, reviews, itineraries and some images are placeholder content for layout/testing. Replace them with accurate agency information and real customer reviews before publishing. Verify image licenses and usage rights for your final site.

## Deploy

This Vite project can be deployed to Vercel, Netlify or another static hosting provider. For React Router direct routes, configure the host to serve `index.html` as a fallback for unknown paths. The demo admin remains local-only until a backend is added.

## India destination expansion (Phase 1)

- Added a structured `src/india.js` dataset containing all 28 states and 8 Union Territories, with capital/main hub, curated popular attractions, suggested season, trip duration and local food examples.
- `/destinations` now lists all 36 regions with text search and state/UT filtering.
- `/states/:slug` provides a dedicated region page with highlights, best-time guidance, suggested duration, local food and general air/train/road planning guidance.
- `/custom-trip` provides a client-side indicative estimate and sends the request to WhatsApp for a confirmed quote.
- Home page now links directly to the India region directory and selected state pages.

## Important production limitations

This remains a React + Vite frontend starter. It has no configured backend/database, shared admin authentication, supplier inventory, live hotel/transport rates, payment gateway, booking persistence, verified reviews, image management or server-side pricing engine. Existing `/admin` remains a browser-local demo and is not safe for public administration. Custom-trip estimates are illustrative planning allowances only, not supplier prices or offers. Destination highlights are curated samples, not exhaustive lists. Replace the placeholder sitemap domain before deployment and add generated per-route metadata/canonical URLs and a complete sitemap as part of a production SEO pass.
