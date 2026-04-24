# ➡️ Arrow Functions — ES6 Modern Syntax

---

## ১. Basic Syntax — ধাপে ধাপে ছোট করা

```js
// Regular Function
function double(num) {
  return num * 2;
}

// Arrow Function (Step 1 — basic)
const double = (num) => {
  return num * 2;
};

// Arrow Function (Step 2 — single param, no parentheses needed)
const double = num => {
  return num * 2;
};

// Arrow Function (Step 3 — implicit return, one liner)
const double = num => num * 2;

console.log(double(5)); // 10
```

---

## ২. Parameter Rules

```js
// একটি parameter — () optional
const singleParam = name => "Mr. " + name;

// কোনো parameter নেই — () বাধ্যতামূলক
const noParam = () => console.log("No param!");

// দুই বা বেশি parameter — () বাধ্যতামূলক
const add = (a, b) => a + b;
```

---

## ৩. Implicit Return — Object Return করতে সাবধান!

```js
// ✅ Normal value return
const double = num => num * 2;

// ✅ Object return — () দিয়ে wrap করতে হবে!
const getUser = name => ({ name: name, role: "Dev" });

// ❌ ভুল — {} কে function body ভাবে
const getUser = name => { name: name }; // undefined রিটার্ন হবে!
```

---

## ৪. Rest Parameter — যেকোনো সংখ্যক Argument নিতে

```js
const sumAll = (...numbers) => {
  // 'numbers' একটি real Array
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

console.log(sumAll(10, 20, 30)); // 60
console.log(sumAll(5, 5));       // 10
```

---

## ৫. Arrow Function-এর সীমাবদ্ধতা

```js
// ❌ Constructor হিসেবে ব্যবহার করা যায় না
const Person = (name) => { this.name = name; };
// new Person("Hasan"); ← TypeError!

// ❌ 'arguments' object নেই
const test = () => {
  // console.log(arguments); ← ReferenceError!
};

// ✅ 'this' নেই — বাইরের 'this' ব্যবহার করে (Lexical this)
```

> এই `this` এর ব্যাপারটা `08_core-topics/03_this.md` ফাইলে বিস্তারিত আছে।

---

## ৬. Real Use Cases

```js
// Array methods-এ সবচেয়ে বেশি ব্যবহার হয়
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const evens   = numbers.filter(n => n % 2 === 0);
const total   = numbers.reduce((acc, n) => acc + n, 0);
```

---

## 🎯 Interview Tips

- Arrow Function Hoisted হয় না।
- নিজের `this` নেই — parent-এর `this` ব্যবহার করে (Lexical `this`)।
- `arguments` object নেই — Rest Parameter (`...args`) ব্যবহার করো।
- Constructor (`new`) হিসেবে ব্যবহার করা যায় না।
- Object return করতে হলে `()` দিয়ে wrap করতে হবে।
