# 🔨 Object Methods — Static Methods

---

## ১. `Object.keys()` — Key গুলোর Array

```js
const user = { id: 101, name: "Hasan", role: "Dev" };
console.log(Object.keys(user)); // ["id", "name", "role"]

// Object খালি কিনা চেক করা (Real project-এ খুব লাগে!)
const data = {};
const isEmpty = Object.keys(data).length === 0;
console.log(isEmpty); // true
```

---

## ২. `Object.values()` — Value গুলোর Array

```js
const prices = { apple: 100, orange: 200 };
console.log(Object.values(prices)); // [100, 200]

// সব value যোগ করা
const total = Object.values(prices).reduce((a, b) => a + b, 0);
console.log(total); // 300
```

---

## ৩. `Object.entries()` — [key, value] Pair Array

```js
const settings = { theme: "dark", notifications: true };
console.log(Object.entries(settings));
// [["theme", "dark"], ["notifications", true]]

// Object loop করে print করা (React-এ খুব লাগে)
Object.entries(settings).forEach(([key, value]) => {
  console.log(`${key} is set to ${value}`);
});
```

---

## ৪. `Object.fromEntries()` — Array থেকে Object

```js
// entries() এর উল্টো কাজ করে
const arr = [["color", "red"], ["size", "large"]];
const obj = Object.fromEntries(arr);
console.log(obj); // { color: "red", size: "large" }

// URL Params থেকে Object বানানো
const params = new URLSearchParams("name=hasan&age=22");
console.log(Object.fromEntries(params)); // { name: "hasan", age: "22" }
```

---

## ৫. `Object.freeze()` — সম্পূর্ণ লক করা

```js
const appConfig = { version: "1.0.2" };
Object.freeze(appConfig);

appConfig.version = "2.0.0"; // ❌ পরিবর্তন হবে না
appConfig.newKey = "test";   // ❌ যোগ হবে না

console.log(appConfig.version); // "1.0.2" — আগেরটাই থাকবে
```

> ⚠️ Shallow Freeze — nested object freeze হয় না!

---

## ৬. `Object.seal()` — Add/Delete বন্ধ, Update চলবে

```js
const profile = { username: "hasan_dev" };
Object.seal(profile);

profile.username = "abir_dev"; // ✅ Update করা যাবে
profile.email = "test@test.com"; // ❌ নতুন key যোগ হবে না
delete profile.username;          // ❌ delete করা যাবে না
```

---

## ৭. `Object.assign()` — Object Copy/Merge

```js
const target = { a: 1 };
const source = { b: 2, c: 3 };

Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }

// Spread দিয়ে same কাজ (বেশি ব্যবহৃত)
const merged = { ...target, ...source };
```

---

## 🎯 Interview Tips

- `Object.keys/values/entries` → object loop করতে এবং transform করতে।
- `Object.freeze` → Constant config বা immutable data-র জন্য।
- `Object.seal` → Structure fix রেখে শুধু value update করতে।
- `Object.fromEntries` → `Map` বা URL params থেকে object বানাতে।
