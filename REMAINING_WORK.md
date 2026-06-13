# Remaining Work / Open Items

Snapshot after building DB-backed cart + checkout flow up to the Razorpay
payment click.

## 1. Razorpay payment integration (biggest open item)

`/checkout` is fully built: auth-gated (middleware redirects guests to
`/login?callbackUrl=/checkout`), shows the cart (recomputed server-side from
the DB), lets the user pick a saved shipping address, and has a
"PAY WITH RAZORPAY" button (`src/components/checkout/PayWithRazorpayButton.tsx`)
with the required `isProcessing` disable-on-click + spinner state.

Clicking it calls the server action `initiateCheckout` in
`src/app/actions/checkout.ts`, which validates the address/cart/total
server-side and currently always returns
`"Online payments aren't enabled yet. Please check back soon."` because
`RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` aren't set.

Once those env vars are added, still to do (per `SECURITY_README.md`'s
order flow — never deviate):

- Add `Order` + `OrderItem` Prisma models (+ `OrderStatus` enum) and migrate.
- In `initiateCheckout`, create a Razorpay order via the Razorpay SDK using
  the server-recomputed `subtotalCents` (never trust a client total).
- Return `{ razorpayOrderId, amount, keyId }` to `PayWithRazorpayButton`,
  which opens the Razorpay checkout modal (`razorpay-checkout` script).
- Add a webhook route (e.g. `src/app/api/razorpay/webhook/route.ts`) that
  verifies the signature via `razorpay.webhooks.verifyPaymentSignature()`.
  Only on `payment.captured` create the `Order`/`OrderItem` rows (status
  `PAID`), then clear the user's cart (`clearCart` action) and send a
  confirmation email.
- If payment fails/is cancelled, do **not** create any order row — just
  show an error and re-enable the button (already handled client-side).
- Wire `/account/orders` (currently a static "no orders yet" placeholder)
  to list the user's `Order` rows once they exist.
- Add rate limiting to the checkout action (e.g. `upstash/ratelimit`), per
  the security doc.

## 2. Cart — now DB-backed for logged-in users

- `Cart` / `CartItem` Prisma models added (`prisma/schema.prisma`,
  migration `20260613184952_add_cart`).
- Server actions in `src/app/actions/cart.ts`: `getCart`, `addCartItem`,
  `removeCartItem`, `updateCartItemQuantity`, `clearCart`, `mergeGuestCart`
  — all `requireUser()`-gated, all prices/labels recomputed server-side from
  `src/lib/cart-server.ts` (never trust stored client prices).
- `CartProvider` is now session-aware: guests use `localStorage` (key
  `"cart"`) as before; on login, any local cart items are merged into the
  DB cart (`mergeGuestCart`) and localStorage is cleared, then the cart is
  loaded from the DB and stays DB-backed for the session.
- `/cart` shows a banner for guests ("you're not logged in... Log in to
  save your cart and checkout") with a link to `/login?callbackUrl=/cart`.
- "PROCEED TO CHECKOUT" (`/cart`) and "CHECKOUT" (cart drawer) now route
  guests to `/login?callbackUrl=/checkout` instead of `/checkout` directly.
- `/checkout` itself is in `protectedRoutes` in `src/proxy.ts`, so any
  direct visit while logged out is redirected to login by the middleware.

## 3. Other non-functional UI elements (unchanged from before)

- **Search icon** (Header, desktop/mobile/mobile-menu) — purely decorative,
  no search functionality or `/search` route.
- **Heart / wishlist icons** (Header, `ProductListing` card hover,
  `ProductDetailMain` "Add to wishlist") — no wishlist model/feature exists.
- **"BUY NOW" button** (`ProductDetailMain.tsx`) — not wired up. Likely
  should add-to-cart + jump straight to `/checkout`.
- **SimilarProducts** cards have no add-to-cart button (by original design).

## 4. Product catalog

`PRODUCT_CATALOG_PLAN.md` Phase 1 (schema + seed data + currency display)
appears already implemented and in active use by the cart/checkout pages.
