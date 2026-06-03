# 🔐 Security & Vulnerability Guide — Jewellery E-Commerce Platform

> **For AI Coding Agents:** Read this entire file before writing any feature. Every rule here is non-negotiable. These are production safety requirements, not suggestions.

---

## 🛒 1. PAYMENT SECURITY

### ❌ Double Payment / Duplicate Orders
- **Disable the "Pay Now" button immediately on first click** using a loading state
- Use a `isProcessing` boolean state — once `true`, button must be unclickable and show a spinner
- On the backend, generate a unique `idempotency key` per order (UUID) before hitting Razorpay API
- If same idempotency key hits the API twice, Razorpay returns the same response — no double charge
- **Never create the order row in DB before payment is confirmed** — only write to DB after Razorpay webhook confirms `payment.captured`

```js
// ✅ CORRECT PATTERN
const [isProcessing, setIsProcessing] = useState(false);

const handlePayment = async () => {
  if (isProcessing) return; // hard stop
  setIsProcessing(true);
  try {
    // payment logic
  } finally {
    setIsProcessing(false); // always re-enable even on error
  }
};

<button disabled={isProcessing} onClick={handlePayment}>
  {isProcessing ? "Processing..." : "Pay Now"}
</button>
```

### ❌ Verify Payment on Backend — NEVER Trust Frontend
- After Razorpay payment, always verify the signature on your **server** using `razorpay.webhooks.verifyPaymentSignature()`
- Never mark an order as paid based on frontend response alone
- Use Razorpay **webhooks** as the source of truth for order status updates

### ❌ Price Tampering
- **Never send price from the frontend** to create a Razorpay order
- Always fetch the product price from **your database on the server** when creating the order
- A user can manipulate frontend requests to send `price: 1` — always calculate total on backend

---

## 🔐 2. AUTHENTICATION & AUTHORIZATION

### ❌ Unauthenticated Actions
These actions must **always** require a logged-in user. Check session server-side, not just client-side:
- Add to cart
- Place order / checkout
- Submit a review
- View order history
- Access wishlist

```js
// ✅ In every protected API route
const session = await getServerSession(authOptions);
if (!session) return res.status(401).json({ error: "Unauthorized" });
```

### ❌ Accessing Another User's Data via URL
- Never expose raw DB IDs in URLs for sensitive resources (e.g., `/orders/123`)
- Always validate that the logged-in user **owns** the resource they're requesting

```js
// ✅ CORRECT — always scope queries to the logged-in user
const order = await prisma.order.findFirst({
  where: {
    id: orderId,
    userId: session.user.id, // MUST include this
  },
});

if (!order) return res.status(404).json({ error: "Not found" });
```

### ❌ Admin Routes Exposed to Regular Users
- All `/admin/*` routes must check for `role: "ADMIN"` in the session
- Never rely on hiding the admin link — always protect the API route itself

```js
if (session.user.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
```

---

## 🖼️ 3. FILE / IMAGE UPLOAD SECURITY

### ❌ Unrestricted File Uploads
- Only allow image file types: `jpg`, `jpeg`, `png`, `webp`
- Validate file type on **both frontend and backend** — never trust frontend alone
- Set a max file size limit (e.g., 5MB) to prevent storage abuse
- Upload directly to Cloudinary from server — never expose your Cloudinary API secret to the frontend
- Use Cloudinary **signed uploads** only

```js
// ✅ Validate before upload
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
if (!allowedTypes.includes(file.mimetype)) {
  return res.status(400).json({ error: "Invalid file type" });
}
```

---

## 🧾 4. CART SECURITY

### ❌ Cart Manipulation
- Store cart in DB (linked to userId) for logged-in users — not just localStorage
- On checkout, **re-fetch all product prices from DB** and recalculate cart total server-side
- Never trust the cart total sent from the client

### ❌ Negative Quantity / Zero Price Items
- Validate that quantity is a positive integer (min: 1, max: 10 or set a cap)
- Validate that product exists and is in stock before adding to cart

---

## 💬 5. REVIEW SYSTEM SECURITY

### ❌ Fake / Unverified Reviews
- A user can only submit a review if their `order` for that `productId` has status `DELIVERED`
- Check this on the **backend** before saving the review
- One review per `userId + productId` combination — enforce with a unique DB constraint

```sql
-- Prisma schema
@@unique([userId, productId])
```

### ❌ Review Spam / XSS in Review Text
- Sanitize all user-submitted text before saving to DB
- Use a library like `DOMPurify` or `sanitize-html` on the backend
- Set a character limit on review text (e.g., max 500 chars)

---

## 🔑 6. API & ENVIRONMENT SECURITY

### ❌ Exposed API Keys
- **Never hardcode** API keys, DB URLs, or secrets in code
- Always use `.env` files and add `.env` to `.gitignore`
- Use separate keys for dev and production environments

```
# .env
DATABASE_URL=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
CLOUDINARY_API_SECRET=...
NEXTAUTH_SECRET=...
```

### ❌ Open API Routes (No Rate Limiting)
- Add rate limiting on sensitive routes: login, register, checkout, review submit
- Use `upstash/ratelimit` with Redis or a simple in-memory limiter
- Prevents brute force attacks and spam

---

## 🗄️ 7. DATABASE SECURITY

### ❌ SQL Injection
- Always use **Prisma ORM** parameterized queries — never raw string SQL with user input
- If using raw queries, always use `prisma.$queryRaw` with tagged template literals

### ❌ Sensitive Data Exposure
- Never return password hashes or sensitive fields in API responses
- Use Prisma `select` to explicitly whitelist fields returned to client

```js
// ✅ Only return what's needed
const user = await prisma.user.findUnique({
  where: { id },
  select: { id: true, name: true, email: true }, // never return passwordHash
});
```

---

## 📦 8. ORDER FLOW SECURITY

### Correct Order of Operations (Never Deviate):
1. User clicks "Place Order"
2. Button disabled immediately
3. Backend creates Razorpay order (amount fetched from DB)
4. Frontend opens Razorpay payment modal
5. User pays
6. Razorpay calls your **webhook** with `payment.captured`
7. **Only now** — create order row in DB with status `PAID`
8. Send confirmation email
9. Clear user's cart

> ⚠️ If payment fails at step 5 — do NOT create any order in DB. Show error, re-enable button.

---

## 🚫 9. GENERAL RULES FOR THE AI AGENT

- **Never trust user input** — validate everything on the server
- **Never skip auth checks** assuming the frontend already handled it
- **Never expose internal error messages** to the client (use generic messages in production)
- **Always use HTTPS** — enforce it in production deployment
- **Log suspicious activity** — multiple failed payments, rapid add-to-cart, etc.
- **Test every protected route** by manually calling it without a valid session — it should always return 401/403
- When in doubt — **reject the request, log it, and let the user retry**

---

*Last updated: Project kickoff — update this file as new features are added.*
