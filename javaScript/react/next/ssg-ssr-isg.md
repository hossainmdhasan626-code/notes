# ⚡ SSG vs SSR vs ISG (Complete Master Note)

---

# 🎯 Goal

👉 Understand:

* SSG, SSR, ISG কী
* কেন ব্যবহার করা হয়
* Lifecycle (start → end)
* Default behavior
* Control & override methods
* Pros / Cons
* Real-world use cases

---

# 🟢 1. SSG (Static Site Generation)

---

## 🧠 SSG কী?

👉 Build time-এ HTML generate হয়

```text
Build → HTML তৈরি → CDN এ store → user কে serve
```

---

## 🎯 কেন ব্যবহার করা হয়?

```text
✔️ Fastest performance
✔️ SEO best
✔️ Server load কম
```

---

## 🧠 কখন ব্যবহার করবো?

* Blog
* Documentation
* Landing page
* Static content

---

## ⚙️ Lifecycle

```text
Build time → HTML generate
↓
Deploy
↓
User request → Ready HTML serve
```

---

## 📜 Convention (Next.js)

### App Router

👉 Default behavior:

```text
Default = Static (SSG)
```

---

### Force SSG

```javascript
export const dynamic = "force-static";
```

---

## ⚠️ Default Behavior

👉 Next.js:

```text
If no dynamic data → SSG auto apply
```

---

## 🔒 Dynamic block (SSG disable করার কারণ)

👉 যদি থাকে:

* cookies
* headers
* no-store fetch

👉 তাহলে SSG বন্ধ হয়ে যায় ❌

---

## ❌ Cons

```text
❌ Data stale হতে পারে
❌ Rebuild দরকার হয়
```

---

# 🔵 2. SSR (Server Side Rendering)

---

## 🧠 SSR কী?

👉 Request time-এ HTML generate হয়

```text
User request → Server render → HTML return
```

---

## 🎯 কেন ব্যবহার করা হয়?

```text
✔️ Always fresh data
✔️ Dynamic content
✔️ User-specific data
```

---

## 🧠 কখন ব্যবহার করবো?

* Dashboard
* Auth page
* Live data
* Personalized UI

---

## ⚙️ Lifecycle

```text
User request
↓
Server fetch data
↓
HTML generate
↓
Response send
```

---

## 📜 Convention

### Force SSR

```javascript
export const dynamic = "force-dynamic";
```

---

### fetch control

```javascript
fetch(url, { cache: "no-store" });
```

---

## ⚠️ Default Behavior

👉 যদি dynamic data detect হয়:

```text
Next.js auto SSR use করে
```

---

## ❌ Cons

```text
❌ Slow (every request render)
❌ Server load বেশি
```

---

# 🟣 3. ISG (Incremental Static Generation)

---

## 🧠 ISG কী?

👉 Static + Dynamic mix

```text
Static generate + background update
```

---

## 🎯 কেন ব্যবহার করা হয়?

```text
✔️ Fast + Fresh data
✔️ No full rebuild
```

---

## 🧠 কখন ব্যবহার করবো?

* E-commerce product
* News site
* Blog with updates

---

## ⚙️ Lifecycle

```text
Build → Static page
↓
User request
↓
Time expire হলে
↓
Background re-generate
```

---

## 📜 Convention

### 🟢 Page Level Revalidation

```javascript
export const revalidate = 10;
```

👉 10 sec পর page update হবে

---

### 🔵 Fetch Level Revalidation (VERY IMPORTANT)

```javascript
await fetch(url, {
  next: { revalidate: 10 }
});
```

👉 এইটা সবচেয়ে flexible control দেয়
👉 specific API call কে revalidate করা যায় (whole page না)

---

### 🧠 Difference (Page vs Fetch)

```text
Page revalidate → পুরো page update
Fetch revalidate → specific data update
```

---

## 🧠 On-demand revalidation

```javascript
revalidatePath("/product");
```

---

## ⚠️ Default Behavior

👉 SSG + revalidate = ISG

---

## ❌ Cons

```text
❌ Slight stale data window
❌ Complexity বেশি
```

---

# ⚔️ 4. Control সব একসাথে

---

## 🧠 Main Controls

```javascript
export const dynamic = "force-static";   // SSG
export const dynamic = "force-dynamic";  // SSR
export const revalidate = 10;            // ISG (page level)
```

---

## 🧠 fetch control

```javascript
fetch(url, { cache: "force-cache" })  // SSG
fetch(url, { cache: "no-store" })     // SSR

// ISG (fetch level)
fetch(url, {
  next: { revalidate: 10 }
});
```

---

# ⚡ 5. Comparison Table

| Feature     | SSG        | SSR     | ISG            |
| ----------- | ---------- | ------- | -------------- |
| Render Time | Build      | Request | Build + Update |
| Speed       | 🔥 Fastest | Slow    | Fast           |
| Data Fresh  | ❌ No       | ✔️ Yes  | ✔️ Almost      |
| Server Load | Low        | High    | Medium         |
| SEO         | Best       | Best    | Best           |
| Use Case    | Static     | Dynamic | Mixed          |

---

# 🎯 6. Final Understanding

```text
SSG → Fast but static
SSR → Dynamic but slow
ISG → Balance (best in most cases)
```

---

# 💬 Interview Ready Answer

👉 Question: **Difference between SSG, SSR, ISG?**

```text
SSG generates HTML at build time, SSR generates HTML on each request, and ISG combines both by generating static pages and updating them incrementally in the background.
```

---

# 🧠 Golden Rule

```text
Default = SSG
Need dynamic → SSR
Need balance → ISG
```

---

# 🔥 Hasan Tip

```text
Always try SSG first
Then ISG
SSR only when needed
```

---
