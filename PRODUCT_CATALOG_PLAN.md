# Product Catalog — Schema + Seed Data + Currency Display (Phase 1)

## Context

The storefront UI is fully built but every product-related component
(`ProductListing`, `BestsellerProducts`, `SimilarProducts`, `ShopByCategory`,
and the entire `/products/[slug]` detail page including gallery, variants,
energization add-ons, sizes, accordion copy, and reviews) is hardcoded with
Lorem Ipsum data and a single fake slug (`4-mukhi-regular-rudraksha`).

To make the site dynamic, we need a real product catalog in the database.
This is **Phase 1**: design the Prisma schema for products/categories/
collections/reviews, run the migration to create the tables, and seed
realistic data that mirrors what the UI currently expects — so Phase 2
(wiring components to read from the DB) has real rows to query against.

Two things the user wants settled now, before seeding:

1. **Currency**: all prices in the schema are stored as **USD cents**
   (the canonical/base currency). The Header's currently-static "USD" text
   (desktop dropdown and mobile menu "CURRENCY" row) becomes a real
   USD/INR switcher that converts displayed prices via a static exchange
   rate — this is added now as a small, self-contained display layer.
2. **Collections** ("Shop By Purpose" — Wealth, Health, Love, Luck,
   Protection, Peace, Courage, Balance, already shown in `ShopByPurpose.tsx`
   and `HowToChooseExploreByPurpose.tsx`): added as a `Collection` model,
   a many-to-many "sub category" tag on `Product`, seeded with the 8
   existing purposes and assigned to each seeded product.

This plan does **not** touch cart/checkout/orders or the auth system —
those are later phases. The previously-drafted Google OAuth + Email OTP
plan is parked (note: `GoogleOneTap` is already mounted in `layout.tsx`,
so part of it may already be done — out of scope here either way).

## Schema Design (`prisma/schema.prisma`)

Add to the existing schema (alongside `User`, `Account`, `Address`,
`VerificationToken`). All prices stored as **Int cents** (`priceCents`,
`compareAtPriceCents`, `priceDeltaCents`) — avoids passing non-serializable
Prisma `Decimal` objects from Server to Client Components.

```prisma
model Category {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  image     String
  sortOrder Int      @default(0)

  products Product[]

  @@map("categories")
}

model Product {
  id        String @id @default(uuid())
  slug      String @unique
  name      String
  breadcrumbLabel String   // e.g. "4 Mukhi (Regular) Rudraksha"

  categoryId String
  category   Category @relation(fields: [categoryId], references: [id])

  description   String @db.Text
  shippingInfo   String @db.Text
  packagingInfo  String @db.Text
  returnsInfo    String @db.Text

  priceCents          Int
  compareAtPriceCents Int?

  stockCount   Int     @default(0)
  ratingAvg    Float   @default(0)
  ratingCount  Int     @default(0)
  isBestseller Boolean @default(false)

  images      ProductImage[]
  variants    ProductVariant[]
  addOns      ProductAddOn[]
  sizes       ProductSize[]
  reviews     Review[]
  collections Collection[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([categoryId])
  @@index([isBestseller])
  @@map("products")
}

// "Shop By Purpose" tags (Wealth, Health, Love, ...) — a many-to-many
// "sub category" on top of the primary Category.
model Collection {
  id        String @id @default(uuid())
  name      String
  slug      String @unique
  icon      String
  sortOrder Int    @default(0)

  products Product[]

  @@map("collections")
}

enum ProductImageRole {
  MAIN
  GALLERY_LEFT
  GALLERY_TOP_RIGHT
  GALLERY_BOTTOM_RIGHT
  EXTRA
}

model ProductImage {
  id        String @id @default(uuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  url       String
  alt       String
  role      ProductImageRole
  sortOrder Int @default(0)

  @@map("product_images")
}

// "Select Your Design" options (Loose Bead, Silver Capped, ...)
model ProductVariant {
  id             String @id @default(uuid())
  productId      String
  product        Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  label          String
  priceDeltaCents Int    @default(0)
  image          String
  sortOrder      Int    @default(0)

  @@map("product_variants")
}

// "Select Energization" options
model ProductAddOn {
  id             String @id @default(uuid())
  productId      String
  product        Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  label          String
  priceDeltaCents Int    @default(0)
  sortOrder      Int    @default(0)

  @@map("product_addons")
}

model ProductSize {
  id        String @id @default(uuid())
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  label     String
  sortOrder Int @default(0)

  @@map("product_sizes")
}

model Review {
  id         String   @id @default(uuid())
  productId  String
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  userId     String?
  user       User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  authorName String
  title      String
  body       String   @db.Text
  rating     Int
  createdAt  DateTime @default(now())

  @@index([productId])
  @@map("reviews")
}
```

