# 📂 Next.js App Router & File-Based Routing

> 🎯 **Goal of this note:** Understand why manual routing in React is a pain in the ass and how Next.js makes it as simple as creating a folder.

---

## 📌 Table of Contents
1. [The "React" Way vs the "Next.js" Way](#-react-vs-nextjs-the-battle)
2. [How Folder-Based Routing Works](#-how-the-folder-structure-works)
3. [The "page.js" Rule](#-the-pagejs-rule)
4. [Nested Routes (Folders inside Folders)](#-nested-routes-folders-inside-folders)
5. [The Layout Magic](#-the-layout-magic)
6. [Common Mistakes](#-common-mistakes-dont-be-a-noob)
7. [Interview Questions](#-common-interview-questions)

---

## 🧠 The Concept: No More Route Configs!

In a standard React app, you use `react-router-dom`. You have to write code, import components, and define paths manually in an `App.js` file. It's messy and hard to manage when the app grows.

In **Next.js App Router**, the **Folder Structure IS the Routing**. 
- You create a folder? You created a route. 
- You delete a folder? You deleted a route. 
- **Zero extra code required.** 🚀

---

## 🏗️ How the Folder Structure Works

Next.js scans your `app` directory and automatically maps folders to URLs.

| Folder Path | Resulting URL |
| :--- | :--- |
| `app/page.js` | `domain.com/` (Home) |
| `app/about/page.js` | `domain.com/about` |
| `app/contact/page.js` | `domain.com/contact` |
| `app/dashboard/settings/page.js` | `domain.com/dashboard/settings` |



---

## 🚦 The "page.js" Rule

This is the most important rule. A folder only becomes a "Route" if it contains a file named **`page.js`**. 

- If you create a folder named `services` but don't put a `page.js` inside it, people cannot visit `domain.com/services`. They will see a **404 error**.
- This is great because it allows you to keep other files (like components, CSS, or tests) inside the same folder without making them public routes.

---

## 🌳 Nested Routes (Folders inside Folders)

To create a nested route like `/products/iphone`, you don't need to write complex nested `<Route>` tags. Just nest your folders:

1. Create a folder: `products`
2. Inside `products`, create another folder: `iphone`
3. Inside `iphone`, create: `page.js`

**Result:** Your app now has a path at `domain.com/products/iphone`. It’s that simple. 🤯

---

## 🏗️ The Layout Magic (`layout.js`)

In the App Router, every folder can also have a **`layout.js`**. 
- A layout is UI that is **shared** between multiple pages.
- When you navigate between sibling pages, the layout **does not re-render**. 
- This is perfect for Navbars, Sidebars, or Footers.

```javascript
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <section>
      <nav>Dashboard Sidebar</nav> 
      {children} // This is where the page.js content will appear
    </section>
  );
}

---

## ⚠️ Common Mistakes (Don't be a Noob)

* **Naming the file `index.js`:** In the App Router, it MUST be `page.js`. Next.js ignores `index.js`.
* **Capital Letters in Folders:** Always use lowercase for folder names (e.g., `about` instead of `About`). It's better for SEO and prevents weird bugs.
* **Using `<a>` tags:** Never use the standard HTML `<a>` tag for internal links. It causes a full page reload. Always use the Next.js `<Link>` component for "Instant" navigation.

---

## ❓ Common Interview Questions

> ❓ **What is File-Based Routing in Next.js?**
>
> It's a system where the file system defines the routes of the application. Instead of defining routes in code, you use folders and files (`page.js`) to create URL paths.

---

> ❓ **What is the purpose of `layout.js`?**
>
> It is used to create a shared UI for a segment and its children. It stays persistent and doesn't re-render when navigating between pages inside that segment, which saves performance.