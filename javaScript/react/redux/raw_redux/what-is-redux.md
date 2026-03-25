# ⚛️ 01 — What is Redux & Why Use It?

> 🎯 **Goal of this note:** Understand what Redux is, why it exists, what problem it solves, when to use it, and how it fits into the React ecosystem — with zero gaps.

---

## 📌 Table of Contents

1. [A Quick Analogy Before We Start](#-a-quick-analogy-before-we-start)
2. [What is State?](#-what-is-state)
3. [The Problem — React's One Way Data Flow](#-the-problem--reacts-one-way-data-flow)
4. [What is Prop Drilling?](#-what-is-prop-drilling)
5. [Why Prop Drilling is a Problem](#-why-prop-drilling-is-a-problem)
6. [The Solution — A Global Store](#-the-solution--a-global-store)
7. [What is Redux?](#-what-is-redux)
8. [What is Redux Toolkit (RTK)?](#-what-is-redux-toolkit-rtk)
9. [Redux Toolkit vs Plain Old Redux](#%EF%B8%8F-redux-toolkit-vs-plain-old-redux)
10. [When Should You Use Redux?](#-when-should-you-use-redux)
11. [Redux vs useState vs Context API](#-redux-vs-usestate-vs-context-api)
12. [Real World Use Cases](#-real-world-use-cases)
13. [How Redux Fits Into React](#-how-redux-fits-into-react)
14. [The 3 Core Principles of Redux](#-the-3-core-principles-of-redux)
15. [Redux Core Building Blocks](#-redux-core-building-blocks-big-picture)
16. [Common Interview Questions](#-common-interview-questions-on-this-topic)
17. [Key Takeaways](#-key-takeaways)
18. [What's Next?](#-whats-next)

---

## 🧠 A Quick Analogy Before We Start

Imagine a **big restaurant** 🍽️

- Every table (component) needs to know the **menu** (shared data)
- Without Redux → every waiter carries the menu from table to table to table... exhausting 😩
- With Redux → the menu is posted on a **big board at the center** of the restaurant and every table can see it directly ✅

That **big board** is the **Redux Store**.

---

## 💾 What is State?

Before understanding Redux, you need to understand what **state** is.

State is simply **data that can change over time** and when it changes, the UI updates automatically.

```js
// This is local state — only this component knows about it
const [count, setCount] = useState(0);
```

There are two types of state in React:

| Type | Description | Example |
|---|---|---|
| 🏠 **Local State** | Belongs to one component only | Input field value, toggle open/close |
| 🌍 **Global State** | Shared across many components | Logged-in user, cart items, theme |

`useState` handles **local state** perfectly. But for **global state** — this is where things get messy without Redux.

---

## 🚦 The Problem — React's One Way Data Flow

React has a rule — data flows in **one direction only**:

```
Parent → Child → Grandchild → Great Grandchild...
```

This is called **Unidirectional Data Flow** and it makes React predictable and easy to debug. But it creates a real problem when deeply nested components need the same data.

```
              🏠 App
               |
           👨 Parent
               |
           👦 Child 1
               |
           👦 Child 2
               |
           👦 Child 3
               |
           👦 Child 4
               |
           👦 Child 5      ← 😩 doesn't need the data
               |               but has to pass it anyway
           👦 Child 6      ← 😩 same here
               |
           👦 Child 7      ← 😩 and here too
               |
           🎯 Child 8      ← ✅ THIS one actually needs the data
```

To get data from `App` to `Child 8` — you have to pass it through **every single component** in between, even the ones that don't need it at all.

---

## 🕳️ What is Prop Drilling?

**Prop Drilling** is when you pass data (props) through many layers of components just to get it to a deeply nested component that actually needs it.

```jsx
// App.jsx
function App() {
  const user = { name: "Hasan", role: "admin" };
  return <Parent user={user} />;  // passing down... 😩
}

// Parent.jsx — doesn't use user, just passes it
function Parent({ user }) {
  return <Child1 user={user} />;  // passing down... 😩
}

// Child1.jsx — doesn't use user, just passes it
function Child1({ user }) {
  return <Child2 user={user} />;  // passing down... 😩
}

// Child2.jsx — doesn't use user, just passes it
function Child2({ user }) {
  return <Child3 user={user} />;  // passing down... 😩
}

// Child3.jsx — FINALLY uses it 😤
function Child3({ user }) {
  return <h1>Welcome, {user.name}!</h1>;  // ✅ used here at last
}
```

Look at `Parent`, `Child1`, and `Child2` — they **don't use `user` at all**. They are just passing it down like a relay race baton. This is **Prop Drilling**.

---

## 😤 Why Prop Drilling is a Problem

Prop drilling is not just annoying — it causes real problems in large applications:

### ❌ Problem 1 — Messy & Hard to Read Code
Every middle component has to accept and pass props it doesn't even care about. The code becomes cluttered and confusing fast.

### ❌ Problem 2 — Hard to Maintain
If the data structure changes (e.g. `user.name` becomes `user.fullName`), you have to update **every single component** in the chain — even the ones that don't use it.

### ❌ Problem 3 — Easy to Break
Miss one prop in one component and the whole chain breaks. Debugging becomes a nightmare 😱

### ❌ Problem 4 — Unnecessary Re-renders
Every component in the chain re-renders when the data changes — even though they don't use the data. This hurts performance.

---

## 💡 The Solution — A Global Store

What if instead of storing data **inside a component** and passing it down — we stored it **outside the component tree** in a separate, central place?

Then **any component** — no matter how deeply nested — could directly access the data it needs. No more passing props through 10 components.

```
        ┌──────────────────────────────┐
        │         🏪 STORE             │
        │   { user, cart, theme... }   │
        └───────┬──────────┬───────────┘
                │          │
                │          │
         🎯 Child 2    🎯 Child 8
        (gets data     (gets data
         directly) ✅   directly) ✅

        🎉 No prop drilling. Ever.
```

This is exactly what **Redux** does.

---

## 🔴 What is Redux?

**Redux is a predictable state management library for JavaScript applications.**

In simple terms:
- Redux creates a **single central store** outside your component tree
- Your components can **read data** from the store directly
- Your components can **update data** in the store by sending actions
- When the store updates — all components that use that data **automatically re-render** ✨

```
Redux = A single source of truth for your entire app's global state
```

### 📦 Redux is NOT React-specific

Redux was originally built for any JavaScript app — not just React. But it works so beautifully with React that it became the most popular state management solution for React apps.

To use Redux with React, you need two packages:

```bash
npm install @reduxjs/toolkit react-redux
```

| Package | What it does |
|---|---|
| `@reduxjs/toolkit` | The core Redux library (modern way) |
| `react-redux` | Connects Redux to your React components |

---

## 🛠️ What is Redux Toolkit (RTK)?

Redux Toolkit (RTK) is the **official, modern, recommended way** to write Redux.

When Redux was first created, writing it required a LOT of boilerplate code — many files, many steps, very repetitive. Developers hated it 😩

So the Redux team created **Redux Toolkit** to make it:
- ✅ Simpler to write
- ✅ Way less boilerplate code
- ✅ Less chance of mistakes
- ✅ Built-in best practices out of the box
- ✅ Handles immutability automatically (using Immer under the hood)

> 🚨 **Important:** When people say "Redux" today — they almost always mean **Redux Toolkit**. Always use RTK in new projects. Plain old Redux is outdated.

---

## ⚔️ Redux Toolkit vs Plain Old Redux

Here is a real comparison so you can see exactly why RTK is better:

### 🔴 Plain Old Redux (the old painful way)

You needed at least 3-4 separate files just to manage one piece of state:

```js
// actionTypes.js
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// actionCreators.js
const addToCart = (item) => ({ type: ADD_TO_CART, payload: item });
const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, payload: id });

// reducer.js
const initialState = { items: [] };
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      // had to manually spread state for immutability 😩
      return { ...state, items: [...state.items, action.payload] };
    case REMOVE_FROM_CART:
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    default:
      return state;
  }
}

// store.js
import { createStore } from "redux";
const store = createStore(cartReducer);
```

😩 So much code just for a simple cart! And this is only ONE feature.

### ✅ Redux Toolkit (the modern clean way)

Everything in **one file**, called a **slice**:

```js
// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);  // RTK handles immutability automatically ✨
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
```

🎉 Same functionality — half the code! Same result, much cleaner.

---

## 🤔 When Should You Use Redux?

Redux is powerful — but it adds some complexity. Don't use it when you don't need it.

| Situation | Should You Use Redux? |
|---|---|
| 1-2 components share data | ❌ No — `useState` is enough |
| Small app, simple state | ❌ No — overkill |
| A few components share data | ⚠️ Maybe — try Context API first |
| Many components share the same data | ✅ Yes |
| Data needs to be accessed from anywhere in the app | ✅ Yes |
| Complex state logic (cart, auth, filters, pagination) | ✅ Yes |
| Large team working on the same codebase | ✅ Yes — Redux makes state predictable |
| You need to track every state change for debugging | ✅ Yes — Redux DevTools is 🔥 |

### 🧠 The Simple Rule:

> If you catch yourself passing props more than **2-3 levels deep** to many components — it is time to consider Redux.

---

## ⚖️ Redux vs useState vs Context API

There are multiple ways to manage state in React. Here is when to use each:

| | `useState` | `Context API` | `Redux` |
|---|---|---|---|
| **Best for** | Local component state | Simple global state | Complex global state |
| **App size** | Small | Small - Medium | Medium - Large |
| **Setup** | Zero setup | Minimal setup | Some setup required |
| **Performance** | ✅ Great | ⚠️ Can cause unnecessary re-renders | ✅ Optimized with selectors |
| **DevTools** | ❌ None | ❌ None | ✅ Powerful Redux DevTools |
| **Learning curve** | Easy | Easy | Medium |
| **Async support** | Manual | Manual | ✅ Built-in with Thunk |

### 🧠 Think of it this way:

```
Small app        →  useState
Medium app       →  Context API
Large / complex  →  Redux ✅
```

---

## 🌍 Real World Use Cases

Here are real examples of when Redux is the right tool:

### 🛒 E-Commerce Cart
Cart items are needed in the **Navbar** (item count badge), **Product Page** (add to cart button state), **Cart Page** (list of items), and **Checkout Page** (total price calculation). Redux stores the cart once — every page reads from it directly.

### 👤 User Authentication
After login, the user's name, role, and token are needed **everywhere** — Navbar, Profile page, Settings page, Dashboard, protected routes. Redux stores the user once after login and every component can access it instantly.

### 🌙 Dark Mode / Light Mode
Theme preference affects **every single component** in the app. Redux stores the theme globally and every component reads it and adjusts accordingly.

### 🔔 Notifications / Toast Messages
A notification can be triggered from **anywhere** in the app (after an API call, after a form submission, after an error) and needs to be shown in the **Notification Center** component at the top. Redux makes this easy.

### 🔍 Filters & Search State
Search filters on an e-commerce site are used in the **Filter Sidebar** (to show selected filters), **Product Grid** (to show filtered products), and the **URL** (to be shareable). Redux keeps them in perfect sync.

---

## 🔗 How Redux Fits Into React

Here is the big picture of how Redux connects to your React app:

```
┌─────────────────────────────────────────────────────────┐
│                      React App                          │
│                                                         │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐         │
│   │  Navbar   │    │   Cart   │    │ Profile  │         │
│   └─────┬────┘    └────┬─────┘    └────┬─────┘         │
│         │              │               │                │
│         └──────────────┼───────────────┘                │
│                        │                               │
│               ┌────────▼────────┐                      │
│               │  🏪 Redux Store  │                      │
│               │                 │                      │
│               │  user: {...}    │                      │
│               │  cart: {...}    │                      │
│               │  theme: "dark"  │                      │
│               └─────────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

Every component connects to the store and gets exactly what it needs — nothing more, nothing less. Clean architecture! 🏛️

---

## 📐 The 3 Core Principles of Redux

Redux is built on 3 fundamental principles. These are **very important for interviews!** 🎯

### 🥇 Principle 1 — Single Source of Truth
The entire app's global state is stored in **one single store**. There is only ONE store in a Redux app. This makes debugging easy because you always know exactly where to look for data.

```js
// There is only ONE store in the entire app
const store = configureStore({ reducer: rootReducer });
```

### 🥈 Principle 2 — State is Read Only
You **cannot directly modify** the state. The only way to change state is by dispatching an **action**. This makes state changes predictable and traceable — you can always see what happened and when.

```js
// ❌ You can NEVER do this directly
store.state.cart.items.push(newItem);

// ✅ You must always do this — dispatch an action
dispatch(addToCart(newItem));
```

### 🥉 Principle 3 — Changes are Made with Pure Functions
The functions that update state (called **Reducers**) must be **pure functions** — meaning they:
- Always return the same output for the same input
- Have no side effects (no API calls, no random values)
- Never mutate the original state directly

```js
// ✅ Pure reducer — same input always gives same output
function cartReducer(state, action) {
  if (action.type === "addToCart") {
    return { ...state, items: [...state.items, action.payload] };
  }
  return state;
}
```

---

## 🧩 Redux Core Building Blocks (Big Picture)

Redux has 6 main building blocks. Each one has its own deep dive note — but here is a quick overview so you understand how they all connect:

| 🧩 Building Block | What It Is | Deep Dive |
|---|---|---|
| 🏪 **Store** | Central database of the whole app | Note 02 |
| 🍕 **Slice** | One section of the store (e.g. cart, user) | Note 03 |
| 🔧 **Reducer** | Function that reads actions and updates state | Note 04 |
| ⚡ **Action** | A message saying what should change and with what data | Note 05 |
| 📡 **useSelector** | Hook to read data from the store in a component | Note 06 |
| 📤 **useDispatch** | Hook to send actions to the store from a component | Note 06 |

### 🔄 How They All Work Together:

```
👆 User clicks a button
        ↓
📤 dispatch(action)         ← Component sends an action to the store
        ↓
🔧 Reducer runs             ← Reads the action, calculates new state
        ↓
🏪 Store updates            ← Saves the new state
        ↓
📡 useSelector detects      ← Notices the state changed
        ↓
🖥️ Component re-renders    ← Shows the fresh data to the user
```

This cycle happens every single time state changes in Redux. It is always the same, always predictable. That is the beauty of Redux. ✨

---

## ❓ Common Interview Questions on This Topic

> ❓ **What is Redux and why do we use it?**
>
> Redux is a state management library. We use it to avoid prop drilling by storing all shared global state in a central store. Any component can read from or update the store directly without needing to pass props through intermediate components.

---

> ❓ **What is the difference between Redux and Context API?**
>
> Both solve prop drilling. Context API is simpler and better for small apps or simple global state like theme or language. Redux is more powerful, has better performance optimization through selectors, comes with DevTools for debugging, and has built-in support for async logic — making it better for large, complex apps.

---

> ❓ **What are the 3 core principles of Redux?**
>
> Single Source of Truth (one store), State is Read Only (only actions can change state), and Changes are made with Pure Functions (reducers must be pure).

---

> ❓ **What is Redux Toolkit and why should we use it?**
>
> Redux Toolkit is the official modern way to write Redux. It dramatically reduces boilerplate code, handles immutability automatically using Immer, and includes best practices out of the box. All new Redux projects should use Redux Toolkit.

---

## 🎯 Key Takeaways

- 🔴 **Redux** is a state management library that solves the **Prop Drilling** problem
- 🏪 It stores all global state in one central place called the **Store**
- 📡 Any component can **directly read** from the store using `useSelector`
- 📤 Any component can **update** the store using `dispatch`
- 🛠️ Always use **Redux Toolkit** — never plain old Redux in new projects
- 📏 Use Redux when your app is **large** and **many components share the same state**
- 📐 Redux has **3 core principles** — Single Source of Truth, State is Read Only, Pure Reducers
- 🔄 The flow is always: **dispatch → reducer → store → component re-renders**

---

## 🗺️ What's Next?

Now that you know **what Redux is and why we use it** — it is time to go deeper into each building block:

- 👉 **[02 — Store](./02-store.md)** → What is inside the store, how to set it up, and how it works
- **[03 — Slice](./03-slice.md)** → How to organize your state into slices
- **[04 — Reducer](./04-reducer.md)** → How state actually gets updated
- **[05 — Action](./05-action.md)** → How to trigger state changes
- **[06 — useSelector & useDispatch](./06-useSelector-useDispatch.md)** → How components talk to the store
- **[07 — Async Redux with Thunk](./07-async-redux-thunk.md)** → How to fetch API data with Redux

---

*📝 Notes by: Hasan | 🎯 Goal: Junior React Developer Interview Prep | ⚛️ react-redux-mastery*