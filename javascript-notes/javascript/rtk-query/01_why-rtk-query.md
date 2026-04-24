# 🚀 কেন RTK Query? — Why RTK Query

---

## ১. সমস্যা কী ছিল?

Async Thunk দিয়ে API call করতে গেলে প্রতিটা API-র জন্য অনেক boilerplate লিখতে হয়:

```js
// প্রতিটা API-র জন্য এগুলো বারবার লিখতে হতো 😩
const fetchUsers = createAsyncThunk(...);
// + status: 'idle' | 'loading' | 'succeeded' | 'failed'
// + extraReducers-এ pending/fulfilled/rejected
// + Component-এ useEffect দিয়ে dispatch
// + Manual caching নেই — বারবার same data fetch হয়
// + Loading/Error state manually manage করতে হয়
```

---

## ২. RTK Query কী?

RTK Query হলো RTK-এর built-in **data fetching + caching** tool। এটা দিয়ে কম কোডে অনেক বেশি কাজ করা যায়।

```js
// RTK Query-তে একটা API define করলেই সব পাওয়া যায়
const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({ query: () => '/users' }),
  }),
});

// Component-এ
const { data, isLoading, isError } = useGetUsersQuery();
// loading state, error state, data — সব automatic! ✅
```

---

## ৩. RTK Query vs Async Thunk — পার্থক্য

| | Async Thunk | RTK Query |
|---|-------------|-----------|
| Code amount | অনেক বেশি | অনেক কম |
| Caching | ❌ নেই | ✅ Automatic |
| Loading state | Manual | ✅ Automatic |
| Error state | Manual | ✅ Automatic |
| Re-fetch | Manual | ✅ Automatic |
| Optimistic update | Complex | ✅ Built-in |
| Background refetch | ❌ নেই | ✅ আছে |

---

## ৪. RTK Query কখন ব্যবহার করবো?

```js
// RTK Query ব্যবহার করো যখন:
// ✅ Server থেকে data fetch করতে হবে (GET, POST, PUT, DELETE)
// ✅ Caching দরকার
// ✅ Loading/Error state automatically চাও

// Async Thunk ব্যবহার করো যখন:
// ✅ Complex business logic দরকার (API call-এর আগে/পরে অনেক কিছু করতে হবে)
// ✅ Multiple API-র result combine করতে হবে
// ✅ Non-server async কাজ (file processing ইত্যাদি)
```

---

## 🎯 Interview Tips

- RTK Query = Async Thunk-এর advanced version, কম কোডে বেশি কাজ।
- Automatic caching → same data বারবার fetch হয় না।
- `isLoading`, `isError`, `data` → automatic পাওয়া যায়।
- পরের নোটে (`02_create-api.md`) কীভাবে setup করতে হয় সব আছে।
