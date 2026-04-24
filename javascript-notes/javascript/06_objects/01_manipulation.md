# 🗂️ Object Manipulation

---

## ১. Property Access & Update

```js
const user = { name: "Hasan", age: 22 };

// Dot Notation (সবচেয়ে বেশি ব্যবহৃত)
user.age = 23;

// Bracket Notation (Dynamic key-এর জন্য)
const keyName = "role";
user[keyName] = "Junior Developer";

console.log(user); // { name: "Hasan", age: 23, role: "Junior Developer" }
```

> 💡 Key-এ যদি space বা hyphen থাকে (`"user-id"`), তাহলে Bracket Notation বাধ্যতামূলক।

---

## ২. Object Destructuring — ভেঙে বের করা

```js
const student = { sName: "Hasan", sAge: 22, city: "Dhaka" };

// Basic Destructuring
const { sName, sAge } = student;
console.log(sName); // "Hasan"

// Aliasing (নাম পরিবর্তন) + Default Value
const { city: location, status = "Active" } = student;
console.log(location, status); // "Dhaka", "Active"

// Function parameter-এ Destructuring (React-এ সবচেয়ে বেশি ব্যবহার)
function showUser({ name, age }) {
  console.log(name, age);
}
showUser(student);
```

---

## ৩. Spread Operator — Copy & Merge

```js
const basicInfo  = { name: "Hasan" };
const technical  = { skill: "React" };

// Merge — দুইটা object জোড়া দেওয়া
const fullProfile = { ...basicInfo, ...technical, country: "BD" };
console.log(fullProfile); // { name: "Hasan", skill: "React", country: "BD" }

// Clone — copy করা
const copyObj = { ...fullProfile };
```

> ⚠️ এটা **Shallow Copy** — nested object হলে সেটা আবার reference-ই থাকে।

---

## ৪. Property Deletion

```js
const product = { id: 101, title: "Laptop", stock: 5 };

delete product.stock;

const target = "id";
delete product[target]; // Dynamic delete

console.log(product); // { title: "Laptop" }
```

> ⚠️ বড় loop-এ `delete` এড়িয়ে চলো — performance কিছুটা কমে।

---

## ৫. Property Shorthand — ছোট করে লেখা

```js
const username = "hasan_dev";
const isAdmin  = false;

// আগে লিখতে হতো: { username: username, isAdmin: isAdmin }
const auth = { username, isAdmin }; // ES6 Shorthand ✅
console.log(auth); // { username: "hasan_dev", isAdmin: false }
```

---

## ৬. Computed Property Names — Dynamic Key

```js
const field = "status";
const value = "pending";

const task = {
  [field]: value, // { status: "pending" }
};
console.log(task.status); // "pending"
```

---

## ৭. Optional Chaining — Nested Object-এ নিরাপদে ঢোকা

```js
const user = { address: { city: "Dhaka" } };

console.log(user?.address?.city);   // "Dhaka" ✅
console.log(user?.phone?.number);   // undefined — crash করবে না ✅
// console.log(user.phone.number);  // ❌ TypeError!
```

---

## 🎯 Interview Tips

- Dot Notation vs Bracket Notation — dynamic key হলে bracket।
- Destructuring → React props handle করতে সবচেয়ে বেশি লাগে।
- Spread → shallow copy, nested object-এ সাবধান।
- Optional Chaining (`?.`) → nested object safely access করতে।