Also add the inverse relation `reviews Review[]` to the existing `User` model.

Run: `npx prisma migrate dev --name add_product_catalog`

## Seed Data (`prisma/seed.ts`)

Add `tsx` as a dev dependency and configure seeding in `package.json`:
```json
"prisma": { "seed": "tsx prisma/seed.ts" }
```
Run via `npx prisma db seed` after the migration.

### Categories (12) — union of the Header "Products" mega-menu (`productColumns`
in `Header.tsx`: Rudraksha, Bracelets, Murtis, Siddha Mala, Gemstones,
Antiques, Combinations, Singing Bowls, Necklaces) + the 3 extra
`ShopByCategory.tsx` types not in that menu (Rings, Earrings, Charms) —
so every nav entry resolves to a real category with at least one product.

| name | slug | image |
|---|---|---|
| Rudraksha | rudraksha | /assets/images/home/rudraksh.png |
| Bracelets | bracelets | /assets/images/products/category-bracelets.png |
| Murtis | murtis | /assets/images/home/god.png |
| Siddha Mala | siddha-mala | /assets/images/about/about-sacred-1.png |
| Gemstones | gemstones | /assets/images/about/about-p01-3021a5.png |
| Antiques | antiques | /assets/images/about/about-founding-2.png |
| Combinations | combinations | /assets/images/about/about-principle-3.png |
| Singing Bowls | singing-bowls | /assets/images/about/about-p04.png |
| Necklaces | necklaces | /assets/images/products/category-necklace.png |
| Rings | rings | /assets/images/products/category-rings.png |
| Earrings | earrings | /assets/images/products/category-earrings.png |
| Charms | charms | /assets/images/products/category-charms.png |

Sizes seeded for every product (matches `ProductListing.tsx` filter list):
`<18mm, <20mm, <24mm, <28mm`

### Collections (8) — matches `ShopByPurpose.tsx` / `HowToChooseExploreByPurpose.tsx`
| name | slug | icon |
|---|---|---|
| Wealth | wealth | /assets/icons/wealth.svg |
| Health | health | /assets/icons/health.svg |
| Love | love | /assets/icons/love.svg |
| Luck | luck | /assets/icons/luck.svg |
| Protection | protection | /assets/icons/protection.svg |
| Peace | peace | /assets/icons/peace.svg |
| Courage | courage | /assets/icons/courage.svg |
| Balance | balance | /assets/icons/balance.svg |

### Products (18 total)

**Rudraksha category (7 products)** — gives the detail page 6 same-category
siblings for `SimilarProducts`:

1. **4 Mukhi (Regular) Rudraksha** — slug `4-mukhi-regular-rudraksha` — $160 / compare $170 — bestseller — collections: Health, Peace — **full detail data** (this is the product the existing `/products/[slug]` page is built against):
   - Images: MAIN `about-sacred-2.png`, GALLERY_LEFT `category-necklace.png`, GALLERY_TOP_RIGHT `about-p02.png`, GALLERY_BOTTOM_RIGHT `rudraksh.png` (same as current `galleryImages`)
   - Variants (from current `designs`): Loose Bead (+$0, `beads.png`), Silver Capped (+$120, `category-bracelets.png`), Silver Chain (+$180, `category-charms.png`), Rudraksha Chain (+$220, `category-earrings.png`)
   - Add-ons (from current `energizationOptions`): Free Touch Energization (+$0), Rudraksha Prana Pratishtha Pooja (+$299), Maha Shivaratri Pooja at Pashupatinath - 2026 (+$301), Trividha Prana Pratishtha Pooja (3 Brahmans) (+$599), Dwadasha Maha Prana Pratishtha Pooja (13 Brahmans) (+$1200)
   - Description/Shipping/Packaging/Returns: reuse current `accordionSections` copy
   - stockCount 3, ratingAvg 5.0, ratingCount 1200
   - 2 reviews (from current `ProductReviews.tsx`): "Exquisite Craftsmanship & Timeless Beauty" by Annette Black, "Perfect Gift for Any Occasion" by Darrell Steward — both 5★, dated Feb 25 2025

