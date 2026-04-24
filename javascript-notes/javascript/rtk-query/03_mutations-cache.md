# 🔄 Mutations & Cache — RTK Query

---

## ১. Mutation কী?

`query` → data **পড়ে** (GET)
`mutation` → data **বদলায়** (POST, PUT, PATCH, DELETE)

---

## ২. Mutation Hook ব্যবহার করা

```jsx
import { useAddPostMutation } from '../features/api/apiSlice';

const AddPostForm = () => {
  const [addPost, result] = useAddPostMutation();
  // addPost = trigger function (call করলে mutation চলে)
  // result  = { isLoading, isSuccess, isError, error, data }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPost({
        title: 'নতুন পোস্ট',
        body: 'content here',
        userId: 1,
      }).unwrap();
      // .unwrap() → fulfilled হলে data দেয়, rejected হলে throw করে
      alert('সফলভাবে যোগ হয়েছে!');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={result.isLoading}>
        {result.isLoading ? 'যোগ হচ্ছে...' : 'পোস্ট যোগ করো'}
      </button>
    </form>
  );
};
```

---

## ৩. Cache কীভাবে কাজ করে?

```
প্রথমবার useGetPostsQuery() call হলো
    ↓
API থেকে data আনলো
    ↓
RTK Query Cache-এ রাখলো (tag: 'Post')
    ↓
পরেরবার useGetPostsQuery() call হলো
    ↓
Cache-এ আছে? ✅ → API call হলো না, cache থেকে দিলো (Fast!)
```

---

## ৪. Cache Invalidation — কখন refresh হবে?

```js
// apiSlice.js

endpoints: (builder) => ({
  getPosts: builder.query({
    query: () => '/posts',
    providesTags: ['Post'],         // এই cache-এর নাম 'Post'
  }),

  addPost: builder.mutation({
    query: (body) => ({ url: '/posts', method: 'POST', body }),
    invalidatesTags: ['Post'],      // mutation চললে 'Post' cache delete হবে
    // ফলে getPosts আবার API থেকে fresh data আনবে ✅
  }),
})
```

**Flow:**
```
addPost mutation চললো
    ↓
invalidatesTags: ['Post'] → 'Post' cache মুছে গেলো
    ↓
useGetPostsQuery() detect করলো cache নেই
    ↓
আবার API call করে fresh data আনলো
    ↓
UI automatically update! ✅
```

---

## ৫. Granular Cache Tag — Item-level Invalidation

```js
endpoints: (builder) => ({
  getPosts: builder.query({
    query: () => '/posts',
    providesTags: (result) =>
      result
        ? [
            ...result.map(({ id }) => ({ type: 'Post', id })), // প্রতিটা post-এর tag
            { type: 'Post', id: 'LIST' },                       // list-এর একটা general tag
          ]
        : [{ type: 'Post', id: 'LIST' }],
  }),

  updatePost: builder.mutation({
    query: ({ id, ...patch }) => ({
      url: `/posts/${id}`,
      method: 'PUT',
      body: patch,
    }),
    // শুধু ওই specific post-এর cache clear হবে, পুরো list না
    invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
  }),

  addPost: builder.mutation({
    query: (body) => ({ url: '/posts', method: 'POST', body }),
    // নতুন post যোগ হলে পুরো list refresh হোক
    invalidatesTags: [{ type: 'Post', id: 'LIST' }],
  }),
})
```

---

## ৬. Optimistic Update — API শেষ হওয়ার আগেই UI বদলানো

```js
// Like button-এর মতো feature-এ দরকার হয়
updatePost: builder.mutation({
  query: ({ id, ...patch }) => ({
    url: `/posts/${id}`,
    method: 'PATCH',
    body: patch,
  }),
  async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
    // API call হওয়ার আগেই UI update করো (Optimistic)
    const patchResult = dispatch(
      apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
        const post = draft.find(p => p.id === id);
        if (post) Object.assign(post, patch);
      })
    );

    try {
      await queryFulfilled; // API সফল হলে ঠিকঠাক
    } catch {
      patchResult.undo(); // API fail হলে আগের অবস্থায় ফিরিয়ে দাও
    }
  },
}),
```

---

## ৭. Manual Refetch করা

```jsx
const { data, refetch } = useGetPostsQuery();

// যেকোনো সময় manually refresh করতে
<button onClick={refetch}>Refresh Data</button>
```

---

## ৮. Cache Lifetime — কতক্ষণ থাকে?

```js
// Default: component unmount হওয়ার ৬০ সেকেন্ড পর cache মুছে যায়
// Custom করা যায়:
getPosts: builder.query({
  query: () => '/posts',
  keepUnusedDataFor: 300, // ৩০০ সেকেন্ড (৫ মিনিট) পর্যন্ত cache রাখবে
}),
```

---

## 🎯 Interview Tips

- `query` vs `mutation` → read vs write।
- `providesTags` → "এই data-এর cache নাম দিলাম।"
- `invalidatesTags` → "এই mutation-এর পর ওই নামের cache মুছে দাও।"
- Cache clear হলে RTK Query auto refetch করে — manually করতে হয় না।
- `.unwrap()` → Promise return করে, `try/catch` দিয়ে error handle করা যায়।
- Optimistic Update → API-র আগেই UI বদলাও, fail করলে undo করো।
- `keepUnusedDataFor` → Cache কতক্ষণ থাকবে নির্ধারণ করে।
