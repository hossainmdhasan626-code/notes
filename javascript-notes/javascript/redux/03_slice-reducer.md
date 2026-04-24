# 🍕 Slice & Reducer — বিস্তারিত

---

## ১. Reducer কী?

> Reducer একটা pure function যে বলে: "এই action আসলে state কেমন হবে?"
>
> `(currentState, action) → newState`

```js
// Pure function মানে:
// ✅ Same input → same output সবসময়
// ✅ Side effects নেই (API call, console.log নেই)
// ✅ State সরাসরি mutate করে না (plain Redux-এ)
```

---

## ২. `action.payload` — Data পাঠানো

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    // payload-এ product data পাঠানো হয়
    addToCart: (state, action) => {
      const product = action.payload; // dispatch করার সময় যা দেওয়া হয়েছে
      const existing = state.items.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += 1; // আগে থাকলে quantity বাড়াও
      } else {
        state.items.push({ ...product, quantity: 1 }); // নতুন হলে যোগ করো
      }
      state.totalQuantity += 1;
    },

    removeFromCart: (state, action) => {
      const id = action.payload; // শুধু id পাঠানো হয়েছে
      state.items = state.items.filter(item => item.id !== id);
      state.totalQuantity -= 1;
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
```

---

## ৩. Component-এ Payload সহ Dispatch করা

```jsx
import { addToCart, removeFromCart } from './cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => dispatch(addToCart(product))}>
        {/* product object-ই payload হিসেবে যাচ্ছে */}
        Add to Cart
      </button>
    </div>
  );
};

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <span>{item.name} x{item.quantity}</span>
      <button onClick={() => dispatch(removeFromCart(item.id))}>
        {/* শুধু id পাঠাচ্ছি */}
        Remove
      </button>
    </div>
  );
};
```

---

## ৪. Selector — State থেকে Smart ভাবে Data বের করা

```jsx
// সরাসরি Component-এ (ছোট app)
const items = useSelector(state => state.cart.items);

// আলাদা Selector function (বড় app — recommended)
// cartSlice.js-এ
export const selectCartItems    = state => state.cart.items;
export const selectTotalQty     = state => state.cart.totalQuantity;
export const selectCartTotal    = state =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// Component-এ
const items    = useSelector(selectCartItems);
const total    = useSelector(selectCartTotal);
const quantity = useSelector(selectTotalQty);
```

> আলাদা selector function বানালে একই logic বারবার লিখতে হয় না।

---

## ৫. `prepare` Callback — Payload Format করা

```js
const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    addNotification: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (message, type = 'info') => ({
        payload: {
          id: Date.now(),   // prepare-এ extra logic করা যায়
          message,
          type,
          timestamp: new Date().toISOString(),
        },
      }),
    },
  },
});

// Call করার সময়
dispatch(addNotification("Save successful!", "success"));
// payload হবে: { id: ..., message: "Save successful!", type: "success", timestamp: ... }
```

---

## ৬. Multiple Slice-এর মধ্যে কথা বলা — `extraReducers`

```js
// authSlice.js
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    logout: (state) => { state.user = null; },
  },
});

// cartSlice.js — auth-এর logout হলে cart-ও clear হবে
import { logout } from '../auth/authSlice';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: { /* ... */ },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.items = []; // logout হলে cart clear করো
    });
  },
});
```

---

## 🎯 Interview Tips

- Reducer = Pure function, `(state, action) => newState`।
- RTK-তে Immer.js ব্যবহারের কারণে state সরাসরি mutate করা যায়।
- `action.payload` → dispatch করার সময় যা পাঠানো হয়।
- Selector function আলাদা করে রাখলে reusable হয়।
- `extraReducers` → অন্য slice-এর action-এ react করতে।
- `prepare` callback → payload আগে format/transform করতে।
