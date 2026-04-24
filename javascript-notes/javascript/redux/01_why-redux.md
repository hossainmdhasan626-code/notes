# 🔴 কেন Redux? — Why Redux

---

## ১. সমস্যাটা কী ছিল?

React-এ data শুধু **Parent → Child** (one-way) যায়। কিন্তু বড় app-এ সমস্যা হয়।

### Prop Drilling — data-কে অনেক নিচে নামাতে গেলে

```jsx
// A থেকে D-তে data পাঠাতে হলে সব মাঝখানে দিয়ে যেতে হয়!
<A user={user}>
  <B user={user}>        // B-এর দরকার নেই, শুধু পাস করছে
    <C user={user}>      // C-এরও দরকার নেই
      <D user={user} />  // শুধু D-এর দরকার
    </C>
  </B>
</A>
```

> এটাকে বলে **Prop Drilling** — ভয়াবহ maintenance nightmare! 😫

---

### Sibling-এর মধ্যে data share

```jsx
// Cart আর Navbar-এ একই cart count দেখাতে হবে
<App>
  <Navbar cartCount={?} /> // এদের কোনো parent-child relation নেই
  <ProductList />
  <Cart cartCount={?} />   // দুইজনেরই data দরকার
</App>
// সমাধান: App-এ state তুলে নিয়ে যেতে হয় (State Lifting) — এটাও কঠিন হয়ে যায়
```

---

## ২. Redux-এর সমাধান — Global Store

```
Redux Store (একটাই জায়গা, সব data এখানে)
        ↓ ↑
   যে component চাইবে সরাসরি নেবে
```

```jsx
// Redux দিয়ে — যেকোনো component থেকে সরাসরি data নেওয়া যায়
const Navbar = () => {
  const cartCount = useSelector(state => state.cart.count); // সরাসরি Store থেকে
  return <nav>Cart: {cartCount}</nav>;
};

const Cart = () => {
  const cartCount = useSelector(state => state.cart.count); // একই Store থেকে
  return <div>Items: {cartCount}</div>;
};
// Prop Drilling নেই ✅
```

---

## ৩. Redux-এর ৩টা মূল Concept

```
Action → Reducer → Store
  ↑                  ↓
Component        Component
(dispatch)       (useSelector)
```

| Concept | মানে |
|---------|------|
| **Store** | সব data এক জায়গায় — Global State |
| **Action** | কী করতে চাই তার description (`{ type: "INCREMENT" }`) |
| **Reducer** | Action দেখে State কীভাবে বদলাবে তা define করে |

---

## ৪. Redux Data Flow — Unidirectional

```
1. User কিছু করে (button click)
2. Component → Action dispatch করে
3. Action → Reducer-এ যায়
4. Reducer → নতুন State তৈরি করে
5. Store → update হয়
6. Component → re-render হয় (useSelector)
```

> এই **একমুখী flow** থাকার কারণে bug track করা অনেক সহজ।

---

## ৫. কখন Redux দরকার, কখন না?

```js
// Redux দরকার যখন:
// ✅ অনেক component একই data share করে
// ✅ App অনেক বড় ও complex
// ✅ State management জটিল হয়ে গেছে

// Redux দরকার নেই যখন:
// ❌ ছোট app
// ❌ Data শুধু ২-৩টা component-এ দরকার (Context API যথেষ্ট)
// ❌ Simple CRUD app
```

---

## ৬. Redux Toolkit (RTK) — আধুনিক Redux

Plain Redux-এ অনেক boilerplate (একই জিনিস বারবার লিখতে হতো)। RTK সেটা কমিয়ে দিয়েছে।

```js
// Plain Redux — অনেক লম্বা
const INCREMENT = 'INCREMENT';
const actionCreator = () => ({ type: INCREMENT });
const reducer = (state = 0, action) => { ... };
const store = createStore(reducer);

// RTK — অনেক কম লেখা ✅
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1
  }
});
```

> পরের নোটে RTK দিয়ে কীভাবে কাজ করতে হয় সব বিস্তারিত আছে।

---

## 🎯 Interview Tips

- Redux কেন? → Prop Drilling সমাধান করতে এবং Global State manage করতে।
- Redux-এর মূল ৩ জিনিস: Store, Action, Reducer।
- Unidirectional data flow → debug করা সহজ।
- Redux Toolkit = Redux-এর আধুনিক version, কম boilerplate।
- ছোট app-এ Redux না দিয়ে Context API বা `useState` দিয়ে করো।
