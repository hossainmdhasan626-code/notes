# 🔌 createApi & Endpoints — RTK Query Setup

---

## ১. Install করা

```bash
# RTK-এর সাথেই আসে, আলাদা install লাগবে না
npm install @reduxjs/toolkit react-redux
```

---

## ২. API তৈরি করা — `createApi()`

```js
// features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // Store-এ এই নামে save হবে
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    // Headers সেট করা (token-এর জন্য)
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({

    // GET — data আনা
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'], // Cache tag — invalidate করতে লাগবে
    }),

    // GET একটা — id দিয়ে
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    // POST — নতুন তৈরি করা
    addPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'], // এটা চললে Post-এর cache clear হবে
    }),

    // PUT — সম্পূর্ণ update
    updatePost: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),

    // DELETE
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),

  }),
});

// Auto-generated hooks export করা (নাম pattern: use + EndpointName + Query/Mutation)
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;
```

---

## ৩. Store-এ যোগ করা

```js
// app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query-এর reducer
    // অন্য reducers...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // RTK Query-এর middleware
});
```

> ⚠️ `middleware` যোগ করতে ভুলবি না — caching, invalidation সব middleware করে।

---

## ৪. Component-এ Query ব্যবহার করা

```jsx
import { useGetPostsQuery } from '../features/api/apiSlice';

const PostList = () => {
  const {
    data: posts,  // API-র response data
    isLoading,    // প্রথমবার loading
    isFetching,   // background refetch হচ্ছে
    isSuccess,    // সফল হয়েছে
    isError,      // error হয়েছে
    error,        // error details
    refetch,      // manually আবার fetch করা
  } = useGetPostsQuery(); // argument দরকার নেই (query: () => '/posts')

  if (isLoading) return <p>Loading...</p>;
  if (isError)   return <p>Error: {error.message}</p>;

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
```

---

## ৫. Query-তে Argument পাঠানো

```jsx
import { useGetPostQuery } from '../features/api/apiSlice';

const PostDetail = ({ postId }) => {
  const { data: post, isLoading } = useGetPostQuery(postId); // argument হিসেবে id

  if (isLoading) return <p>Loading...</p>;
  return <h1>{post?.title}</h1>;
};
```

---

## ৬. Query-তে Options পাঠানো

```jsx
const { data } = useGetPostsQuery(undefined, {
  pollingInterval: 30000,    // ৩০ সেকেন্ড পর পর refetch
  skipPollingIfUnfocused: true, // tab focus না থাকলে poll করবে না
  skip: !isLoggedIn,         // false হলে query চলবে না
  refetchOnMountOrArgChange: true, // component mount হলে refetch
});
```

---

## 🎯 Interview Tips

- `builder.query` → GET (data read করতে)।
- `builder.mutation` → POST, PUT, PATCH, DELETE (data change করতে)।
- `providesTags` → Cache-এর label দেওয়া।
- `invalidatesTags` → এই mutation চললে ওই tag-এর cache clear হবে, auto refetch হবে।
- Hooks auto-generate হয়: `use` + endpoint name + `Query`/`Mutation`।
- `middleware` অবশ্যই store-এ যোগ করতে হবে।
