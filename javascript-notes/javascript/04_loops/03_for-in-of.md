# 🔍 for...in & for...of Loop

---

## ১. for...in — Object-এর Key বের করে

> Object-এর প্রতিটি **key/property** ধরে ধরে loop করে।

```js
const user = { name: "Hasan", age: 25, city: "Dhaka" };

for (const key in user) {
  console.log(key);        // name, age, city
  console.log(user[key]);  // Hasan, 25, Dhaka
}
```

> 💡 `user[key]` — Bracket Notation ব্যবহার করতে হয় কারণ `key` একটি variable।

---

### for...in দিয়ে Object-এর value যোগ করা

```js
const shopCart = { apple: 120, orange: 200, banana: 40 };
let total = 0;

for (const item in shopCart) {
  total += shopCart[item];
}
console.log("Total:", total); // 360
```

---

### কেন Array-তে for...in ব্যবহার করব না?

```js
const arr = ["a", "b", "c"];
for (const i in arr) {
  console.log(i); // "0", "1", "2" — index গুলো String হিসেবে আসে!
}
// ❌ "0" + 1 = "01" — math করতে গেলে সমস্যা
```

> ⚠️ Array-এর জন্য `for...of` ব্যবহার কর।

---

## ২. for...of — Array/String-এর Value বের করে

> Array বা String-এর প্রতিটি **value** ধরে ধরে loop করে। Index নিয়ে মাথা ঘামাতে হয় না।

```js
const colors = ["Red", "Green", "Blue"];

for (const color of colors) {
  console.log(color); // Red, Green, Blue
}
```

---

### String-এ for...of

```js
const myName = "Hasan";
for (const char of myName) {
  console.log(char); // H, a, s, a, n
}
```

---

### for...of দিয়ে Filter করা

```js
const prices = [25, 60, 45, 90, 15, 100];
const expensive = [];

for (const price of prices) {
  if (price > 50) {
    expensive.push(price);
  }
}
console.log(expensive); // [60, 90, 100]
```

---

## ৩. পার্থক্য এক নজরে

| | `for...in` | `for...of` |
|---|-----------|-----------|
| কী দেয়? | Key/Index | Value/Data |
| কোথায় ব্যবহার | Object | Array, String |
| Index type | String | N/A |

---

## 🎯 Interview Tips

- `for...in` → Object, key দরকার হলে।
- `for...of` → Array, value দরকার হলে।
- Array-তে `for...in` ব্যবহার করা যায় কিন্তু উচিত না — index String হিসেবে আসে।
- `for...of` শুধু **iterable** (Array, String, Map, Set) এ কাজ করে, Plain Object-এ করে না।