2. **5 Mukhi Rudraksha** — `5-mukhi-rudraksha` — $140 / $150 — bestseller — image `about-sacred-1.png` — collections: Wealth, Balance
3. **6 Mukhi Rudraksha** — `6-mukhi-rudraksha` — $180 / $200 — bestseller — image `about-founding-1.png` — collections: Love, Peace
4. **7 Mukhi Rudraksha** — `7-mukhi-rudraksha` — $200 / $220 — bestseller — image `about-founding-2.png` — collections: Luck, Protection
5. **8 Mukhi Rudraksha** — `8-mukhi-rudraksha` — $230 / $250 — bestseller — image `about-p04.png` — collections: Protection, Courage
6. **9 Mukhi Rudraksha** — `9-mukhi-rudraksha` — $240 / $250 — bestseller — image `about-principle-3.png` — collections: Courage, Wealth
7. **12 Mukhi Rudraksha** — `12-mukhi-rudraksha` — $280 / $300 — not bestseller — image `about-p01-3021a5.png` — collections: Balance, Peace

**One product per remaining category (11 products)**:

8. **Rudraksha Bracelet** — `rudraksha-bracelet` — Bracelets — $120 / $130 — bestseller — image `category-bracelets.png` — collections: Protection, Luck
9. **Rudraksha Murti (Lord Shiva)** — `rudraksha-murti-shiva` — Murtis — $350 / $400 — not bestseller — image `home/god.png` — collections: Peace, Health
10. **Siddha Mala (108 Beads)** — `siddha-mala-108-beads` — Siddha Mala — $260 / $290 — not bestseller — image `about-sacred-1.png` — collections: Wealth, Health
11. **Natural Gemstone Ring** — `natural-gemstone-ring` — Gemstones — $190 / $210 — not bestseller — image `about-p01-3021a5.png` — collections: Luck, Love
12. **Antique Rudraksha Pendant** — `antique-rudraksha-pendant` — Antiques — $320 / $360 — not bestseller — image `about-founding-2.png` — collections: Balance, Courage
13. **5+7 Mukhi Combination Bracelet** — `5-7-mukhi-combination-bracelet` — Combinations — $210 / $230 — not bestseller — image `about-principle-3.png` — collections: Wealth, Protection
14. **Himalayan Singing Bowl** — `himalayan-singing-bowl` — Singing Bowls — $180 / $200 — not bestseller — image `about-p04.png` — collections: Peace, Balance
15. **Rudraksha Necklace** — `rudraksha-necklace` — Necklaces — $230 / $250 — bestseller — image `category-necklace.png` — collections: Love, Health
16. **Rudraksha Ring** — `rudraksha-ring` — Rings — $95 / $120 — not bestseller — image `category-rings.png` — collections: Luck, Wealth
17. **Rudraksha Earrings** — `rudraksha-earrings` — Earrings — $160 / $170 — not bestseller — image `category-earrings.png` — collections: Balance, Love
18. **Rudraksha Charm Pendant** — `rudraksha-charm-pendant` — Charms — $140 / $150 — not bestseller — image `category-charms.png` — collections: Health, Protection

