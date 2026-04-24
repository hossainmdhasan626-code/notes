# 🖥️ Server vs Client Component

---

## ১. App Router-এর সবচেয়ে বড় concept

Next.js App Router-এ সব component **default-এ Server Component**।
Client Component বানাতে চাইলে নিজে বলতে হবে।

---

## ২. Server Component — Default

```jsx
// app/products/page.jsx
// 'use client' নেই → Server Component

async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    cache: 'no-store', // SSR: প্রতিবার fresh data
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts(); // সরাসরি await — Server Component-এ পারা যায়!

  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```

**Server Component পারে:**
- ✅ সরাসরি `async/await` — `useEffect` লাগে না
- ✅ Database/API সরাসরি access
- ✅ Server-only secret key ব্যবহার (env variables)
- ✅ JS bundle-এ যায় না → page size ছোট

**Server Component পারে না:**
- ❌ `useState`, `useEffect`, `useContext` — hooks নেই
- ❌ Browser events — `onClick`, `onChange` নেই
- ❌ Browser-only API — `window`, `localStorage` নেই

---

## ৩. Client Component — `'use client'`

```jsx
'use client'; // এই line দিলেই Client Component হয়

import { useState } from 'react';

export default function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? '❤️ Liked' : '🤍 Like'}
    </button>
  );
}
```

**Client Component পারে:**
- ✅ `useState`, `useEffect`, সব hooks
- ✅ Event handlers — `onClick`, `onChange` ইত্যাদি
- ✅ Browser API — `window`, `localStorage`
- ✅ Real-time interactivity

**Client Component পারে না:**
- ❌ `async` function as component (directly)
- ❌ Server-only features (database directly)

---

## ৪. কোনটা কখন ব্যবহার করবো?

```
এই question-গুলো করো:

→ Data fetch করতে হবে? Database access? → Server Component ✅
→ onClick/onChange লাগবে? → Client Component ✅
→ useState/useEffect লাগবে? → Client Component ✅
→ window/localStorage লাগবে? → Client Component ✅
→ শুধু UI দেখাবে, interaction নেই? → Server Component ✅
```

---

## ৫. Pattern — Server + Client একসাথে

```jsx
// app/blog/page.jsx — Server Component (data fetch করে)
import LikeButton from './LikeButton'; // Client Component import

async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts(); // Server-এ data fetch

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <LikeButton postId={post.id} /> {/* Client Component ভেতরে ✅ */}
        </article>
      ))}
    </div>
  );
}
```

```jsx
// LikeButton.jsx — Client Component
'use client';
import { useState } from 'react';

export default function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false);
  return <button onClick={() => setLiked(!liked)}>Like</button>;
}
```

> 🏆 Best Practice: **যতটুকু সম্ভব Server Component রাখো।** শুধু interactive অংশকে Client Component বানাও।

---

## ৬. Server Component-এ Client Component import — ✅

```jsx
// ✅ Server → Client: সব সময় কাজ করে
// Server Component-এ Client Component import করা যায়
```

## Client Component-এ Server Component import — ❌

```jsx
'use client';
// ❌ Client Component-এ Server Component সরাসরি import করা যায় না
// কারণ: Client bundle-এ server-only code পাঠানো যাবে না

// ✅ Solution: children prop দিয়ে pass করো
// Server Component → children → Client Component
```

---

## ৭. `children` Pattern দিয়ে Solution

```jsx
// ClientWrapper.jsx
'use client';
export default function ClientWrapper({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && children} {/* children = Server Component হতে পারে ✅ */}
    </div>
  );
}

// page.jsx (Server)
import ServerData from './ServerData'; // Server Component
import ClientWrapper from './ClientWrapper';

export default function Page() {
  return (
    <ClientWrapper>
      <ServerData /> {/* ✅ children হিসেবে pass করা যায় */}
    </ClientWrapper>
  );
}
```

---

## 🎯 Interview Tips

- App Router-এ সব component **default Server Component**।
- `'use client'` → Client Component বানাতে হয়।
- Server Component → hooks নেই, async data fetch পারে।
- Client Component → hooks আছে, browser events পারে।
- Boundary rule: Server → Client ✅, Client → Server ❌।
- Best Practice: Interactive অংশটুকু Client, বাকি সব Server।
- `children` prop দিয়ে Server Component-কে Client-এর ভেতরে রাখা যায়।
