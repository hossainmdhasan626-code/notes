# 📡 Data Fetching — Next.js

---

## ১. Next.js-এ Data Fetching-এর ৩ জায়গা

```
Server Component → সরাসরি async/await (সবচেয়ে বেশি ব্যবহৃত)
Client Component → useEffect + fetch (বা RTK Query)
Server Action    → Form submit বা button click-এ server function call
```

---

## ২. Server Component-এ Fetch — সহজতম উপায়

```jsx
// app/users/page.jsx
export default async function UsersPage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await res.json();

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
// Server-এ চলে → Client-এ পৌঁছায় ready-made HTML 🎉
```

---

## ৩. Caching Options — কখন কী ব্যবহার করবো

```jsx
// ১. Static (SSG) — Build-time-এ একবার fetch, সবাইকে same HTML দেয় (fastest)
const res = await fetch(url);
// বা explicitly:
const res = await fetch(url, { cache: 'force-cache' }); // default

// ২. No Cache (SSR) — প্রতিটা request-এ নতুন করে fetch
const res = await fetch(url, { cache: 'no-store' });

// ৩. Revalidate (ISR) — নির্দিষ্ট সময় পর পর cache refresh
const res = await fetch(url, { next: { revalidate: 60 } }); // ৬০ সেকেন্ড পর refresh
```

**কোনটা কখন:**

| Option | কখন ব্যবহার |
|--------|------------|
| Default / `force-cache` | Blog post, docs — data বদলায় না |
| `no-store` | Dashboard, feed — real-time data |
| `revalidate: N` | Product page — মাঝে মাঝে বদলায় |

---

## ৪. Route Segment Config — পুরো page-এর behavior

```jsx
// app/dashboard/page.jsx
export const dynamic    = 'force-dynamic'; // SSR — সবসময় fresh (= no-store)
export const revalidate = 3600;            // ISR — ১ ঘন্টা পর refresh
// export const dynamic = 'force-static';  // SSG — সবসময় cached

export default async function DashboardPage() {
  const data = await fetch('/api/stats').then(r => r.json());
  return <Stats data={data} />;
}
```

---

## ৫. Parallel Data Fetching — একসাথে অনেক API

```jsx
export default async function ProfilePage({ params }) {
  // ❌ Sequential — একটার পর একটা (slow)
  const user  = await fetch(`/api/users/${params.id}`).then(r => r.json());
  const posts = await fetch(`/api/posts?userId=${params.id}`).then(r => r.json());

  // ✅ Parallel — একসাথে (fast)
  const [user, posts] = await Promise.all([
    fetch(`/api/users/${params.id}`).then(r => r.json()),
    fetch(`/api/posts?userId=${params.id}`).then(r => r.json()),
  ]);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{posts.length} posts</p>
    </div>
  );
}
```

---

## ৬. Loading UI — `loading.jsx`

```jsx
// app/users/loading.jsx — page load হওয়ার সময় দেখাবে (Suspense)
export default function Loading() {
  return (
    <div className="flex justify-center">
      <div className="spinner" />
      <p>লোড হচ্ছে...</p>
    </div>
  );
}
// loading.jsx থাকলে Next.js নিজেই Suspense wrap করে ✅
```

---

## ৭. Error Handling — `error.jsx`

```jsx
// app/users/error.jsx
'use client'; // error boundary-কে client component হতে হয়

export default function ErrorPage({ error, reset }) {
  return (
    <div>
      <h2>কিছু একটা সমস্যা হয়েছে 😕</h2>
      <p>{error.message}</p>
      <button onClick={reset}>আবার চেষ্টা করো</button>
    </div>
  );
}
```

---

## ৮. Server Actions — Form থেকে Server Function Call

```jsx
// app/contact/page.jsx
async function sendMessage(formData) {
  'use server'; // এই function টা server-এ চলবে

  const name    = formData.get('name');
  const message = formData.get('message');

  await saveToDatabase({ name, message }); // সরাসরি DB call!
}

export default function ContactPage() {
  return (
    <form action={sendMessage}> {/* Server Action সরাসরি form-এ দেওয়া যায় */}
      <input name="name" />
      <textarea name="message" />
      <button type="submit">পাঠাও</button>
    </form>
  );
}
// JS disabled browser-এও কাজ করে! Progressive Enhancement ✅
```

---

## ৯. `generateStaticParams` — Dynamic Route-এ SSG

```jsx
// app/blog/[slug]/page.jsx

// Build time-এ কোন কোন slug render করবে বলে দাও
export async function generateStaticParams() {
  const posts = await fetch('/api/posts').then(r => r.json());
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const post = await fetch(`/api/posts/${params.slug}`).then(r => r.json());
  return <article>{post.content}</article>;
}
// Build time-এ সব slug-এর HTML বানিয়ে রাখবে → ultra fast ✅
```

---

## 🎯 Interview Tips

- Server Component-এ সরাসরি `async/await` — `useEffect` লাগে না।
- `cache: 'no-store'` → SSR (প্রতি request-এ fresh)।
- `next: { revalidate: N }` → ISR (N সেকেন্ড পর refresh)।
- Default fetch → SSG (build-time cache)।
- `loading.jsx` → automatic Suspense, loader UI।
- `error.jsx` → error boundary, `'use client'` বাধ্যতামূলক।
- Server Actions → Form-এ সরাসরি server function, API route লাগে না।
- `Promise.all` → parallel fetch, sequential-এর চেয়ে fast।
