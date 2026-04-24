# 🌐 Fetch API — ডাটা আনার উপায়

---

## ১. Fetch কী?

`fetch()` হলো JS-এর built-in function যা দিয়ে API থেকে ডাটা আনা যায়। এটা একটা **Promise** return করে।

---

## ২. কেন দুইটা `.then()`?

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => res.json()) // ১ম .then: Raw response → JSON convert (এটাও Promise)
  .then(data => console.log(data)) // ২য় .then: আসল data পাওয়া
  .catch(err => console.log("Error:", err));
```

**ধাপ বিশ্লেষণ:**
1. `fetch()` → server থেকে raw HTTP response আসে
2. `res.json()` → raw response-কে JavaScript object-এ convert করে (এটাও Promise!)
3. ২য় `.then` → convert করা data পাওয়া যায়

---

## ৩. Error Handling — সঠিকভাবে

```js
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(res => {
    // ⚠️ fetch 404 বা 500 error-এ reject করে না!
    // তাই নিজে check করতে হয়
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    return res.json();
  })
  .then(user => console.log(`Name: ${user.name}, Email: ${user.email}`))
  .catch(err => console.log("Error:", err));
```

> ⚠️ `fetch()` শুধু network error-এ reject করে। 404 বা 500 পেলেও reject করে না — `res.ok` চেক করতে হয়।

---

## ৪. GET Request (Default)

```js
// সব post আনা (limit 2)
fetch('https://jsonplaceholder.typicode.com/posts?_limit=2')
  .then(res => res.json())
  .then(posts => {
    posts.forEach(post => console.log("Title:", post.title));
  });
```

---

## ৫. POST Request — Data পাঠানো

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Post',
    body: 'Content here',
    userId: 1,
  }),
})
  .then(res => res.json())
  .then(data => console.log("Created:", data))
  .catch(err => console.log("Error:", err));
```

---

## ৬. Fetch Methods Cheat Sheet

```js
// GET
fetch(url)

// POST
fetch(url, { method: 'POST', headers: {...}, body: JSON.stringify(data) })

// PUT (সম্পূর্ণ update)
fetch(url, { method: 'PUT', headers: {...}, body: JSON.stringify(data) })

// PATCH (আংশিক update)
fetch(url, { method: 'PATCH', headers: {...}, body: JSON.stringify(data) })

// DELETE
fetch(url, { method: 'DELETE' })
```

---

## 🎯 Interview Tips

- `fetch` → Promise return করে।
- `res.json()` → আরেকটা Promise।
- `fetch` 404/500-এ reject করে না — `res.ok` বা `res.status` চেক করতে হয়।
- Network fail হলে (internet না থাকলে) reject করে।
- Async/Await দিয়ে fetch লেখা আরও clean — পরের নোটে দেখ।
