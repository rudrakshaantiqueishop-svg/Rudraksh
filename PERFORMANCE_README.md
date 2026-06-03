# ⚡ Performance Optimization Guide — Jewellery E-Commerce Platform

> **For AI Coding Agents:** Read this entire file before writing any API route, database query, or UI component. Performance is a first-class requirement. Never fetch more than needed. Never skip pagination. Never ignore indexes.

---

## 📄 1. PAGINATION — MANDATORY ON ALL LIST APIS

Every API that returns a list **must** be paginated. No exceptions.

### ❌ NEVER do this:
```js
// Fetches ALL products from DB — kills performance at scale
const products = await prisma.product.findMany();
```

### ✅ ALWAYS do this (Cursor-based pagination — preferred):
```js
const { cursor, limit = 12 } = req.query;

const products = await prisma.product.findMany({
  take: Number(limit),
  skip: cursor ? 1 : 0,
  cursor: cursor ? { id: cursor } : undefined,
  orderBy: { createdAt: "desc" },
  select: { ... }, // always use select — see Section 2
});

const nextCursor = products.length === limit ? products[products.length - 1].id : null;

return res.json({ products, nextCursor });
```

### ✅ OR Offset-based (simpler, fine for admin panels):
```js
const { page = 1, limit = 12 } = req.query;
const skip = (Number(page) - 1) * Number(limit);

const [products, total] = await prisma.$transaction([
  prisma.product.findMany({ skip, take: Number(limit), orderBy: { createdAt: "desc" } }),
  prisma.product.count(),
]);

return res.json({ products, total, page: Number(page), totalPages: Math.ceil(total / limit) });
```

### Pages that MUST have pagination:
- Product catalog / shop page (12 or 24 per page)
- Admin: product list, order list, user list
- Reviews on product page (5–10 per load)
- Order history (10 per page)

---

## 🎯 2. SELECT ONLY WHAT YOU NEED — NEVER `findMany()` BARE

Every Prisma query must use `select` or `include` scoped tightly. Never return entire rows unless absolutely necessary.

### ❌ NEVER:
```js
const products = await prisma.product.findMany(); // returns ALL columns including heavy fields
const user = await prisma.user.findUnique({ where: { id } }); // returns passwordHash too
```

### ✅ ALWAYS:
```js
// Product card on shop page — only need these fields
const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    slug: true,
    images: { select: { url: true }, take: 1 }, // only first image for card
    category: { select: { name: true } },
  },
  take: 12,
});

// Product detail page — fetch more but still scoped
const product = await prisma.product.findUnique({
  where: { slug },
  select: {
    id: true,
    name: true,
    description: true,
    price: true,
    stock: true,
    images: { select: { url: true } },
    reviews: {
      select: { rating: true, comment: true, user: { select: { name: true } } },
      take: 5,
      orderBy: { createdAt: "desc" },
    },
  },
});
```

### Field rules by context:
| Context | What to fetch |
|---|---|
| Product card (grid) | id, name, price, slug, 1 image |
| Product detail page | All product fields + images + 5 reviews |
| Cart item | id, name, price, stock, 1 image |
| Order list (admin) | id, total, status, createdAt, user.name |
| Order detail | Full order + items + user info |
| User profile | id, name, email only — never passwordHash |

---

## 🗂️ 3. DATABASE INDEXES — SET THESE BEFORE GOING LIVE

Indexes make queries fast. Without them, Postgres scans every row on every query.

### Add these indexes in your Prisma schema:

```prisma
model Product {
  id         String   @id @default(cuid())
  slug       String   @unique        // ← auto-indexed via @unique
  categoryId String
  price      Float
  createdAt  DateTime @default(now())
  isActive   Boolean  @default(true)

  @@index([categoryId])              // filter by category
  @@index([price])                   // sort/filter by price
  @@index([createdAt])               // sort by newest
  @@index([isActive])                // filter active products
  @@index([categoryId, price])       // combined filter (category + price range)
}

model Order {
  id        String   @id @default(cuid())
  userId    String
  status    String
  createdAt DateTime @default(now())

  @@index([userId])                  // user's order history
  @@index([status])                  // admin filter by status
  @@index([createdAt])               // sort by date
}

model Review {
  id        String @id @default(cuid())
  userId    String
  productId String

  @@index([productId])               // fetch reviews for a product
  @@unique([userId, productId])      // one review per user per product
}

model CartItem {
  id        String @id @default(cuid())
  userId    String
  productId String

  @@index([userId])                  // fetch user's cart fast
}
```

> ⚠️ After adding indexes, run `npx prisma migrate dev` to apply them.

---

## 🖼️ 4. IMAGE OPTIMIZATION

Jewellery images are large. Unoptimized images are the #1 cause of slow pages.

