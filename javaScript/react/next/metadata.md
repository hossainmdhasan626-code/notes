# ⚡ Next.js Metadata (Complete Master Note)

---

# 🎯 Goal

👉 Understand:

* Metadata কী?
* কেন দরকার?
* Next.js-এ কীভাবে ব্যবহার হয়
* Static vs Dynamic metadata
* SEO + Social sharing
* Rules & advanced usage

---

# 🧠 1. Metadata কী?

👉 Metadata = data about data

---

## 🧩 সহজভাবে:

```text id="meta1"
Web page সম্পর্কে browser & search engine কে তথ্য দেয়
```

---

## 🎯 Example

* Page title
* Description
* Keywords
* Open Graph (Facebook share)
* Twitter card

---

# 🌍 2. কেন Metadata দরকার?

```text id="meta2"
✔️ SEO improve করে
✔️ Google ranking বাড়ায়
✔️ Social media preview সুন্দর করে
✔️ Browser tab control করে
```

---

# ⚡ 3. Next.js-এ Metadata কোথায় লেখা হয়?

👉 File:

```bash id="meta3"
app/layout.js
app/page.js
```

---

## 🧠 Basic Example

```javascript id="meta4"
export const metadata = {
  title: "Home Page",
  description: "This is my website",
};
```

---

# 🟢 4. Static Metadata

👉 Hardcoded metadata

---

## Example

```javascript id="meta5"
export const metadata = {
  title: "About Page",
  description: "About us page",
};
```

---

## 🧠 Use case

* Static pages
* Blog
* Landing page

---

# 🔵 5. Dynamic Metadata

👉 Data based metadata

---

## Example

```javascript id="meta6"
export async function generateMetadata({ params }) {
  const product = await fetch(`https://api.com/${params.id}`).then(res => res.json());

  return {
    title: product.name,
    description: product.description,
  };
}
```

---

## 🎯 Use case

* Product page
* User profile
* Dynamic content

---

# ⚔️ 6. Layout vs Page Metadata

---

## 🟢 Layout Metadata

```text id="meta7"
✔️ Global metadata
✔️ সব page-এ apply হয়
```

---

## 🔵 Page Metadata

```text id="meta8"
✔️ Specific metadata
✔️ override করতে পারে
```

---

## 🧠 Priority

```text id="meta9"
Page metadata > Layout metadata
```

---

# 📦 7. Metadata Fields (Important List)

---

## 🧠 Basic Fields

```javascript id="meta10"
export const metadata = {
  title: "Title",
  description: "Description",
  keywords: ["nextjs", "react"],
};
```

---

## 🌐 Open Graph (Facebook)

```javascript id="meta11"
openGraph: {
  title: "Title",
  description: "Desc",
  url: "https://site.com",
  images: ["/image.jpg"],
}
```

---

## 🐦 Twitter

```javascript id="meta12"
twitter: {
  card: "summary_large_image",
  title: "Title",
}
```

---

## 🎯 Icons

```javascript id="meta13"
icons: {
  icon: "/favicon.ico",
}
```

---

# ⚡ 8. Full Example (Real World)

```javascript id="meta14"
export const metadata = {
  title: "Hasan Portfolio",
  description: "Frontend Developer Portfolio",
  openGraph: {
    title: "Hasan Portfolio",
    description: "React Developer",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
  },
};
```

---

# 🚀 9. Advanced Concepts

---

## 🧩 1. Template Title

```javascript id="meta15"
title: {
  default: "My Site",
  template: "%s | Hasan",
}
```

👉 Result:

```text id="meta16"
About | Hasan
```

---

## 🧩 2. Metadata Merging

👉 Layout + Page combine হয়

---

## 🧠 Rule:

```text id="meta17"
Child metadata → Parent কে override করতে পারে
```

---

## 🧩 3. Dynamic Params

👉 URL থেকে metadata change হয়

---

# ⚠️ 10. Rules (VERY IMPORTANT)

---

## 📜 Must Follow

```text id="meta18"
✔️ metadata object export করতে হবে
✔️ generateMetadata async হতে পারে
✔️ server-side execute হয়
```

---

## ❌ What You Cannot Do

```text id="meta19"
❌ useState ব্যবহার করা যাবে না
❌ useEffect ব্যবহার করা যাবে না
❌ browser API ব্যবহার করা যাবে না
```

👉 কারণ:

```text id="meta20"
Metadata server-side run হয়
```

---

# ⚡ 11. Rendering Flow

```text id="meta21"
Server → metadata generate
↓
HTML head তৈরি হয়
↓
Browser receive করে
↓
SEO & preview কাজ করে
```

---

# 🧠 12. SEO Impact

👉 Metadata directly affect করে:

* Google search result
* Facebook share preview
* Twitter card

---

# 💬 Interview Ready Answer

👉 Question: **What is Metadata in Next.js?**

```text id="meta22"
Metadata in Next.js is used to define information about a webpage such as title, description, and social preview. 
It is handled on the server and helps improve SEO and user experience.
```

---

# 🧠 Final Summary

```text id="meta23"
✔️ Metadata = page info
✔️ Static & Dynamic দুইটাই possible
✔️ Layout + Page merge হয়
✔️ SEO এর জন্য critical
```

---

# 🔥 Hasan Tip

```text id="meta24"
Always set metadata for every page
No metadata = SEO loss
```

---