Products 2–18 each get one MAIN `ProductImage`, generic description/shipping/packaging/returns copy (same Lorem Ipsum currently in `accordionSections`), `breadcrumbLabel` = their own name, stockCount 10, ratingAvg 4.8, ratingCount between 80–400 (varied), and the same 4 sizes. This gives:
- 8 bestsellers total for `BestsellerProducts` (products 1,2,3,4,5,6,8,15)
- 6 same-category "Rudraksha" products for `SimilarProducts` on the detail page (excluding the current one)
- 18 products across all 12 categories for `ProductListing` on `/products`
- Every collection (Wealth/Health/Love/Luck/Protection/Peace/Courage/Balance) has 3–5 products for future "Shop By Purpose" pages

## Currency Display Layer

Self-contained addition — converts the canonical USD-cent prices for
display in USD or INR. No DB model needed for "for now" (US + India only);
exchange rate is a static constant that can move to config/DB later.

- **`src/lib/currency.ts`** (new): `CURRENCIES` map (`USD`: symbol `$`, rate `1`;
  `INR`: symbol `₹`, rate `83`), `CurrencyCode` type, and `formatPrice(cents, currency)`.
- **`src/components/CurrencyProvider.tsx`** (new): `"use client"` context —
  `currency` state (`CurrencyCode`, default `"USD"`), `setCurrency`,
  persisted to `localStorage`. Exposes a `useCurrency()` hook returning
  `{ currency, setCurrency, formatPrice }`.
- **`src/app/layout.tsx`**: wrap `{children}` (and `Header`) in `<CurrencyProvider>`.
- **`src/components/Header.tsx`**:
  - Desktop currency control (~line 186-189, currently a static `<span>USD</span>` +
    chevron): becomes a small click-to-open dropdown with "USD" / "INR"
    options calling `setCurrency`.
  - Mobile menu "CURRENCY" row (~line 276-282, same static markup): same
    dropdown treatment.

This doesn't change any product prices yet (no components read product data
from the DB until Phase 2), but it gives Phase 2 a ready `useCurrency()` /
`formatPrice()` to call when rendering real `priceCents` values.

## Files Touched
- `prisma/schema.prisma` — new models (`Category`, `Product`, `ProductImage`,
  `ProductVariant`, `ProductAddOn`, `ProductSize`, `Review`, `Collection`) +
  `User.reviews` relation
- `prisma/migrations/<timestamp>_add_product_catalog/` — generated by `prisma migrate dev`
- `prisma/seed.ts` — new seed script
- `package.json` — add `tsx` devDependency + `prisma.seed` config
- `src/lib/currency.ts` — new
- `src/components/CurrencyProvider.tsx` — new
- `src/app/layout.tsx` — wrap children in `CurrencyProvider`
- `src/components/Header.tsx` — working currency dropdown (desktop + mobile)

## Verification
1. `npx prisma migrate dev --name add_product_catalog` — confirm migration applies cleanly against the configured `DATABASE_URL`.
2. `npx prisma db seed` — confirm it runs without errors.
3. Open Prisma Studio (`npx prisma studio`) or a quick ad-hoc script to spot-check: 12 categories, 8 collections, 18 products, the 4-mukhi product has 4 images / 4 variants / 5 add-ons / 2 reviews / 4 sizes / 2 collections.
4. `npx tsc --noEmit` to confirm everything compiles cleanly.
5. `npm run dev` + visit the site: click the Header currency control, confirm it toggles between USD/INR (label updates, persists across reload via localStorage).

## Next Steps (future phases, not part of this plan)
- Phase 2: data-access layer (`src/lib/products.ts`) + wire `ProductListing`, `BestsellerProducts`, `SimilarProducts`, `ShopByCategory`, `ShopByPurpose`, and `/products/[slug]` to real queries — including rendering prices via `useCurrency().formatPrice()`.
- Phase 3: cart/checkout/orders.
- Resume the previously-drafted Google OAuth + Email OTP auth plan whenever desired (independent of this work).

---

## OPEN QUESTION — waiting on user input

The user has NOT yet confirmed the exact category list/count. The 12-category
list above is a proposal (union of the navbar's 9-category "Products" dropdown
and the 3 extra types from `ShopByCategory.tsx`: Rings, Earrings, Charms).

**Waiting on the user to provide the exact number of categories and their
exact names** before finalizing the Categories table, Products list, and
Collection assignments above.
