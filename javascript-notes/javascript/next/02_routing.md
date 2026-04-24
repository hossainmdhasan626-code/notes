# 🗺️ Next.js Routing — App Router

---

## ১. File-based Routing — Folder = Route

App Router-এ `app/` folder-এর ভেতরের structure-ই route হয়।

```
app/
├── page.jsx              → /
├── about/
│   └── page.jsx          → /about
├── blog/
│   ├── page.jsx          → /blog
│   └── [slug]/
│       └── page.jsx      → /blog/my-post (Dynamic)
├── shop/
│   └── [...categories]/
│       └── page.jsx      → /shop/a/b/c (Catch-all)
└── dashboard/
    ├── layout.jsx        → Dashboard-এর shared layout
    ├── page.jsx          → /dashboard
    └── settings/
        └── page.jsx      → /dashboard/settings
```

---

## ২. Special Files — বিশেষ নামের file

| File | কাজ |
|------|-----|
| `page.jsx` | Route-এর UI — এটা ছাড়া route accessible না |
| `layout.jsx` | Wrapper — সব child route-এ share হয় |
| `loading.jsx` | Loading UI — Suspense automatically |
| `error.jsx` | Error UI — `"use client"` লাগবে |
| `not-found.jsx` | 404 page |
| `route.js` | API endpoint (GET, POST etc.) |

---

## ৩. Dynamic Routes — `[param]`

```jsx
// app/blog/[slug]/page.jsx
export default function BlogPost({ params }) {
  // URL /blog/my-first-post হলে
  // params = { slug: 'my-first-post' }

  return <h1>Post: {params.slug}</h1>;
}
```

```jsx
// app/shop/[...categories]/page.jsx — Catch-all
// URL /shop/men/shirts/blue হলে
// params = { categories: ['men', 'shirts', 'blue'] }
export default function ShopPage({ params }) {
  return <p>Category: {params.categories.join(' > ')}</p>;
}
```

---

## ৪. Layout — Shared Wrapper

```jsx
// app/layout.jsx — Root Layout (সব page-এ থাকে)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}  {/* page.jsx এখানে render হয় */}
        <Footer />
      </body>
    </html>
  );
}

// app/dashboard/layout.jsx — Dashboard-এর নিজস্ব layout
export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

> 💡 Nested layout — Root Layout-এর ভেতরে Dashboard Layout, তার ভেতরে page।

---

## ৫. Link Component — Navigation

```jsx
import Link from 'next/link';

// HTML <a> tag use করো না — page reload হয়
// Link use করো — SPA navigation হয় ✅
export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog/my-post">Blog Post</Link>
      {/* prefetch default true — hover করলেই background-এ load হয় */}
    </nav>
  );
}
```

---

## ৬. Programmatic Navigation — `useRouter()`

```jsx
'use client'; // Client Component লাগবে useRouter-এর জন্য

import { useRouter } from 'next/navigation'; // 'next/navigation' — App Router

export default function LoginForm() {
  const router = useRouter();

  const handleLogin = async () => {
    await loginUser();
    router.push('/dashboard');    // Navigate করো
    // router.replace('/dashboard'); // History-তে রাখবে না
    // router.back();               // আগের page-এ যাও
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

---

## ৭. Route Groups — Folder কিন্তু Route না

```
app/
├── (auth)/              ← (auth) route-এ আসে না, শুধু organize করার জন্য
│   ├── login/
│   │   └── page.jsx    → /login
│   └── register/
│       └── page.jsx    → /register
├── (main)/
│   ├── dashboard/
│   │   └── page.jsx    → /dashboard
```

> Parenthesis দিলে folder URL-এ আসে না — আলাদা layout দিতে বা group করতে কাজে লাগে।

---

## ৮. `searchParams` — URL Query Parameters

```jsx
// URL: /products?category=shoes&sort=price

export default function ProductsPage({ searchParams }) {
  // searchParams = { category: 'shoes', sort: 'price' }
  const category = searchParams.category;
  const sort      = searchParams.sort;

  return <p>Category: {category}, Sort: {sort}</p>;
}
```

---

## 🎯 Interview Tips

- App Router-এ `page.jsx` ছাড়া route publicly accessible হয় না।
- `layout.jsx` → re-render হয় না navigate করলে — state টিকে থাকে।
- `<Link>` → SPA navigation, `<a>` → full page reload।
- Dynamic route → `[param]` folder, Catch-all → `[...param]` folder।
- `useRouter` → `'next/navigation'` থেকে (App Router), `'next/router'` না।
- Route Groups `(folder)` → URL-এ আসে না, organize করতে এবং আলাদা layout দিতে।
