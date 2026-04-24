# ⚡ Async Thunk — Async কাজ Redux-এ

---

## ১. সমস্যা কী?

Reducer হলো pure function — তাতে API call করা যায় না।

```js
// ❌ ভুল — Reducer-এ async কাজ করা যাবে না
reducers: {
  fetchUsers: async (state) => {
    const data = await fetch('/api/users'); // ❌ এটা করা যাবে না!
    state.users = data;
  }
}
```

**সমাধান:** `createAsyncThunk` — Async কাজটা Reducer-এর বাইরে করে, তারপর result Reducer-এ দেয়।

---

## ২. `createAsyncThunk` — তৈরি করা

```js
// features/users/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ১ম argument: action type prefix
// ২য় argument: async function (payload creator)
export const fetchUsers = createAsyncThunk(
  'users/fetchAll', // action type হবে: users/fetchAll/pending, fulfilled, rejected
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Server Error');
      return await response.json(); // এটাই payload হবে (fulfilled-এ)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // custom error message
    }
  }
);
```

---

## ৩. Slice-এ Handle করা — `extraReducers`

```js
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list:    [],
    status:  'idle',    // 'idle' | 'loading' | 'succeeded' | 'failed'
    error:   null,
  },
  reducers: {},         // sync reducers এখানে
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error  = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list   = action.payload; // async function-এর return value
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error  = action.payload; // rejectWithValue-এর value
      });
  },
});

export default usersSlice.reducer;
```

---

## ৪. Component-এ ব্যবহার করা

```jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './usersSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { list: users, status, error } = useSelector(state => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers()); // Async thunk dispatch করা
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed')  return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

---

## ৫. Argument পাঠানো — Payload সহ Thunk

```js
// Thunk-এ argument নেওয়া
export const fetchPostsByUser = createAsyncThunk(
  'posts/fetchByUser',
  async (userId) => { // userId = dispatch করার সময় যা দেবে
    const res = await fetch(`/api/posts?userId=${userId}`);
    return res.json();
  }
);

// Component-এ
dispatch(fetchPostsByUser(5)); // userId = 5
```

---

## ৬. Thunk-এ Store-এর অন্য State দেখা

```js
export const addToCartWithCheck = createAsyncThunk(
  'cart/addWithCheck',
  async (product, thunkAPI) => {
    const state = thunkAPI.getState(); // পুরো store-এর state দেখা যাবে
    const isLoggedIn = state.auth.user !== null;

    if (!isLoggedIn) {
      return thunkAPI.rejectWithValue("Login করো আগে!");
    }

    return product;
  }
);
```

---

## ৭. Thunk-এর ৩টা Auto Action

```
dispatch(fetchUsers()) করলে automatically ৩টা action fire হয়:

fetchUsers.pending    → API call শুরু হলে
fetchUsers.fulfilled  → সফল হলে (return value = payload)
fetchUsers.rejected   → fail হলে (rejectWithValue = payload)
```

---

## 🎯 Interview Tips

- Reducer pure function — তাতে async কাজ করা যায় না।
- `createAsyncThunk` → Async কাজ করে, 3টা lifecycle action দেয়।
- `pending/fulfilled/rejected` → loading state manage করতে ব্যবহার করো।
- `thunkAPI.rejectWithValue()` → custom error message পাঠাতে।
- `thunkAPI.getState()` → Thunk-এর ভেতরে store-এর অন্য data দেখতে।
- status pattern: `'idle' | 'loading' | 'succeeded' | 'failed'` → best practice।
