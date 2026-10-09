# VALOIR — Luxury Lifestyle & Atelier E-Commerce

VALOIR is a full-featured, luxury e-commerce web application inspired by high-end international design and fashion maisons. Built with modern TypeScript, React, Tailwind CSS, and browser LocalStorage persistence.

## Key Features

1. **Editorial UI/UX Design**
   - Refined typography pairing (`Playfair Display`, `Plus Jakarta Sans`, and `Cinzel`)
   - Warm neutral luxury palette (`#FAF9F5`, warm charcoal, soft cream, amber accents)
   - Zero-pill metadata discipline and clean typographic hierarchy
   - Micro-interactions, hover image swaps, and responsive modals

2. **Full Catalog & Filtering Engine**
   - Comprehensive catalog spanning Tailored Apparel, Swiss Horology, Danish Acoustics, and Italian Stone Living pieces
   - Multi-faceted filters: Departments, Categories, Price Range slider, Rating minimums, In-stock only, and Archive sale discounts
   - Sorting by Popularity, Price (Asc/Desc), Rating, and New Arrivals
   - Responsive layout toggles (4-column, 3-column, and List view)
   - Live Search modal with keyboard shortcut (`⌘K` / `Ctrl+K`)

3. **Product Detail Experience**
   - Multi-angle high-resolution gallery with thumbnail switcher and fullscreen lightbox
   - Color swatches with live image updates
   - Apparel size selector with interactive European Size Guide modal
   - Tabbed specifications, artisan provenance, and care instructions
   - Client reviews breakdown with interactive review submission form
   - Dynamic Related Products and Recently Viewed session recommendations

4. **Cart & Checkout Architecture**
   - Slide-out quick Cart Drawer and dedicated full-page Cart
   - Complimentary courier threshold progress meter ($250 threshold)
   - Promotional code engine (Supports `VALOIR10` for 10% off, `LUXE20` for 20% off)
   - Multi-step Checkout with form validation for customer contact and shipping address
   - Courier selection (DHL Express Courier, Priority Weekend)
   - Simulated payment sandbox (Credit card with live card preview, Apple Pay, Klarna)
   - Clear distinction between demo environment and real payments

5. **Order Confirmation & Client Account**
   - Order confirmation receipt with dispatch timeline tracker and print receipt action
   - Client account dashboard displaying persistent order history with tracking numbers
   - Saved delivery address management
   - Real-time multi-currency switcher (USD `$`, EUR `€`, GBP `£`, JPY `¥`)
   - LocalStorage reset option for demo reset

6. **Customer Service & Content Pages**
   - Private Wishlist with "Move All to Bag"
   - About the Maison & master ateliers in Biella, Le Locle, Florence, and Copenhagen
   - VIP Concierge Contact with validated inquiry form and flagship showroom directory
   - Categorized and searchable FAQ accordions
   - Privacy Policy and Terms of Service
   - Custom 404 page

## LocalStorage Schema
- `valoir_cart`: Active items in shopping bag
- `valoir_wishlist`: Array of bookmarked product IDs
- `valoir_recently_viewed`: Session product history
- `valoir_orders`: Completed simulated order receipts
- `valoir_currency`: Selected currency preference ('USD' | 'EUR' | 'GBP' | 'JPY')
