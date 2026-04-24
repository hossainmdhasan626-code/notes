# 🤝 Promises — প্রমিজ

---

## ১. Promise কী?

> Promise হলো একটা object যা ভবিষ্যতে কোনো কাজের ফলাফল (সাফল্য বা ব্যর্থতা) দেওয়ার প্রতিশ্রুতি দেয়।

ভাব এভাবে — রেস্তোরাঁয় অর্ডার দিলে তুমি একটা token পাও। খাবার এখনো তৈরি হয়নি, কিন্তু promise আছে যে দেবে। খাবার হলে পাবে, না হলে জানাবে।

---

## ২. Promise-এর ৩টা State

| State | মানে |
|-------|------|
| **Pending** | কাজ এখনো চলছে |
| **Fulfilled (Resolved)** | কাজ সফল হয়েছে |
| **Rejected** | কাজ ব্যর্থ হয়েছে |

---

## ৩. Promise তৈরি করা

```js
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("কাজটি সফল হয়েছে! 🎉");
  } else {
    reject("সমস্যা হয়েছে! ❌");
  }
});
```

---

## ৪. Promise ব্যবহার — `.then()` / `.catch()` / `.finally()`

```js
myPromise
  .then((data) => {
    console.log(data); // resolve হলে এখানে আসে
  })
  .catch((err) => {
    console.error(err); // reject হলে এখানে আসে
  })
  .finally(() => {
    console.log("সফল বা ব্যর্থ যাই হোক, এটা চলবে"); // সবসময় চলে
  });
```

---

## ৫. Real Example — Custom Delay Function

```js
const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${ms}ms সময় শেষ!`);
    }, ms);
  });
};

wait(2000).then(msg => console.log(msg)); // 2 সেকেন্ড পর: "2000ms সময় শেষ!"
```

---

## ৬. Real Example — Database Check Simulation

```js
const checkUser = (id) => {
  return new Promise((resolve, reject) => {
    if (id === 1) {
      resolve({ id: 1, name: "Hasan" });
    } else {
      reject("ইউজার খুঁজে পাওয়া যায়নি!");
    }
  });
};

checkUser(1)
  .then(user => console.log(user))   // { id: 1, name: "Hasan" }
  .catch(err => console.log(err));

checkUser(99)
  .then(user => console.log(user))
  .catch(err => console.log(err));   // "ইউজার খুঁজে পাওয়া যায়নি!"
```

---

## ৭. Promise Chaining — একটার পর একটা

```js
fetch('https://api.example.com/users/1')
  .then(res => {
    if (!res.ok) throw new Error("Status Error!");
    return res.json(); // এটাও একটা Promise
  })
  .then(user => {
    console.log(user.name);
    return fetch(`https://api.example.com/posts?userId=${user.id}`);
  })
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.log("Error:", err)); // যেকোনো জায়গায় error হলে এখানে আসবে
```

---

## ৮. `Promise.all()` — একসাথে অনেক Promise

```js
const p1 = fetch('https://api.example.com/posts/1').then(r => r.json());
const p2 = fetch('https://api.example.com/posts/2').then(r => r.json());

// সব শেষ হলে একসাথে result দেবে
Promise.all([p1, p2])
  .then(([post1, post2]) => {
    console.log(post1, post2);
  })
  .catch(err => console.log("যেকোনো একটা fail করলে এখানে আসবে"));

// Promise.allSettled → সব result দেয়, fail হলেও
// Promise.race → যে আগে শেষ করে সেটার result
// Promise.any → যে আগে succeed করে সেটার result
```

---

## 🎯 Interview Tips

- Promise-এর ৩টা state: Pending, Fulfilled, Rejected।
- একবার Fulfilled বা Rejected হলে আর বদলায় না।
- `.catch()` সব `.then()` chain-এর যেকোনো জায়গার error ধরে।
- `.finally()` → সফল বা ব্যর্থ যাই হোক, সবসময় চলে।
- `Promise.all` → সব সফল হলে চলে। একটা fail করলে সব fail।
- `Promise.allSettled` → সব শেষ হলে চলে, fail হলেও।
- Callback Hell-এর সমাধান হলো Promise।
