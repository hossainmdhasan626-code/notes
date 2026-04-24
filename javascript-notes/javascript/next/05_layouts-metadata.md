# 🎨 Layouts & Metadata — Next.js

---

## ১. Layout কী?

Layout হলো এমন UI যা একাধিক page-এ share হয়। Navigate করলে layout re-render হয় না — state টিকে থাকে।

---

## ২. Root Layout — সবচেয়ে জরুরি

```jsx
// app/layout.jsx — সব page-এ wrap হবে, এটা বাধ্যতামূলক
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <header>
          <nav>My App</nav>
        </header>
        <main>{children}</main> {/* প্রতিটা page এখানে render হয় */}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

> ⚠️ `<html>` আর `<body>` tag শুধু Root Layout-এ থাকবে।

---

## ৩. Nested Layout — Section-এর নিজস্ব Layout

```jsx
// app/dashboard/layout.jsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white">
        <nav>
          <a href="/dashboard">Overview</a>
          <a href="/dashboard/settings">Settings</a>
        </nav>
      </aside>
      <div className="flex-1 p-8">
        {children} {/* /dashboard/*, /dashboard/settings/* এখানে আসবে */}
      </div>
    </div>
  );
}
```

**Layout nesting:**
```
RootLayout
  └── DashboardLayout
        └── page.jsx (যে route-এ আছো সেটা)
```

---

## ৪. Metadata — SEO সেটআপ

### Static Metadata

```jsx
// app/about/page.jsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে | My App',
  description: 'আমরা কারা, কী করি — জানো এখানে।',
  keywords: ['javascript', 'react', 'next.js'],
  openGraph: {
    title: 'আমাদের সম্পর্কে',
    description: 'আমরা কারা, কী করি — জানো এখানে।',
    images: ['/og-image.jpg'],
  },
};

export default function AboutPage() {
  return <h1>আমাদের সম্পর্কে</h1>;
}
```

---

### Dynamic Metadata — API data থেকে

```jsx
// app/blog/[slug]/page.jsx

export async function generateMetadata({ params }) {
  const post = await fetch(`/api/posts/${params.slug}`).then(r => r.json());

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPost({ params }) {
  const post = await fetch(`/api/posts/${params.slug}`).then(r => r.json());
  return <article>{post.content}</article>;
}
```

---

## ৫. Title Template — বারবার App Name না লিখতে

```jsx
// app/layout.jsx
export const metadata = {
  title: {
    default: 'My App',        // শুধু / page-এ
    template: '%s | My App',  // অন্য সব page-এ: "About | My App"
  },
  description: 'My application',
};

// app/about/page.jsx
export const metadata = {
  title: 'About', // দেখাবে: "About | My App"
};
```

---

## ৬. Font Optimization — Next.js Font

```jsx
// app/layout.jsx
import { Inter, Hind_Siliguri } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',  // Font load হওয়ার আগে fallback দেখাবে
});

const hind = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '600'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${inter.className} ${hind.className}`}>
      <body>{children}</body>
    </html>
  );
}
// Font আলাদা server থেকে load হয় না — Next.js নিজেই serve করে → faster ✅
```

---

## ৭. Image Optimization — `<Image>` Component

```jsx
import Image from 'next/image';

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile Photo"
      width={200}
      height={200}
      priority  // Above-the-fold image-এ দাও → faster LCP
    />
  );
}
// Automatic: WebP convert, lazy load, resize, blur placeholder ✅
```

---

## ৮. `not-found.jsx` — Custom 404

```jsx
// app/not-found.jsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl">404</h1>
      <p>এই পেজটা পাওয়া যাচ্ছে না 😕</p>
      <Link href="/">Home-এ ফিরে যাও</Link>
    </div>
  );
}

// Programmatically 404 দেখাতে:
import { notFound } from 'next/navigation';
if (!data) notFound(); // এই function call করলে not-found.jsx দেখাবে
```

---

## 🎯 Interview Tips

- Root Layout বাধ্যতামূলক — `<html>` আর `<body>` এখানে।
- Layout navigate করলে re-render হয় না — state টিকে থাকে।
- `metadata` export → SEO meta tags automatically।
- `generateMetadata` → dynamic page-এর SEO (API data দিয়ে)।
- `title.template` → `%s | App Name` pattern — বারবার App Name লিখতে হয় না।
- `<Image>` component → HTML `<img>` এর চেয়ে অনেক better — optimization automatic।
- `next/font` → Google Font নিজেই host করে, layout shift (CLS) কমায়।
