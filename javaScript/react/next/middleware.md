# ⚡ Next.js Middleware (Complete Master Note)

---

# 🎯 Goal

👉 Understand:

* Middleware কী?
* কেন ব্যবহার করা হয়
* কোথায় run করে
* কী কী control করা যায়
* বাস্তব use case
* Rules & limitations

---

# 🧠 1. Middleware কী?

👉 Middleware হলো:

```text
Request আসার আগে execute হওয়া code
```

---

## 🧩 সহজভাবে

```text
User → Middleware → Route/Page
```

👉 Middleware মাঝখানে বসে request control করে

---

# 🎯 2. কেন Middleware ব্যবহার করা হয়?

```text
✔️ Authentication check
✔️ Route protection
✔️ Redirect / rewrite
✔️ Request modify
✔️ Headers control
```

---

# ⚙️ 3. কোথায় Middleware run করে?

👉 Middleware run হয়:

```text
Edge Runtime (NOT Node.js)
```

---

## 🧠 এর মানে

```text
✔️ Faster execution (CDN level)
✔️ User এর কাছাকাছি run হয়
```

---

# 📁 4. File Structure

👉 Middleware file:

```bash
middleware.js
```

---

## 📍 Location

```bash
project-root/middleware.js
```

👉 root-এ থাকতে হবে

---

# 🧠 5. Basic Example

```javascript
import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.next();
}
```

---

## 🧩 Flow

```text
Request → middleware → continue
```

---

# ⚡ 6. Core Functions

---

## 🟢 1. NextResponse.next()

👉 request allow করে

```javascript
return NextResponse.next();
```

---

## 🔵 2. Redirect

```javascript
return NextResponse.redirect(new URL("/login", request.url));
```

---

## 🟣 3. Rewrite

```javascript
return NextResponse.rewrite(new URL("/dashboard", request.url));
```

---

## ⚔️ Redirect vs Rewrite

| Type     | Behavior         |
| -------- | ---------------- |
| Redirect | URL change হয়    |
| Rewrite  | URL change হয় না |

---

# 🧠 7. Matcher (Route Control)

👉 কোন route-এ middleware চলবে তা define করে

---

## Example

```javascript
export const config = {
  matcher: ["/dashboard/:path*"],
};
```

---

## 🧠 Meaning

```text
Only dashboard routes-এ middleware run হবে
```

---

# 🔐 8. Authentication Example

```javascript
export function middleware(request) {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
```

---

# 🧩 9. Cookies & Headers

---

## 🍪 Cookies

```javascript
const token = request.cookies.get("token");
```

---

## 📦 Headers

```javascript
const userAgent = request.headers.get("user-agent");
```

---

# ⚡ 10. Modify Response

```javascript
const response = NextResponse.next();
response.headers.set("x-custom", "hello");

return response;
```

---

# 🚀 11. Advanced Use Cases

---

## 🟢 1. Role-based routing

```text
Admin → /admin
User → /dashboard
```

---

## 🔵 2. Geo-based content

```text
Country অনুযায়ী page change
```

---

## 🟣 3. A/B Testing

```text
Different UI serve
```

---

## ⚡ 4. Rate limiting

```text
API abuse control
```

---

# ⚠️ 12. Limitations (VERY IMPORTANT)

---

## ❌ 1. Node APIs use করা যাবে না

```text
❌ fs
❌ database direct access
```

---

## ❌ 2. Heavy computation না

```text
❌ CPU heavy task
```

---

## ❌ 3. No React Hooks

```text
❌ useState
❌ useEffect
```

---

## ❌ 4. No full backend logic

👉 Middleware backend না ❌

---

# 🧠 13. Execution Order

```text
Request
↓
Middleware
↓
Route Handler / Page
↓
Response
```

---

# ⚡ 14. Middleware vs API Route

| Feature  | Middleware     | API Route       |
| -------- | -------------- | --------------- |
| Purpose  | Intercept      | Handle logic    |
| Run time | Before request | After request   |
| Use case | Auth, redirect | Data processing |

---

# 📜 15. Best Practices

```text
✔️ Lightweight রাখো
✔️ শুধু routing logic রাখো
✔️ heavy logic avoid করো
✔️ matcher use করো
```

---

# ❌ 16. Common Mistakes

```text
❌ সব route-এ middleware চালানো
❌ heavy logic লেখা
❌ DB call করা
```

---

# 🎯 17. Real World Flow

```text
User → Middleware
↓
Auth check
↓
Redirect / Allow
↓
Page render
```

---

# 💬 Interview Ready Answer

👉 Question: **What is Middleware in Next.js?**

```text
Middleware in Next.js is code that runs before a request is completed. 
It is used for tasks like authentication, redirection, and modifying requests at the edge for better performance.
```

---

# 🧠 Final Summary

```text
✔️ Middleware = request interceptor
✔️ Edge runtime-এ run করে
✔️ Auth + redirect এর জন্য best
✔️ Lightweight রাখতে হবে
```

---

# 🔥 Hasan Tip

```text
Middleware = Gatekeeper 🚪
```

👉 কে ঢুকবে, কে ঢুকবে না — এটা control করে

---
