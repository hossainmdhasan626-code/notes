# 🍕 03 — The Redux Slice (The Real Hero)

> 🎯 **Goal of this note:** Understand why Slices are the best thing that ever happened to Redux. We'll cover `createSlice`, `initialState`, `reducers`, `Immer`, `extraReducers`, selectors, and best practices.

---

## 📌 Table of Contents

1. What is a Slice?
2. Analogy (Pizza 🍕)
3. Creating a Slice
4. Immer (Magic)
5. extraReducers (Async Handling)
6. Selectors (IMPORTANT 🔥)
7. Store Connection
8. Slice Cheat Sheet
9. Common Mistakes
10. Interview Questions

---

## ❓ What is a Slice?

A **Slice** is a piece of your Redux state + logic bundled together.

👉 It contains:

* `name` → unique identifier
* `initialState` → default data
* `reducers` → functions to update state

👉 Old Redux:

* Actions ❌
* Constants ❌
* Reducers ❌ (separate files 😩)

👉 Redux Toolkit:

* Everything in **ONE place ✅**

---

## 🧠 Analogy (Pizza 🍕)

Redux Store = Big Pizza 🍕

Slices:

* userSlice → user data
* cartSlice → cart items
* themeSlice → UI state

👉 Each slice:

* has its own data
* has its own logic

---

## 🛠️ Creating a Slice

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle'
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

---

## ✨ Immer (Why RTK is Powerful)

👉 Normally (Old Redux):

```javascript
return {
  ...state,
  value: state.value + 1
};
```

👉 RTK (with Immer):

```javascript
state.value += 1;
```

👉 Behind the scenes:

* State **mutate হয় না**
* Immer copy বানিয়ে safe update করে

---

## 🚀 extraReducers (Async Logic)

👉 Used for:

* API calls
* async actions
* external actions

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'counter/fetchData',
  async () => {
    const res = await fetch('https://api.example.com');
    return res.json();
  }
);

const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'success';
        state.value = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      });
  }
});
```

---

## 🎯 Selectors (VERY IMPORTANT 🔥)

👉 Data access করার clean way

```javascript
export const selectCount = (state) => state.counter.value;
```

👉 Use in component:

```javascript
const count = useSelector(selectCount);
```

👉 কেন important?

* reusable
* clean
* scalable

---

## 🔗 Store Connection

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});
```

---

## 📦 Dispatch Example

```javascript
import { useDispatch } from 'react-redux';
import { increment } from './counterSlice';

const dispatch = useDispatch();

dispatch(increment());
dispatch(incrementByAmount(5));
```

---

## 📊 Slice Cheat Sheet

| Part          | Purpose             |
| ------------- | ------------------- |
| name          | identify slice      |
| initialState  | default data        |
| reducers      | sync logic          |
| extraReducers | async logic         |
| actions       | dispatch করার জন্য  |
| reducer       | store-এ use হয়      |
| selectors     | data read করার জন্য |

---

## ❌ Common Mistakes

❌ Direct state replace না বুঝে mutate করা
❌ selector use না করা
❌ async logic reducers এ লেখা
❌ slice naming wrong করা
❌ store setup ভুল করা

---

## 💬 Interview Questions

### ❓ What is createSlice?

👉 A function from Redux Toolkit that combines:

* actions
* reducers
* state

---

### ❓ What is Immer?

👉 A library used by RTK to allow writing mutable logic safely.

---

### ❓ Difference between reducers & extraReducers?

| reducers    | extraReducers  |
| ----------- | -------------- |
| sync logic  | async/external |
| own actions | other actions  |

---

### ❓ Why Redux Toolkit?

👉 Less boilerplate
👉 Built-in best practices
👉 Immer support
👉 DevTools support

---

## 🎯 Final Summary

```
createSlice → state + logic
Immer → easy update
reducers → sync
extraReducers → async
selectors → read data
store → central place
```

---

🔥 Hasan Tip:

👉 Interview-এ বলবে:

"Redux Toolkit simplifies Redux by combining actions, reducers, and state into slices, and uses Immer for easier state updates."

---
