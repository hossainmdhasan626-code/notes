# 🟢 কেন Next.js? — Why Next.js

---

## ১. React-এর সীমাবদ্ধতা কী ছিল?

Plain React (Vite/CRA) দিয়ে বানানো app হলো **CSR (Client Side Rendering)**।

```
ব্রাউজার → Server-এ request করলো
    ↓
Server: "এই নাও একটা ফাঁকা HTML + JS bundle"
    ↓
Browser: JS download করলো, execute করলো, তারপর UI দেখালো
    ↓
সমস্যা: প্রথম load slow + Google bot প্রথমে ফাঁকা page দেখে (SEO খারাপ)
```

---

## ২. Next.js কোন সমস্যা solve করে?

```js
const nextJSSolves = {
  SEO:         "Server-এ HTML তৈরি হয় — Google ভালোভাবে index করতে পারে",
  Performance: "প্রথম page faster load (HTML already ready)",
  Routing:     "আলাদা React Router লাগে না — File-based routing",
  FullStack:   "Frontend + API দুটোই একই project-এ",
  Optimization:"Image, Font, Code splitting — automatic",
};
```

---

## ৩. Rendering Strategies — ৪ রকম

| Strategy | মানে | কখন দরকার |
|----------|------|-----------|
| **SSR** | Server Side Rendering — প্রতিটা request-এ server-এ HTML বানায় | Real-time data (dashboard, feed) |
| **SSG** | Static Site Generation — build time-এ HTML বানিয়ে রাখে | Blog, docs, marketing page |
| **ISR** | Incremental Static Regen — SSG কিন্তু নির্দিষ্ট সময় পর re-build | E-commerce product page |
| **CSR** | Client Side Rendering — browser-এ React দিয়ে বানায় (plain React) | Highly interactive dashboard |

---

## ৪. App Router vs Pages Router

Next.js-এ দুইটা routing system আছে:

```
Pages Router (পুরনো — Next.js 12 পর্যন্ত):
pages/
  index.js     → /
  about.js     → /about
  blog/[id].js → /blog/123

App Router (নতুন — Next.js 13+ থেকে, এটাই শিখবো):
app/
  page.jsx     → /
  about/
    page.jsx   → /about
  blog/
    [id]/
      page.jsx → /blog/123
```

> 🏆 **App Router** শেখো — এটাই আধুনিক এবং ভবিষ্যৎ।

---

## ৫. Next.js-এর বড় Features

```js
const nextFeatures = {
  fileBasedRouting:   "folder/file = route — React Router লাগে না",
  serverComponents:   "Component server-এ render হয় — JS bundle-এ যায় না",
  serverActions:      "Frontend থেকে directly server function call করা যায়",
  imageOptimization:  "<Image> component — automatic WebP, lazy load, resize",
  apiRoutes:          "app/api/route.js → full backend endpoint",
  middleware:         "Request আসার আগে code চালানো (auth check ইত্যাদি)",
};
```

---

## 🎯 Interview Tips

- Next.js কেন? → SEO, Performance, Built-in Routing, SSR/SSG।
- CSR vs SSR → Browser-এ render vs Server-এ render।
- SSG → Fastest। SSR → Fresh data। ISR → দুইটার মাঝামাঝি।
- App Router → Next.js 13+ এর নতুন system, Server Component support করে।
- Pages Router → পুরনো, তবে অনেক পুরনো project-এ আছে।
