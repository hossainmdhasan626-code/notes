# 🛠️ RTK Basics — Store & Setup

---

## ১. Install করা

```bash
npm install @reduxjs/toolkit react-redux
```

---

## ২. Store তৈরি করা — `configureStore()`

```js
// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import cartReducer    from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer, // state.counter
    cart: cartReducer,       // state.cart
  },
});
```

> Store হলো সব data-এর একমাত্র ঘর। `reducer` object-এ সব slice-এর reducer দেওয়া হয়।

---

## ৩. Store App-এ Connect করা — `Provider`

```jsx
// main.jsx বা index.jsx
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

> `Provider` দিয়ে wrap করলে ভেতরের যেকোনো component Store-এ access পাবে।

---

## ৪. Slice তৈরি করা — `createSlice()`

```js
// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',          // slice-এর নাম (action type prefix হবে)
  initialState: {           // শুরুতে state কেমন থাকবে
    value: 0,
    status: 'idle',
  },
  reducers: {               // কোন action-এ কী হবে
    increment: (state) => {
      state.value += 1;     // RTK-তে সরাসরি mutate করা যায় (Immer.js এর কারণে)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload; // payload = action-এ পাঠানো data
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Action creators আলাদা করে export করা হয়
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Reducer export করা হয় (store-এ দেওয়ার জন্য)
export default counterSlice.reducer;
```

---

## ৫. Component-এ State পড়া — `useSelector()`

```jsx
import { useSelector } from 'react-redux';

const Counter = () => {
  // Store থেকে দরকারী অংশ নেওয়া
  const count = useSelector(state => state.counter.value);

  return <h1>Count: {count}</h1>;
};
```

> `useSelector` → Store-এ যখনই ওই part বদলাবে, component re-render হবে।

---

## ৬. Action Dispatch করা — `useDispatch()`

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from './counterSlice';

const Counter = () => {
  const count    = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};
```

---

## ৭. Complete Flow — এক নজরে

```
Button Click
    ↓
dispatch(increment())       ← Action তৈরি হলো: { type: 'counter/increment' }
    ↓
Store → counterReducer-এ পাঠালো
    ↓
Reducer: state.value += 1   ← State বদলালো
    ↓
Store Update
    ↓
useSelector → Counter component re-render  ← UI বদলালো
```

---

## ৮. Folder Structure — Best Practice

```
src/
├── app/
│   └── store.js              ← একটাই store
├── features/
│   ├── counter/
│   │   ├── counterSlice.js   ← slice (reducer + actions)
│   │   └── Counter.jsx       ← component
│   └── cart/
│       ├── cartSlice.js
│       └── Cart.jsx
```

---

## 🎯 Interview Tips

- `configureStore` → Redux Store তৈরি করে।
- `createSlice` → Reducer + Action creators একসাথে তৈরি করে।
- `Provider` → App-কে Store-এর সাথে connect করে।
- `useSelector` → Store থেকে state পড়ে।
- `useDispatch` → Action dispatch করে।
- RTK-তে state সরাসরি mutate করা যায় — পর্দার আড়ালে **Immer.js** immutable রাখে।
- Action type format: `sliceName/actionName` (যেমন: `counter/increment`)।
