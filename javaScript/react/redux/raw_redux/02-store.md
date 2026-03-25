# 🏪 02 — The Redux Store

> 🎯 **Goal of this note:** Understand everything about the Redux Store — what it is, how it works, how to create it, how to connect it to React, what lives inside it, how to read from it, how to debug it, and everything in between. Zero gaps.

---

## 📌 Table of Contents

1. [Quick Analogy](#-quick-analogy)
2. [What is the Store?](#-what-is-the-store)
3. [The Golden Rule — One Store Only](#-the-golden-rule--one-store-only)
4. [What Lives Inside the Store?](#-what-lives-inside-the-store)
5. [Setting Up the Store — Step by Step](#-setting-up-the-store--step-by-step)
6. [What does configureStore do behind the scenes?](#-what-does-configurestore-do-behind-the-scenes)
7. [Connecting the Store to React — Provider](#-connecting-the-store-to-react--provider)
8. [Reading from the Store — useSelector](#-reading-from-the-store--useselector)
9. [Updating the Store — useDispatch](#-updating-the-store--usedispatch)
10. [The Store is Read Only](#-the-store-is-read-only)
11. [Store with Multiple Slices](#-store-with-multiple-slices)
12. [What the Store Looks Like in Real Life](#-what-the-store-looks-like-in-real-life)
13. [Folder Structure Best Practice](#-folder-structure-best-practice)
14. [Redux DevTools — See Your Store Live](#-redux-devtools--see-your-store-live)
15. [The Full Flow — Everything Connected](#-the-full-flow--everything-connected)
16. [Common Mistakes Beginners Make](#-common-mistakes-beginners-make)
17. [Common Interview Questions](#-common-interview-questions-on-this-topic)
18. [Key Takeaways](#-key-takeaways)
19. [What's Next?](#-whats-next)

---

## 🧠 Quick Analogy

Think of the Store like a **bank** 🏦

- Your app's data is the **money**
- Components are **people**
- People don't keep all their money at home (local state) for everything
- They store it in the **bank (Store)** and withdraw exactly what they need, when they need it
- The bank keeps a **record of every transaction** (Redux DevTools)
- You cannot just walk in and grab money randomly — you follow a **process** (dispatch → reducer → store)

---

## 🏪 What is the Store?

The **Store** is the single central database of your entire Redux application.

It is the place where **all your global state lives**. Every piece of data that needs to be shared across multiple components is stored here.

```
Without Store:
  Component A has data → passes to B → B passes to C → C passes to D 😩

With Store:
  Store has data → A reads it ✅ → B reads it ✅ → D reads it ✅
  No passing. No drilling. Clean. 🎉
```

In technical terms — the Store is a **JavaScript object** that holds your entire app's state tree. Redux manages this object in a very controlled and predictable way so nothing can go wrong unexpectedly.

---

## 👑 The Golden Rule — One Store Only

> 🚨 **There is only ONE store in a Redux application. Always. No exceptions.**

This is not a suggestion — this is a core principle of Redux.

Having one store means:
- ✅ You always know **exactly where** your data is
- ✅ Debugging is easy — one place to look
- ✅ State is always **consistent** across the app
- ✅ No conflicts between multiple stores

```js
// ✅ ONE store — correct
const store = configureStore({ reducer: rootReducer });

// ❌ TWO stores — NEVER do this in Redux
const store1 = configureStore({ reducer: cartReducer });
const store2 = configureStore({ reducer: userReducer });
```

---

## 📦 What Lives Inside the Store?

The Store holds your app's **state tree** — which is just a plain JavaScript object.

Here is what a real e-commerce app's store might look like inside:

```js
{
  // 🛒 Cart slice
  cart: {
    items: [
      { id: 1, name: "iPhone 15", price: 120000, quantity: 1 },
      { id: 2, name: "AirPods", price: 25000, quantity: 2 },
    ],
    totalItems: 3,
    totalPrice: 170000,
  },

  // 👤 User slice
  user: {
    id: "u_101",
    name: "Hasan",
    email: "hasan@gmail.com",
    isLoggedIn: true,
    role: "customer",
  },

  // 🌙 Theme slice
  theme: {
    mode: "dark",
    language: "en",
  },

  // 🔔 Notification slice
  notifications: {
    messages: [],
    unreadCount: 0,
  }
}
```

Every top level key (`cart`, `user`, `theme`, `notifications`) is a **Slice** — a section of the store. Each slice manages its own part of the state.

> 🧠 Think of the Store as a **big drawer cabinet** 🗄️ — each drawer is a Slice, and inside each drawer is the data for that feature.

---

## 🏗️ Setting Up the Store — Step by Step

### Step 1 — Install the required packages

```bash
npm install @reduxjs/toolkit react-redux
```

| Package | Purpose |
|---|---|
| `@reduxjs/toolkit` | The core Redux library — gives you `configureStore`, `createSlice`, etc. |
| `react-redux` | Connects Redux to React — gives you `Provider`, `useSelector`, `useDispatch` |

---

### Step 2 — Create the store file

Create a dedicated folder for Redux and add a `store.js` file:

```
src/
└── redux/
    └── store.js   ← create this
```

```js
// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    // 🍕 slices will be added here later
    // cart: cartReducer,
    // user: userReducer,
  },
});

export default store;
```

Right now the store is empty — that is fine. Slices (data sections) will be added as you build features.

---

### Step 3 — Export the store types (optional but professional ✅)

If you want to be professional and follow best practices, you can also export the store's types. This helps with autocompletion in your editor:

```js
// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

// These are useful for TypeScript — good habit even in JS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

---

## ⚙️ What does configureStore do behind the scenes?

`configureStore` is not just a simple object — it does a LOT of heavy lifting for you automatically:

| What it does | Description |
|---|---|
| 🔗 **Combines reducers** | Merges all your slice reducers into one root reducer automatically |
| 🛠️ **Sets up Redux DevTools** | Automatically enables Redux DevTools Extension in development mode |
| ⚡ **Adds Thunk middleware** | Redux Thunk (for async operations) is added by default — no extra setup needed |
| 🐛 **Better error messages** | Gives you helpful warnings in development if you do something wrong |
| 🔒 **Enables Immer** | Lets you write "mutating" code in reducers that is actually immutable under the hood |

All of this happens with **just one function call**. This is why RTK is so much better than plain Redux.

```js
// This one line sets up everything above ⬆️
const store = configureStore({ reducer: {} });
```

---

## 🔌 Connecting the Store to React — Provider

Creating the store is not enough. You need to **connect it to your React app** so that every component can access it.

This is done using the `Provider` component from `react-redux`.

```jsx
// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";    // 👈 Step 1: import Provider
import store from "./redux/store";          // 👈 Step 2: import your store

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>                 {/* 👈 Step 3: wrap App */}
    <App />
  </Provider>
);
```

### 🧠 How does Provider work?

`Provider` uses React's **Context API** under the hood to make the store available to every component in your app.

```
<Provider store={store}>       ← Store is injected here
  <App>
    <Navbar />                 ← Can access store ✅
    <ProductPage>
      <ProductCard />          ← Can access store ✅
    </ProductPage>
    <CartPage>
      <CartItem />             ← Can access store ✅
    </CartPage>
  </App>
</Provider>
```

> 🚨 **Important:** `Provider` must wrap your **entire app** at the top level — otherwise components won't be able to access the store.

### ❌ What happens if you forget Provider?

```
Invariant Violation: Could not find "store" in the context of "Connect(MyComponent)".
```

You will get this error. Always wrap your app with `Provider`. 😅

---

## 📡 Reading from the Store — useSelector

To **read data** from the store inside a component, you use the `useSelector` hook.

```jsx
import { useSelector } from "react-redux";

function CartIcon() {
  // 👇 Read cart items from the store
  const cartItems = useSelector((state) => state.cart.items);

  return <span>🛒 {cartItems.length}</span>;
}
```

### 🧠 How useSelector works:

- It takes a **selector function** as an argument
- The selector function receives the **entire store state** as a parameter
- You return **only the part you need** from the state
- When that specific part changes → the component **automatically re-renders**
- When other parts change (that you didn't select) → the component does **NOT re-render** ✅ (this is great for performance)

```js
// state is the entire store:
// {
//   cart: { items: [...], totalPrice: 0 },
//   user: { name: "Hasan", isLoggedIn: true },
//   theme: { mode: "dark" }
// }

const cartItems = useSelector((state) => state.cart.items);
//                                        👆 only reading cart.items
//                                        changes in user or theme
//                                        will NOT re-render this component
```

---

## 📤 Updating the Store — useDispatch

To **update data** in the store from a component, you use the `useDispatch` hook.

```jsx
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();   // 👈 get the dispatch function

  function handleAddToCart() {
    dispatch(addToCart(product));   // 👈 send an action to the store
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <button onClick={handleAddToCart}>Add to Cart 🛒</button>
    </div>
  );
}
```

### 🧠 How useDispatch works:

- `useDispatch()` gives you the `dispatch` function
- You call `dispatch` with an **action** (a message telling Redux what to do)
- Redux takes that action to the **Reducer**
- Reducer updates the **Store**
- Components using `useSelector` automatically **re-render** with new data

---

## 🔒 The Store is Read Only

This is a **core principle** of Redux and it is extremely important.

You can **never** directly modify the store's state. The only way to change state is by dispatching an action.

```js
// ❌ NEVER do this — directly mutating the store
store.getState().cart.items.push(newItem);
store.getState().user.name = "New Name";

// ✅ ALWAYS do this — dispatch an action
dispatch(addToCart(newItem));
dispatch(updateUserName("New Name"));
```

### 🤔 Why is the store read only?

Because this rule makes your app **predictable**:
- Every state change goes through the same path: action → reducer → store
- You can always **trace back** exactly what happened and why
- No random, unexpected state mutations from anywhere in the app
- Makes debugging with Redux DevTools possible 🔥

---

## 🍕 Store with Multiple Slices

In a real app, your store will have multiple slices — one for each feature:

```js
// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,                  // 🛒 manages cart state
    user: userReducer,                  // 👤 manages user state
    theme: themeReducer,                // 🌙 manages theme state
    notifications: notificationReducer, // 🔔 manages notifications
  },
});

export default store;
```

Each key in the `reducer` object (`cart`, `user`, `theme`, `notifications`) becomes a **top level key** in your store's state object.

So your store's state will look like:

```js
{
  cart: { ... },          // managed by cartReducer
  user: { ... },          // managed by userReducer
  theme: { ... },         // managed by themeReducer
  notifications: { ... }  // managed by notificationReducer
}
```

---

## 🌍 What the Store Looks Like in Real Life

Here is a complete real life example of a store being used across multiple components:

```jsx
// 🛒 Navbar.jsx — reads cart count from store
function Navbar() {
  const cartCount = useSelector((state) => state.cart.items.length);
  const userName = useSelector((state) => state.user.name);

  return (
    <nav>
      <span>Hello, {userName}! 👋</span>
      <span>🛒 {cartCount} items</span>
    </nav>
  );
}

// 📦 ProductCard.jsx — dispatches to store
function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
}

// 🛒 CartPage.jsx — reads cart data from store
function CartPage() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove ❌
          </button>
        </div>
      ))}
      <h3>Total: ৳{totalPrice}</h3>
    </div>
  );
}
```

All three components — `Navbar`, `ProductCard`, and `CartPage` — are connected to the **same store**. When `ProductCard` adds an item, `Navbar` and `CartPage` **automatically update**. No props needed. 🎉

---

## 📁 Folder Structure Best Practice

Here is the recommended folder structure for a Redux project:

```
src/
├── redux/
│   ├── store.js              ← the main store
│   ├── cartSlice.js          ← cart feature
│   ├── userSlice.js          ← user feature
│   ├── themeSlice.js         ← theme feature
│   └── notificationSlice.js  ← notifications feature
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── CartPage.jsx
├── App.jsx
└── main.jsx
```

Some teams prefer a **feature-based** structure for larger apps:

```
src/
├── features/
│   ├── cart/
│   │   ├── cartSlice.js
│   │   └── CartPage.jsx
│   ├── user/
│   │   ├── userSlice.js
│   │   └── ProfilePage.jsx
│   └── theme/
│       └── themeSlice.js
├── redux/
│   └── store.js
├── App.jsx
└── main.jsx
```

> 🧠 For small to medium apps — use the first structure. For large apps with big teams — use the feature-based structure.

---

## 🔍 Redux DevTools — See Your Store Live

Redux DevTools is a **browser extension** that lets you inspect your store in real time. It is one of the most powerful debugging tools in frontend development.

### How to install:
Search **"Redux DevTools"** in the Chrome Web Store or Firefox Add-ons and install it.

### What you can see with Redux DevTools:

```
📊 State Tab      → See the entire store's current state as a JSON tree
⚡ Action Tab     → See every action that was dispatched
🔄 Diff Tab       → See exactly what changed in the state after each action
⏮️ Time Travel    → Go back in time and replay actions — yes really! 🤯
```

### How it looks:

```
Actions dispatched:          Current State:
─────────────────────        ─────────────────────────
@@INIT                       {
cart/addToCart      ✅         cart: {
cart/addToCart      ✅           items: [{...}, {...}],
user/setUser        ✅           totalPrice: 145000
cart/removeFromCart ✅         },
                               user: {
                                 name: "Hasan",
                                 isLoggedIn: true
                               }
                             }
```

> 🔥 **Time Travel Debugging** — you can click on any past action and the UI goes back to exactly how it looked at that point. This is only possible because Redux is predictable and every state change is recorded.

### configureStore enables DevTools automatically:

```js
// DevTools works automatically in development ✅
// In production it is automatically disabled for security ✅
const store = configureStore({ reducer: {} });
```

---

## 🔄 The Full Flow — Everything Connected

Here is the complete picture of how the Store connects to everything in Redux:

```
👆 User clicks "Add to Cart" button
          │
          ▼
📤 dispatch(addToCart(product))
          │
          ▼
⚡ Action created:
   { type: "cart/addToCart", payload: { id: 1, name: "Phone" } }
          │
          ▼
🔧 Reducer receives action
   reads current state + action
   calculates new state
          │
          ▼
🏪 Store saves new state
   cart.items now has the new product
          │
          ▼
📡 useSelector detects change
   (only components that selected cart.items)
          │
          ▼
🖥️ Components re-render
   Navbar shows updated cart count
   CartPage shows new item
   All automatically ✨
```

This is the **Redux cycle** — it always follows this exact same path. Always predictable. Always traceable.

---

## ⚠️ Common Mistakes Beginners Make

### ❌ Mistake 1 — Forgetting to wrap with Provider

```jsx
// ❌ Wrong — store not connected
ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// ✅ Correct
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}><App /></Provider>
);
```

### ❌ Mistake 2 — Trying to mutate store directly

```js
// ❌ Wrong — never mutate directly
store.getState().cart.items.push(item);

// ✅ Correct — always dispatch
dispatch(addToCart(item));
```

### ❌ Mistake 3 — Selecting too much from the store

```js
// ❌ Wrong — selecting the entire state causes re-render on ANY change
const state = useSelector((state) => state);

// ✅ Correct — select only what you need
const cartItems = useSelector((state) => state.cart.items);
```

### ❌ Mistake 4 — Creating multiple stores

```js
// ❌ Wrong — never create multiple stores
const cartStore = configureStore({ reducer: cartReducer });
const userStore = configureStore({ reducer: userReducer });

// ✅ Correct — one store with multiple slices
const store = configureStore({
  reducer: { cart: cartReducer, user: userReducer }
});
```

### ❌ Mistake 5 — Not exporting the store

```js
// ❌ Wrong — store not exported, Provider can't use it
const store = configureStore({ reducer: {} });

// ✅ Correct — always export default
export default store;
```

---

## ❓ Common Interview Questions on This Topic

> ❓ **What is the Redux Store?**
>
> The Store is the single central database of a Redux application. It holds the entire global state of the app as a JavaScript object. Any component can read from it using `useSelector` and update it by dispatching actions using `useDispatch`.

---

> ❓ **Can you have multiple stores in Redux?**
>
> No. Redux follows the principle of Single Source of Truth — there is always only ONE store in a Redux application. Multiple features are organized using Slices, not multiple stores.

---

> ❓ **What is the Provider component and why do we need it?**
>
> Provider is a component from `react-redux` that connects the Redux store to the React component tree. It uses React's Context API under the hood to make the store available to every component inside it. Without Provider, components cannot access the store.

---

> ❓ **What does configureStore do?**
>
> `configureStore` from Redux Toolkit creates the Redux store. It automatically combines all your reducers, sets up Redux DevTools, adds Thunk middleware for async operations, and enables Immer for writing simpler reducer logic.

---

> ❓ **Why is the store read only?**
>
> Because read-only state makes the app predictable. Every state change must go through the same path — action → reducer → store. This means you can always trace exactly what changed, when, and why. It also enables powerful debugging features like time travel in Redux DevTools.

---

## 🎯 Key Takeaways

- 🏪 **Store** is the single central database of your entire Redux app
- 👑 There is always **only ONE store** — this is a core Redux principle
- 📦 The store holds a **plain JavaScript object** — your entire state tree
- 🏗️ Create the store with `configureStore` from `@reduxjs/toolkit`
- 🔌 Connect it to React using `Provider` from `react-redux` — wrap your entire app
- 📡 Read from the store using `useSelector` — select only what you need
- 📤 Update the store using `useDispatch` — always dispatch actions, never mutate directly
- 🔒 The store is **read only** — you can never change it directly
- 🍕 A store can have **multiple slices** — one per feature
- 🔍 Use **Redux DevTools** to inspect the store live and debug with time travel
- ⚙️ `configureStore` automatically sets up DevTools, Thunk middleware, and Immer

---

## 🗺️ What's Next?

Now that you fully understand the Store — it is time to learn about **Slices** — the sections that live inside the store and actually hold your feature's data and logic:

- 👉 **[03 — Slice](./03-slice.md)** → What a slice is, how to create one with `createSlice`, and how it connects to the store
- **[04 — Reducer](./04-reducer.md)** → How state actually gets updated inside a slice
- **[05 — Action](./05-action.md)** → How to trigger state changes
- **[06 — useSelector & useDispatch](./06-useSelector-useDispatch.md)** → How components talk to the store
- **[07 — Async Redux with Thunk](./07-async-redux-thunk.md)** → How to fetch API data with Redux

---

*📝 Notes by: Hasan | 🎯 Goal: Junior React Developer Interview Prep | ⚛️ react-redux-mastery*