# ➕ Operators — অপারেটর মাস্টার নোট

---

## ১. Arithmetic Operators — গাণিতিক কাজ

```js
let a = 10;
let b = 3;

console.log(a + b);  // Addition: 13
console.log(a - b);  // Subtraction: 7
console.log(a * b);  // Multiplication: 30
console.log(a / b);  // Division: 3.333...
console.log(a % b);  // Remainder/Modulus: 1 (ভাগশেষ)
console.log(a ** b); // Exponentiation: 1000 (10 এর পাওয়ার 3)
```

### Increment & Decrement

```js
let x = 5;
x++;  // Post-increment: আগে value দেয়, পরে বাড়ায়
++x;  // Pre-increment: আগে বাড়ায়, পরে value দেয়
```

```js
let x = 5;
let y = x++; // y = 5, x = 6 (আগে assign, পরে increment)
console.log(x, y); // 6, 5
```

---

## ২. Assignment Operators — মান সেট করা

```js
let score = 100;

score += 10; // score = score + 10 → 110
score -= 5;  // score = score - 5  → 105
score *= 2;  // score = score * 2  → 210
score /= 10; // score = score / 10 → 21
score %= 2;  // score = score % 2  → 1
```

---

## ৩. Comparison Operators — তুলনা করা (result: `true`/`false`)

```js
let p = 5;
let q = "5";

console.log(p == q);  // true  — Loose: শুধু value দেখে
console.log(p === q); // false — Strict: value + type দুটোই দেখে

console.log(10 != 5);    // true
console.log(10 !== "10"); // true
console.log(10 > 5);     // true
console.log(10 >= 10);   // true
```

> 🏆 **সবসময় `===` ব্যবহার কর।** `==` ব্যবহার করলে JS অদ্ভুত coercion করে বসে।

---

## ৪. Logical Operators — একাধিক শর্ত চেক

```js
let hasMoney = true;
let isHungry = true;
let isRainy  = false;

hasMoney && isHungry; // AND: সব true হলে true → true
hasMoney || isRainy;  // OR: যেকোনো একটা true হলে true → true
!hasMoney;            // NOT: উল্টে দেয় → false
```

---

## ৫. Operator Precedence — কোনটা আগে হিসাব হয়

PEMDAS নিয়ম মনে রাখ: **P**arentheses → **E**xponent → **M**ultiply → **D**ivide → **A**dd → **S**ubtract

```js
const calc = 10 + (5 * 2) / (5 - 3);
// ধাপ ১: (5-3) = 2, (5*2) = 10
// ধাপ ২: 10 / 2 = 5
// ধাপ ৩: 10 + 5 = 15
console.log(calc); // 15
```

---

## ৬. Tricky Interview Questions 🎯

### String Concatenation vs Addition

```js
console.log(2 + 2 + "5");  // "45"  — আগে addition হয়, তারপর string join
console.log("5" + 2 + 2);  // "522" — প্রথমেই string আছে, সব string হয়
```

### `null` আর `undefined` এর তুলনা

```js
console.log(null == undefined);  // true  — value একই ধরা হয়
console.log(null === undefined); // false — type আলাদা
```

### Logical Assignment (ES2021)

```js
let name = "";
name ||= "Guest"; // name যদি empty/falsy হয়, তাহলে "Guest" হবে
console.log(name); // "Guest"

let count = 5;
count &&= 10; // count যদি truthy হয়, তাহলে 10 হবে
console.log(count); // 10
```

---

## 🎯 Interview Tips এক লাইনে

- `=` → Assign: মান দেয়।
- `==` → Loose: শুধু মান চেক করে।
- `===` → Strict: মান + type চেক করে।
- `&&` → AND: সব true হলে true।
- `||` → OR: একটা true হলে true।
- `!` → NOT: উল্টে দেয়।
