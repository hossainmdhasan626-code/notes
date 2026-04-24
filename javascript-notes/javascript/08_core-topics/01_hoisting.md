# 🏗️ Hoisting & TDZ — বিস্তারিত নোট

> Variables & Scope নোটে (`01_variables-scope.md`) Hoisting-এর summary আছে।
> এখানে আরও গভীরে গেছি — errors, edge cases, interview tricks সব।

---

## ১. Hoisting কীভাবে কাজ করে?

JS engine কোড run করার আগে দুইটা phase-এ কাজ করে:

1. **Creation Phase** → সব declaration মেমোরিতে তুলে নেয় (Hoisting এখানেই হয়)
2. **Execution Phase** → কোড লাইন বাই লাইন run করে

```js
// আমরা যা লিখি:
console.log(name);
var name = "Hasan";

// JS ইঞ্জিন যেভাবে দেখে:
var name;           // Creation Phase-এ উপরে চলে গেছে
console.log(name);  // undefined — কারণ value এখনো আসেনি
name = "Hasan";     // Execution Phase-এ value বসে
```

---

## ২. `var` Hoisting

```js
console.log(a); // undefined (এরর না!)
var a = 10;
console.log(a); // 10
```

---

## ৩. `let` & `const` Hoisting + TDZ

```js
// console.log(b); ❌ ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

`let`/`const` ও hoist হয়, কিন্তু **Temporal Dead Zone (TDZ)**-এ থাকে।

```
[Script শুরু] ----TDZ শুরু---- [let b = 20 লাইনে] ----TDZ শেষ----
                 ❌ এখানে b ধরলে ReferenceError
```

---

## ৪. Function Hoisting

### Function Declaration — পুরোপুরি হোস্টেড

```js
sayHi(); // ✅ "Hi!" — আগে call করলেও কাজ করে!

function sayHi() {
  console.log("Hi!");
}
```

### Function Expression — হোস্টেড না

```js
// sayHello(); ❌ TypeError: sayHello is not a function (var দিয়ে হলে)
// sayHello(); ❌ ReferenceError (let/const দিয়ে হলে)

var sayHello = function() {
  console.log("Hello!");
};

sayHello(); // ✅ এখন কাজ করবে
```

### Arrow Function — হোস্টেড না

```js
// greet(); ❌ TypeError
const greet = () => console.log("Hey!");
greet(); // ✅
```

---

## ৫. Error Types — কোনটায় কোন Error?

```js
// ReferenceError — let/const-কে TDZ-এ access করলে
try {
  console.log(myName);
} catch (err) {
  console.log(err.name); // "ReferenceError"
}
let myName = "Hasan";

// SyntaxError — const-এ value না দিলে (কোড চলবেই না!)
// const PI; ❌ SyntaxError: Missing initializer in const declaration

// TypeError — var function expression আগে call করলে
// sayHello(); ❌ TypeError: sayHello is not a function
var sayHello = function() {};
```

| Error | কখন হয় |
|-------|---------|
| `ReferenceError` | `let`/`const` TDZ-এ access করলে |
| `SyntaxError` | `const` declare করার সময় value না দিলে |
| `TypeError` | `var` function expression আগে call করলে |

---

## ৬. Class Hoisting

```js
// const obj = new MyClass(); ❌ ReferenceError — TDZ-এ থাকে!

class MyClass {
  constructor() { this.name = "Hasan"; }
}

const obj = new MyClass(); // ✅
```

> Class-ও `let`/`const`-এর মতো TDZ-এ থাকে।

---

## ৭. Tricky Interview Question

```js
var x = 1;
function test() {
  console.log(x); // কী আসবে?
  var x = 2;
  console.log(x); // কী আসবে?
}
test();
```

**উত্তর:**
```
undefined  ← ফাংশনের ভেতরের var x হোস্ট হয়েছে, কিন্তু value আসেনি
2
```

> ফাংশনের ভেতরের `var x` হোস্টেড হয়ে বাইরের `x = 1`-কে shadow করে ফেলেছে।

---

## 🎯 Interview Tips

- Hoisting মানে "কোড উপরে চলে যাওয়া" না — মানে **Creation Phase-এ মেমোরি বরাদ্দ হওয়া**।
- `var` = hoist হয় + `undefined` থাকে।
- `let`/`const` = hoist হয় কিন্তু TDZ-এর কারণে access করা যায় না।
- Function Declaration = পুরোপুরি hoist হয়।
- Function Expression/Arrow = hoist হয় না।
- Class = TDZ-এ থাকে (`let`/`const` এর মতো)।
- Hoisting কেন হয়? **Creation Phase** এর কারণে।
