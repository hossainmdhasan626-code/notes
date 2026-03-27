# ⚡ Next.js File System (App Router Complete Master Note)

---

# 🎯 Goal

👉 Understand:

* Next.js special file system (App Router)
* কোন file কি কাজ করে
* Convention (rules)
* Basic → Advanced usage
* React vs Next.js difference

---

# 🧠 Big Concept

```text
Next.js = File-based routing + special files system
```

👉 মানে:

```text
Folder & file নাম দিয়েই behavior control করা যায়
```

---

# 🔥 1. Core Routing Files

---

## 📄 page.js

---

## 🧠 কী?

👉 এটা একটি **route entry point**

---

## ⚙️ Example

```javascript
export default function Page() {
  return <h1>Hello</h1>;
}
```

---

## 🎯 কাজ

* UI render করে
* URL তৈরি করে

---

## 📌 Convention

```text
✔️ must default export component
✔️ server component by default
✔️ async হতে পারে
```

---

---

## 📄 layout.js

---

## 🧠 কী?

👉 Shared UI wrapper

---

## ⚙️ Example

```javascript
export default function Layout({ children }) {
  return <div>{children}</div>;
}
```

---

## 🎯 কাজ

* Navbar / Footer
* Persistent UI

---

## 📌 Important

```text
✔️ state রাখা যায় না ❌
✔️ re-render কম হয়
✔️ nested support করে
```

---

---

## 📄 template.js

---

## 🧠 কী?

👉 layout এর মতো কিন্তু re-render হয়

---

## 🎯 Difference

| Feature   | layout | template |
| --------- | ------ | -------- |
| Persist   | ✔️     | ❌        |
| Re-render | ❌      | ✔️       |

---

---

# 🔥 2. Loading & Error Handling

---

## 📄 loading.js

---

## 🧠 কী?

👉 Page load হওয়ার আগে UI দেখায়

---

## 🎯 Example

```javascript
export default function Loading() {
  return <p>Loading...</p>;
}
```

---

---

## 📄 error.js

---

## 🧠 কী?

👉 Runtime error handle করে

---

## ⚙️ Example

```javascript
"use client";

export default function Error({ error, reset }) {
  return <button onClick={reset}>Retry</button>;
}
```

---

## 📌 Convention

```text
✔️ must be client component
✔️ reset function থাকে
```

---

---

## 📄 not-found.js

---

## 🧠 কী?

👉 404 page

---

## ⚙️ Use

```javascript
import { notFound } from "next/navigation";

notFound();
```

---

---

# 🔥 3. Metadata System

---

## 📄 generateMetadata

---

## 🧠 কী?

👉 Dynamic SEO control

---

## ⚙️ Example

```javascript
export async function generateMetadata() {
  return { title: "Product" };
}
```

---

---

# 🔥 4. API System (Route Handlers)

---

## 📄 route.js

---

## 🧠 কী?

👉 Backend API inside Next.js

---

## ⚙️ Example

```javascript
export async function GET() {
  return Response.json({ msg: "Hello" });
}
```

---

## 🎯 Methods

```text
GET
POST
PUT
DELETE
PATCH
```

---

## 📌 Convention

```text
✔️ file name must = route.js
✔️ inside app/api বা route folder
✔️ each method = separate function
```

---

## 🔥 Advantage

```text
✔️ No separate backend needed
✔️ full-stack possible
```

---

---

# 🔥 5. Dynamic Routing

---

## 📁 [id]

---

## 🧠 কী?

👉 dynamic URL

---

## ⚙️ Example

```text
/app/product/[id]/page.js
```

---

## Access

```javascript
export default function Page({ params }) {
  console.log(params.id);
}
```

---

---

## 📁 [...slug] (Catch-all)

```text
/blog/a/b/c → ['a','b','c']
```

---

## 📁 [[...slug]] (Optional)

```text
/blog → works
/blog/a → works
```

---

---

# 🔥 6. Special Utility Files

---

## 📄 middleware.js

---

## 🧠 কী?

👉 request intercept করে

---

## 🎯 Use

* Auth check
* Redirect
* Logging

---

---

## 📄 instrumentation.js

---

## 🧠 কী?

👉 monitoring / logging setup

---

---

## 📄 global-error.js

---

## 🧠 কী?

👉 app level error

---

---

# 🔥 7. Styling & Assets

---

## 📄 globals.css

👉 global styles

---

## 📄 favicon.ico

👉 browser icon

---

---

# 🔥 8. Advanced Files

---

## 📄 loading UI streaming support

👉 suspense-based rendering

---

## 📄 server actions

```javascript
"use server";
```

---

## 📄 client component

```javascript
"use client";
```

---

---

# 🔥 9. Important Rules (Convention)

---

## 📌 Naming Rules

```text
✔️ page.js → route
✔️ layout.js → wrapper
✔️ route.js → API
✔️ loading.js → loading UI
✔️ error.js → error UI
✔️ not-found.js → 404
```

---

## 📌 Placement Rules

```text
✔️ same folder = same route scope
✔️ nested = nested behavior
```

---

---

# ⚔️ React vs Next.js

---

| Feature         | React | Next.js |
| --------------- | ----- | ------- |
| Routing         | ❌     | ✔️      |
| API system      | ❌     | ✔️      |
| File convention | ❌     | ✔️      |
| Middleware      | ❌     | ✔️      |

---

---

# 🎯 Full Example Structure

```text
app/
 ├── layout.js
 ├── page.js
 ├── loading.js
 ├── error.js
 ├── not-found.js
 ├── product/
 │    ├── [id]/
 │    │    ├── page.js
 │    │    └── loading.js
 │
 ├── api/
 │    └── route.js
 │
 └── middleware.js
```

---

---

# 🎯 Final Understanding

```text
page.js = UI
layout.js = wrapper
route.js = backend
loading/error = UX control
```

---

# 🧠 Golden Rule

```text
Next.js control hoy file diye 🔥
```

---

# 🔥 Hasan Tip

```text
File system bujhle Next.js 70% done 😎
```

---
