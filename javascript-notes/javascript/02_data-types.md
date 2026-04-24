# 🧠 Data Types, Memory & Type Coercion

---

## ১. Data Types — ২ প্রকার

JavaScript-এ ডাটা টাইপ মূলত ২ রকম: **Primitive** আর **Reference**।

---

## ২. Primitive Types — Stack Memory-তে থাকে

```js
const myString    = "Hasan Mahmud";   // String
const myNumber    = 28;               // Number (Integer বা Float দুটোই)
const myBool      = true;             // Boolean
const myUndefined = undefined;        // Undefined — মান দেওয়া হয়নি
const myNull      = null;             // Null — ইচ্ছা করে খালি রাখা
const mySymbol    = Symbol("id");     // Symbol — ইউনিক আইডি বানাতে
const myBigInt    = 9007199254n;      // BigInt — বিশাল বড় সংখ্যার জন্য
```

> ⚠️ **Interview Bug:**
> ```js
> typeof null; // "object" — JS-এর শুরু থেকে চলে আসা বাগ 🐛
> typeof NaN;  // "number" — NaN মানে Not a Number, কিন্তু type হলো number!
> ```

---

## ৩. Reference Types — Heap Memory-তে থাকে

```js
const myObject   = { name: "Hasan", age: 28 }; // Object
const myArray    = ["JS", "React", "Node"];      // Array
const myFunction = function() { return "Hello"; }; // Function
```

---

## ৪. Memory Logic — Pass by Value vs Pass by Reference

### Primitive = Pass by Value (কপি যায়)

```js
let a = 10;
let b = a;  // 'a' এর একটি আলাদা কপি 'b' পেল
b = 20;
console.log(a); // 10 — অরিজিনাল বদলায়নি ✅
```

### Reference = Pass by Reference (ঠিকানা যায়)

```js
let user1 = { name: "Hasan" };
let user2 = user1; // একই মেমোরি ঠিকানা শেয়ার হলো!
user2.name = "Abir";
console.log(user1.name); // "Abir" — অরিজিনাল বদলে গেছে 😱
```

> 💬 ভাব এভাবে — Primitive দিলে **ফটোকপি** যায়, Reference দিলে **বাড়ির চাবি** যায়।
> চাবি দিলে দুইজনই একই ঘরে ঢুকতে পারে।

---

## ৫. Shallow Copy — Spread দিয়ে কপি

```js
let originalUser = { name: "Hasan", city: "Dhaka" };
let copiedUser = { ...originalUser }; // Spread দিয়ে কপি
copiedUser.name = "Abir";
console.log(originalUser.name); // "Hasan" — এখন অরিজিনাল নিরাপদ ✅
```

> ⚠️ এটা **Shallow Copy** — মানে মাত্র ১ লেভেল কপি হয়।
> নেস্টেড অবজেক্ট থাকলে সেটা আবার Reference হিসেবেই থাকবে।

---

## ৬. `const` দিয়েও Array/Object বদলানো যায় কেন?

```js
const colors = ["Red", "Green"];
colors.push("Blue"); // ✅ কাজ করবে!
// কারণ: আমরা মেমোরি অ্যাড্রেস পাল্টাচ্ছি না, শুধু ভেতরের ডাটা পাল্টাচ্ছি।
// const মানে address fix, content fix না।
```

---

## ৭. Type Coercion — JS নিজে নিজে type বদলায়

### `+` অপারেটর ট্রিকি:
```js
console.log(1 + 2 + "hasan"); // "3hasan"
// কারণ: বাম থেকে ডানে চলে। ১+২=৩, তারপর ৩+"hasan" = "3hasan"

console.log("hasan" + 1 + 2); // "hasan12"
// কারণ: শুরুতেই string আছে, তাই সব string হয়ে যায়
```

### `-`, `*`, `/` শুধু number বোঝে:
```js
console.log("10" - 2);    // 8  — "10" কে number বানিয়ে নিয়েছে
console.log("10" * "2");  // 20 — দুটোকেই number বানিয়ে নিয়েছে
```

---

## ৮. Modern ES6+ — কাজের কিছু Feature

### Template Literal
```js
const name = "Hasan";
console.log(`Hello, I am ${name} and my age is ${2026 - 1998}`);
```

### Optional Chaining (`?.`)
```js
const profile = { name: "Hasan" };
console.log(profile?.address?.city); // undefined — এরর আসবে না ✅
// profile.address undefined হলেও crash করবে না
```

---

## 🎯 Interview Tips

- **Primitive** = Stack memory, **Reference** = Heap memory।
- `==` (Value check), `===` (Value + Type check) — সবসময় `===` ব্যবহার কর।
- `Array.isArray(arr)` — কোনো কিছু array কিনা চেক করতে।
- `typeof null` = `"object"` — এটা একটা bug, feature না।
- `typeof NaN` = `"number"` — NaN মানে "Not a Number" কিন্তু type হলো number।
- Post-increment (`x++`) আগে অ্যাসাইন করে পরে বাড়ায়।
