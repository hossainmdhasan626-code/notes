# ⚡ Next.js Layout System (Complete Master Note)

---

# 🎯 Goal

👉 Understand:

* Layout system (App Router)
* Root vs Local layout
* Nested layout
* Layout vs Template
* Rules & conventions
* Limitations (what you cannot do)

---

# 🧠 1. Layout System Basics

👉 Layout হলো এমন component যা:

```text id="l1a2b3"
Multiple pages-এর common UI wrap করে
```

---

## 📦 Example

👉 ধরো:

* Navbar
* Sidebar
* Footer

👉 এগুলো বারবার লিখতে হবে না ❌
👉 Layout দিয়ে একবার লিখলেই সব page-এ apply হবে ✅

---

# 🟢 2. Root Layout vs Local Layout

---

## 🌍 Root Layout

👉 File:

```bash id="r1t2y3"
app/layout.js
```

---

## 🎯 কাজ:

```text id="rlt1"
✔️ পুরো app কে wrap করে
✔️ HTML structure define করে
✔️ <html> & <body> থাকে
```

---

## 🧠 Example

```jsx id="ex1"
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

---

## 🔵 Local Layout

👉 File:

```bash id="lcl1"
app/dashboard/layout.js
```

---

## 🎯 কাজ:

```text id="lcl2"
✔️ শুধু নির্দিষ্ট route কে wrap করে
✔️ Partial UI control দেয়
```

---

## 🧠 Example

```jsx id="ex2"
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
```

---

# ⚡ 3. Nested Layout (VERY IMPORTANT)

👉 Layout একটার ভিতরে আরেকটা হতে পারে

---

## 🧠 Structure

```bash id="nest1"
app/
 ├─ layout.js        (Root)
 ├─ dashboard/
 │   ├─ layout.js    (Nested)
 │   ├─ page.js
```

---

## 🔥 Flow

```text id="nest2"
Root Layout → Dashboard Layout → Page
```

---

## 🎯 Result

👉 Final UI:

* Navbar (root)
* Sidebar (dashboard)
* Page content

---

## 🧠 Real Example

```jsx id="nest3"
// root layout
<Navbar />
{children}

// dashboard layout
<Sidebar />
{children}

// page
<h1>Dashboard Page</h1>
```

---

# ⚔️ 4. Layout vs Template

---

## 🟢 Layout

```text id="lay1"
✔️ Persistent
✔️ State ধরে রাখে
✔️ Re-render হয় না (route change এ)
```

---

## 🔵 Template

👉 File:

```bash id="tmp1"
template.js
```

---

```text id="tmp2"
✔️ Re-render হয় প্রতি navigation এ
✔️ Fresh instance তৈরি করে
✔️ State reset হয়
```

---

## 🎯 Difference

| Feature   | Layout  | Template |
| --------- | ------- | -------- |
| Persist   | ✔️ Yes  | ❌ No     |
| Re-render | ❌ No    | ✔️ Yes   |
| State     | ✔️ Keep | ❌ Reset  |

---

## 🧠 কখন কোনটা?

👉 Layout:

* Navbar
* Sidebar

👉 Template:

* Animation reset
* Page transition

---

# 📜 5. Writing Convention (VERY IMPORTANT)

---

## 📁 File Naming

```bash id="conv1"
layout.js
template.js
page.js
```

---

## 🧠 Rules

```text id="conv2"
✔️ layout default export হতে হবে
✔️ children prop নিতে হবে
✔️ JSX return করতে হবে
```

---

## 🧠 Example

```jsx id="conv3"
export default function Layout({ children }) {
  return <div>{children}</div>;
}
```

---

## ⚠️ Must Follow

* Folder-based structure
* Automatic routing
* File naming strict

---

# ❌ 6. What You CANNOT Do in Layout

---

## 🚫 1. Direct Interaction (Server Layout হলে)

👉 Layout default ভাবে:

```text id="no1"
Server Component
```

---

👉 তাই:

```text id="no2"
❌ useState ব্যবহার করা যাবে না
❌ useEffect ব্যবহার করা যাবে না
❌ onClick ব্যবহার করা যাবে না
```

---

## 🚫 2. Browser API

```text id="no3"
❌ window
❌ localStorage
```

---

## 🚫 3. Event Handling

```text id="no4"
❌ onClick
❌ onChange
```

---

## 🧠 Solution

👉 যদি দরকার হয়:

```javascript id="sol1"
"use client";
```

---

⚠️ কিন্তু:

```text id="sol2"
Client করলে performance কমে
```

---

# ⚡ 7. What You CAN Do

---

```text id="yes1"
✔️ Data fetch (server side)
✔️ API call
✔️ Static UI
✔️ Wrap children
```

---

# 🚀 8. Advanced Concepts

---

## 🧩 Layout Sharing

👉 Multiple route same layout share করতে পারে

---

## 🧠 Streaming

👉 Layout আগে load হয় → content পরে আসে

---

## ⚡ Partial Rendering

👉 পুরো page reload না হয়ে শুধু child change হয়

---

# 🎯 9. Full Rendering Flow

```text id="flow1"
Root Layout
↓
Nested Layout
↓
Page
↓
HTML generate
↓
Browser render
```

---

# 💬 Interview Ready Answer

👉 Question: **What is Layout in Next.js?**

```text id="int1"
Layout is a special component in Next.js App Router that allows you to share UI across multiple pages. 
It wraps pages and persists between route changes, improving performance and user experience.
```

---

# 🧠 Final Summary

```text id="sum1"
✔️ Root Layout = full app
✔️ Local Layout = specific route
✔️ Nested Layout = layered UI
✔️ Layout = persistent
✔️ Template = re-render
```

---

# 🔥 Hasan Tip

```text id="tip1"
Always keep layout clean & minimal
Only UI structure রাখো
Logic কম রাখো
```

---
