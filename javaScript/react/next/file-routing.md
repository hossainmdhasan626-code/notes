# 📁 Next.js File-Based Routing (Complete Note)

---

## 🎯 What is File-Based Routing?

👉 Next.js-এ routing system file structure-এর উপর নির্ভর করে।

```
File / Folder → URL Route
```

👉 মানে:

* আলাদা করে route define করতে হয় না
* Next.js automatically route তৈরি করে

---

## 📂 Basic Structure

```bash
app/
 ├── page.js
 ├── about/
 │    └── page.js
 └── contact/
      └── page.js
```

---

## 🌐 Generated Routes

| File                | Route      |
| ------------------- | ---------- |
| app/page.js         | `/`        |
| app/about/page.js   | `/about`   |
| app/contact/page.js | `/contact` |

---

## 🧠 How It Works

```
Create file → Next.js detect → Route auto create → Browser access
```

---

## 📄 page.js (IMPORTANT)

👉 প্রতিটি route-এর entry file:

```
page.js
```

👉 Without `page.js` → route কাজ করবে না ❌

---

## 📁 Nested Routing

```bash
app/dashboard/settings/page.js
```

👉 URL:

```
/dashboard/settings
```

---

## 🔀 Dynamic Routing

👉 dynamic route বানাতে:

```bash
app/blog/[id]/page.js
```

👉 URL:

```
/blog/1
/blog/2
```

---

### 🧠 Example

```javascript
export default function Blog({ params }) {
  return <h1>Blog ID: {params.id}</h1>;
}
```

---

## 🧩 Catch-All Routes

```bash
app/docs/[...slug]/page.js
```

👉 URL:

```
/docs/a
/docs/a/b
/docs/a/b/c
```

---

## 📦 Layout System (App Router Feature)

```bash
app/dashboard/layout.js
```

👉 এটি wrap করবে:

```
/dashboard এর সব page
```

---

## ⚡ Special Files (App Router)

| File         | Purpose        |
| ------------ | -------------- |
| layout.js    | shared layout  |
| loading.js   | loading UI     |
| error.js     | error handling |
| not-found.js | 404 page       |

---

## ⚠️ Important Rules

❌ File name ভুল হলে route কাজ করবে না
❌ `page.js` ছাড়া route হবে না

✔️ Folder name = URL path
✔️ Structure maintain করতে হবে

---

## 🚀 Full Flow

```
File → Route → Component render → Browser show
```

---

## 🎯 Interview Ready Answer

👉 Question: **What is file-based routing in Next.js?**

```
In Next.js, routing is based on the file system.
Each file inside the app or pages directory automatically becomes a route,
so developers don’t need to manually define routes.
```

---

## 🔥 Key Points

* No manual routing setup
* Faster development
* Clean structure
* Built-in dynamic routing

---

## 🧠 Final Summary

```
File = Route
Folder = Path
page.js = Entry
```

---

🔥 Hasan Tip:

👉 Always follow proper folder structure
👉 Naming mistake = route break

---
