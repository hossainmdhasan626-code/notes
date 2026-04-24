# ⚡ Async / Await — Modern Way

---

## ১. কেন Async/Await?

Promise-এর `.then()` chain অনেক বড় হলে পড়তে কঠিন হয়।
Async/Await দিয়ে সেই কোড দেখতে **synchronous-এর মতো simple** হয়।

```js
// Promise chain way
fetch(url).then(r => r.json()).then(data => ...).catch(...)

// Async/Await way — অনেক বেশি readable ✅
const data = await fetch(url).then(r => r.json());
```

---

## ২. নিয়ম

- Function-এর আগে `async` লিখতে হবে।
- Promise-এর আগে `await` লিখতে হবে।
- Error handle করতে `try...catch` ব্যবহার করতে হবে।

---

## ৩. Basic Example

```js
const loadData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    console.log("Task:", data.title);
  } catch (err) {
    console.log("Error:", err);
  }
};

loadData();
```

---

## ৪. Real Example — Profile Data Load করা

```js
async function getUserProfile(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!res.ok) throw new Error("User not found!");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Profile Error:", error.message);
  }
}

// Async function সবসময় Promise return করে
getUserProfile(2).then(user => console.log("User:", user?.name));
```

---

## ৫. একাধিক API — একসাথে Call করা

### ❌ ভুল — একটার পর একটা (Slow)

```js
const getSequential = async () => {
  const post1 = await fetch('/posts/1').then(r => r.json()); // অপেক্ষা করে
  const post2 = await fetch('/posts/2').then(r => r.json()); // আবার অপেক্ষা করে
  // দুইটা মিলিয়ে সময় লাগে
};
```

### ✅ সঠিক — একসাথে (Fast)

```js
const getParallel = async () => {
  try {
    const [res1, res2] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts/1'),
      fetch('https://jsonplaceholder.typicode.com/posts/2'),
    ]);

    const post1 = await res1.json();
    const post2 = await res2.json();

    console.log("Posts loaded successfully.");
  } catch (err) {
    console.log("Failed:", err);
  }
};
```

---

## ৬. React-এ Async/Await — `useEffect`-এ

```js
// ⚠️ useEffect-এ সরাসরি async দেওয়া যায় না
useEffect(async () => { // ❌ ভুল
  const data = await fetchData();
}, []);

// ✅ সঠিক — ভেতরে async function বানাও
useEffect(() => {
  const getData = async () => {
    try {
      const res = await fetch('/api/data');
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  getData();
}, []);
```

---

## ৭. Error Handling — বিস্তারিত

```js
async function fetchWithError() {
  try {
    const res = await fetch('https://api.example.com/data');

    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;

  } catch (err) {
    // Network error বা throw করা error দুটোই ধরে
    console.error("Caught:", err.message);
    return null; // বা default value
  } finally {
    console.log("Request complete (success বা fail যাই হোক)");
  }
}
```

---

## 🎯 Interview Tips

- `async` function সবসময় Promise return করে।
- `await` শুধু `async` function-এর ভেতরে ব্যবহার করা যায়।
- `await` code-কে pause করে কিন্তু পুরো browser-কে না (Non-blocking)।
- Multiple independent async call-এ `Promise.all` ব্যবহার করো — performance ভালো হয়।
- `useEffect`-এ সরাসরি `async` দেওয়া যায় না — ভেতরে function বানাতে হয়।
- `try/catch` = Async/Await এর `.catch()` এর equivalent।
