# ⚛️ React Redux Mastery

> A structured note collection for understanding Redux from scratch to advanced.

---

## 📁 Folder Structure

```
react-redux-mastery/
├── README.md                        ← You are here (Overview)
├── 01-what-is-redux.md
├── 02-store.md
├── 03-slice.md
├── 04-reducer.md
├── 05-action.md
├── 06-useSelector-useDispatch.md
└── 07-async-redux-thunk.md
```

---

## 🤔 What is Redux?

Redux is a **state management library** for React.

When an app grows big and many components need the same data, passing props everywhere becomes a mess (Prop Drilling). Redux solves this by keeping **all shared data in one central place** called the **Store**.

```
Without Redux → Props drilling hell 😩
With Redux    → One store, everyone gets data directly ✅
```

---

## 🔄 Redux Workflow (Big Picture)

```
User does something (click, type...)
        ↓
   Component calls
   dispatch(action)
        ↓
     Reducer reads
     the action and
     updates the state
        ↓
      Store saves
      the new state
        ↓
   useSelector() picks
   up the new state
        ↓
  Component re-renders
  with updated data
```

---

## 🧩 Core Concepts (Quick Reference)

| Concept | One Line Definition |
|---|---|
| **Store** | The single central database of the whole app |
| **Slice** | One section of the store (e.g. cart, user) |
| **Action** | A message that says "do this" |
| **Reducer** | A function that reads the action and updates state |
| **dispatch** | The way to send an action to the store |
| **useSelector** | The way to read data from the store |
| **Provider** | Wraps the app so every component can access the store |

---

## ⚡ Minimal Redux Setup (Cheat Sheet)

```js
// 1. Create a slice
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => { state.items.push(action.payload) }
  }
});

// 2. Create the store
const store = configureStore({
  reducer: { cart: cartSlice.reducer }
});

// 3. Wrap the app with Provider
<Provider store={store}> <App /> </Provider>

// 4. Use in any component
const items = useSelector((state) => state.cart.items);
const dispatch = useDispatch();
dispatch(addItem({ id: 1, name: "Phone" }));
```

---

## 📌 Why Redux Toolkit (RTK)?

Old Redux had a lot of boilerplate code. **Redux Toolkit (RTK)** is the modern, official way to write Redux — cleaner and faster.

> Always use Redux Toolkit. Never use plain old Redux in new projects.

---

## 🗺️ Learning Path

- [ ] 01 — What is Redux & why use it
- [ ] 02 — Store deep dive
- [ ] 03 — Slice deep dive
- [ ] 04 — Reducer deep dive
- [ ] 05 — Action deep dive
- [ ] 06 — useSelector & useDispatch
- [ ] 07 — Async Redux with Thunk (API calls)

---

*Notes by: Hasan | Goal: Junior React Developer Interview Prep* 🚀