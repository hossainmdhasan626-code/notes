# ⚡ Next.js Data Cache (Complete Master Note)

---

# 🎯 Goal

👉 Understand Next.js data system deeply:

- Request Memoization vs Cache
- Data Cache system
- Revalidation system
- Advanced caching (tag, path)
- React vs Next.js difference
- Security & Server advantages

---

# 🧠 Big Picture (VERY IMPORTANT)

```text
Next.js Data System = 3 Layer
```

```text
1. Request Memoization (per render)
2. Data Cache (persistent)
3. Full Route Cache (HTML level)
```

👉 আজ আমরা focus করবো **Data Cache + related system** 🔥

---

# 🔥 1. Request Memoization (Automatic)

---

## 🧠 কী এটা?

👉 Same render cycle-এ same fetch call হলে
👉 Next.js **duplicate request বন্ধ করে দেয়**

---

## ⚙️ Example

```javascript
await fetch("https://api.com/products");
await fetch("https://api.com/products");
```

👉 Result:

```text
❌ 2 বার API call হবে না
✅ 1 বার call হবে (auto memoization)
```

---

## 🧠 কোথায় কাজ করে?

- Server Component
- generateMetadata
- layout / page

---

## ❗ Important

```text
✔️ Only same request হলে কাজ করে
✔️ Only same render cycle
❌ persistent না
```

---

## 🎯 React vs Next.js

| Feature      | React | Next.js |
| ------------ | ----- | ------- |
| Auto memoize | ❌    | ✔️      |

---

# 🔥 2. Data Cache (Persistent Cache)

---

## 🧠 কী এটা?

👉 Next.js fetch data **server-side cache করে রাখে**

---

## ⚙️ Default Behavior

```javascript
fetch(url);
```

👉 internally:

```text
cache = "force-cache"
```

---

## 🎯 Result

```text
1st request → API call
2nd request → cached data serve
```

---

## 🧠 কোথায় store হয়?

- Server (Vercel / Node runtime)
- CDN layer

---

## ⚡ Benefit

```text
✔️ Fast response
✔️ Less API call
✔️ Scalable
```

---

# 🔥 3. Cache Control Options

---

## 🟢 cache: "force-cache" (Default)

```javascript
fetch(url, { cache: "force-cache" });
```

👉 Data permanently cache হবে

---

## 🔴 cache: "no-store"

```javascript
fetch(url, { cache: "no-store" });
```

👉 Always fresh data

---

## 🧠 Behavior

| Option      | Behavior |
| ----------- | -------- |
| force-cache | SSG      |
| no-store    | SSR      |

---

# 🔥 4. Revalidation (ISR Core)

---

## 🧠 কী এটা?

👉 Cached data **auto update হয় নির্দিষ্ট সময় পর**

---

## ⚙️ Example

```javascript
fetch(url, {
  next: { revalidate: 10 },
});
```

---

## 🧠 Lifecycle

```text
1st → cache
↓
10 sec পর্যন্ত same data
↓
10 sec পর → background update
```

---

## ⚡ Benefit

```text
✔️ Fast + fresh
✔️ No rebuild needed
```

---

# 🔥 5. Tag-based Revalidation

---

## 🧠 কী এটা?

👉 Specific data manually update করা যায়

---

## ⚙️ Example

```javascript
fetch(url, {
  next: { tags: ["products"] },
});
```
এটি একটু বেশি অ্যাডভান্সড এবং বুদ্ধিমান পদ্ধতি। এখানে তুমি ডাটা ফেচ করার সময় তাকে একটা নাম বা ট্যাগ দাও।

👉 কীভাবে কাজ করে: তুমি ৫টি আলাদা পেজে "বিকাশ পেমেন্ট" এর ডাটা দেখাচ্ছ। তুমি প্রত্যেকটা fetch-এ একটা ট্যাগ দিলে { next: { tags: ['payment-info'] } }। এখন তুমি যদি শুধু revalidateTag('payment-info') কল করো, তবে ওই ৫টি পেজের শুধু পেমেন্ট ডাটাটুকুই আপডেট হবে, বাকি সব ক্যাশ ঠিক থাকবে।

👉 কখন ব্যবহার করবে: যখন একই ডাটা তোমার সাইটের অনেক জায়গায় থাকে এবং তুমি চাও এক জায়গায় আপডেট করলে সব জায়গায় যেন ফ্রেশ ডাটা চলে যায়।

---

## 🔁 Revalidate

```javascript
import { revalidateTag } from "next/cache";

revalidateTag("products");
```

---

## 🎯 Result

```text
Only "products" related cache update হবে
```

---

## ⚡ Use Case

- Admin panel update
- CMS update
- Product change

---

# 🔥 6. Path-based Revalidation

---

## ⚙️ Example

```javascript
import { revalidatePath } from "next/cache";

revalidatePath("/products");
```

---

## 🎯 Result

```text
Entire route cache clear হবে
```

---

# 🔥 7. Server Components Integration

---

## 🧠 Key Feature

👉 Direct async/await

```javascript
const data = await fetch(url);
```

---

## ❌ React (old way)

```javascript
useEffect + useState;
```

---

## ⚡ Benefit

```text
✔️ Cleaner code
✔️ Faster render
✔️ No client JS needed
```

---

# 🔥 8. Server-side Security

---

## 🧠 কেন secure?

👉 fetch server-এ হয়

```text
✔️ API key hidden
✔️ No browser exposure
```

---

## ❌ React problem

```text
API key leak risk ❌
```

---

# 🔥 9. Streaming + Suspense (Advanced)

---

## 🧠 কী?

👉 Data ready হলে UI load হয়

---

## ⚙️ Benefit

```text
✔️ Faster UX
✔️ Partial loading
```

---

# 🔥 10. Parallel vs Sequential Fetching

---

## 🟢 Parallel

```javascript
const [a, b] = await Promise.all([fetch("/a"), fetch("/b")]);
```

---

## 🔴 Sequential

```javascript
await fetch("/a");
await fetch("/b");
```

---

## ⚡ Difference

```text
Parallel = Fast
Sequential = Slow
```

---

# 🔥 11. React vs Next.js (Big Difference)

---

| Feature          | React | Next.js |
| ---------------- | ----- | ------- |
| Auto memoization | ❌    | ✔️      |
| Server fetch     | ❌    | ✔️      |
| Persistent cache | ❌    | ✔️      |
| Revalidation     | ❌    | ✔️      |
| Tag system       | ❌    | ✔️      |
| Secure fetch     | ❌    | ✔️      |

---

# ⚔️ Memoization vs Cache (VERY IMPORTANT)

---

## 🧠 Memoization

```text
✔️ Temporary
✔️ Per render
✔️ Same request avoid
❌ Save হয় না
```

---

## 🧠 Cache

```text
✔️ Persistent
✔️ Multiple request use
✔️ Stored data
```

---

## 🎯 Simple Analogy

```text
Memoization = Class e same question repeat hole teacher bole "agei bolsi"
Cache = Notebook e likha ache, pore abar dekha
```

---

# 🎯 Final Understanding

```text
Memoization = duplicate request stop
Cache = data store + reuse
Revalidation = data update system
```

---

# 🧠 Golden Rule

```text
Default = Cache (SSG)
Need fresh = no-store (SSR)
Need balance = revalidate (ISG)
```

---

# 🔥 Hasan Tip

```text
Next.js power = Data Layer 🔥

React UI banay
Next.js data control kore
```

---