### Always use Next.js `<Image />` — never `<img>`
```jsx
// ✅ CORRECT
import Image from "next/image";

<Image
  src={product.images[0].url}
  alt={product.name}
  width={400}
  height={400}
  quality={80}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Cloudinary URL transformations — always request right size:
```js
// ❌ Returns original 4MB image
const url = product.imageUrl;

// ✅ Returns compressed, resized image via Cloudinary URL params
const optimizedUrl = product.imageUrl.replace(
  "/upload/",
  "/upload/w_400,h_400,c_fill,q_auto,f_auto/"
);
```

### Image rules:
| Usage | Size | Quality |
|---|---|---|
| Product card thumbnail | 400x400 | q_auto |
| Product detail main | 800x800 | q_90 |
| Product detail zoom | 1200x1200 | q_95 |
| Admin thumbnail | 100x100 | q_60 |
| Cart item | 80x80 | q_60 |

---

## 🚀 5. NEXT.JS RENDERING STRATEGY

Use the right rendering method for each page — don't default everything to client-side.

| Page | Strategy | Reason |
|---|---|---|
| Shop / Product listing | `SSG` + ISR (revalidate: 60) | SEO + fast load |
| Product detail page | `SSG` + ISR (revalidate: 30) | SEO critical |
| Cart | Client-side only | User-specific |
| Checkout | Server-side (`SSR`) | Auth + security |
| Order history | `SSR` | Auth required |
| Admin panel | `SSR` | Auth + fresh data |
| Homepage | `SSG` | Static, fast |

```js
// ✅ Product listing with ISR
export async function getStaticProps() {
  const products = await prisma.product.findMany({ ... });
  return { props: { products }, revalidate: 60 }; // rebuild every 60s
}

// ✅ Dynamic product pages
export async function getStaticPaths() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return {
    paths: products.map(p => ({ params: { slug: p.slug } })),
    fallback: "blocking",
  };
}
```

---

## 🔄 6. API RESPONSE CACHING

### Cache headers on product APIs:
```js
// Products don't change every second — cache for 60s
res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=30");
```

### Use React Query on frontend for smart caching:
```js
// ✅ Data is cached, won't re-fetch on every component mount
const { data } = useQuery({
  queryKey: ["products", categoryId, page],
  queryFn: () => fetchProducts(categoryId, page),
  staleTime: 1000 * 60, // treat data as fresh for 1 minute
});
```

---

## 🔍 7. SEARCH OPTIMIZATION

### ❌ NEVER do a full table scan for search:
```js
// Scans every row — slow at scale
await prisma.product.findMany({
  where: { name: { contains: query } }
});
```

### ✅ Use Postgres Full Text Search:
```js
await prisma.$queryRaw`
  SELECT id, name, price, slug
  FROM "Product"
  WHERE to_tsvector('english', name || ' ' || description) @@ plainto_tsquery(${query})
  LIMIT 12
`;
```

### Or add a search index in Prisma:
```prisma
model Product {
  @@index([name]) // basic index for simple LIKE queries on small datasets
}
```

---

## 📦 8. BUNDLE SIZE — KEEP IT LEAN

### Import only what you use:
```js
// ❌ Imports entire library
import _ from "lodash";

// ✅ Import only what you need
import debounce from "lodash/debounce";
```

### Lazy load heavy components:
```js
// ✅ Product image zoom only loads when needed
const ImageZoom = dynamic(() => import("@/components/ImageZoom"), { ssr: false });
```

### Never import heavy libraries for simple tasks:
| Task | ❌ Don't use | ✅ Use instead |
|---|---|---|
| Date formatting | moment.js (330kb) | date-fns (tree-shakeable) |
| HTTP requests | axios (whole lib) | native fetch |
| Icons | full icon pack | import single icon |

---

## 🗃️ 9. AVOID N+1 QUERY PROBLEM

### ❌ N+1 — makes 1 + N DB calls:
```js
const orders = await prisma.order.findMany(); // 1 query
for (const order of orders) {
  const items = await prisma.orderItem.findMany({ where: { orderId: order.id } }); // N queries!
}
```

### ✅ Use Prisma `include` to fetch in one query:
```js
const orders = await prisma.order.findMany({
  include: {
    items: {
      include: {
        product: { select: { name: true, images: { take: 1 } } }
      }
    }
  },
  take: 10,
});
```

---

## 📋 10. QUICK CHECKLIST — BEFORE EVERY API ROUTE

Before writing any API route, answer these:

- [ ] Does this return a list? → **Add pagination**
- [ ] Am I using `findMany()` without `select`? → **Add select**
- [ ] Is this field being filtered/sorted? → **Add DB index**
- [ ] Am I fetching images? → **Use Cloudinary transformations**
- [ ] Is this called on every render? → **Add React Query caching**
- [ ] Am I looping and calling DB inside? → **Use include instead**
- [ ] Am I returning sensitive fields? → **Remove from select**

---

*Last updated: Project kickoff — update as new features are added.*
