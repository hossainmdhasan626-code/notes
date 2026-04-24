# 📦 Variables, Scope, Hoisting & TDZ

---

## ১. Variable Declaration — `var` vs `let` vs `const`

```js
var x = 1;   // ফাংশন স্কোপ, redeclare করা যায় ✅ (বিপজ্জনক!)
let y = 2;   // ব্লক স্কোপ, redeclare করা যায় না ❌, reassign করা যায় ✅
const z = 3; // ব্লক স্কোপ, redeclare ❌, reassign ❌
```

**এক নজরে পার্থক্য:**

| ভেরিয়েবল | Scope | Redeclare? | Re-assign? |
|-----------|-------|-----------|------------|
| `var` | Function | ✅ হ্যাঁ | ✅ হ্যাঁ |
| `let` | Block | ❌ না | ✅ হ্যাঁ |
| `const` | Block | ❌ না | ❌ না |

> ⚠️ আধুনিক JS-এ সবসময় `let` আর `const` ব্যবহার কর। `var` এড়িয়ে চল।

---

## ২. Scope — ভেরিয়েবলের এলাকা

### Global Scope
```js
let globalUser = "Hasan";

function showUser() {
  console.log(globalUser); // ✅ কাজ করবে — global ভেরিয়েবল যেকোনো জায়গা থেকে দেখা যায়
}
```

### Function Scope (`var` এর এলাকা)
```js
function sayHello() {
  var message = "Hello from function";
  console.log(message); // ✅ ভেতরে কাজ করবে
}
// console.log(message); ❌ ReferenceError — বাইরে দেখা যাবে না
```

### Block Scope (`let` & `const` এর এলাকা)
```js
if (true) {
  var canLeak = "আমি বাইরে যাব";      // var ব্লক মানে না 😱
  let cannotLeak = "আমি ভেতরেই থাকব"; // let ব্লক মানে ✅
  const stayHere = "আমিও ভেতরেই";    // const ব্লক মানে ✅
}

console.log(canLeak);    // ✅ "আমি বাইরে যাব"
// console.log(cannotLeak); ❌ ReferenceError
```

### Lexical Scope (Child, Parent-কে চেনে)
```js
function parentFunc() {
  let parentName = "Hasan Mahmud";

  function childFunc() {
    // নিজের কাছে না পেয়ে বাইরের স্কোপ থেকে খুঁজে আনে
    console.log(parentName); // ✅ "Hasan Mahmud"
  }
  childFunc();
}
```

> 📌 এই Lexical Scope এর কারণেই **Closure** কাজ করে — পরের নোটে বিস্তারিত আছে।

---

## ৩. Shadowing — একই নামের ভেরিয়েবল

```js
let name = "Global Hasan";

if (true) {
  let name = "Block Abir"; // বাইরের 'name' কে ব্লক করে দিয়েছে
  console.log(name); // "Block Abir"
}
console.log(name); // "Global Hasan" — বাইরেরটা আগের মতোই আছে ✅
```

---

## ৪. Hoisting — কোড চলার আগে যা হয়

JS ইঞ্জিন কোড run করার আগে সব declaration মেমোরিতে তুলে নেয়। এটিই Hoisting।

### `var` এর Hoisting
```js
console.log(a); // undefined (এরর না! কারণ hoisted হয়েছে কিন্তু value আসেনি)
var a = 10;
```

> 💬 "নামটা জানে কিন্তু মানটা চিনে না" — `var` এর hoisting এভাবে মনে রাখ।

### `let` / `const` এর Hoisting + TDZ
```js
// console.log(b); ❌ ReferenceError: Cannot access 'b' before initialization
let b = 20;
```

`let` আর `const` ও hoist হয়, কিন্তু **Temporal Dead Zone (TDZ)** এ থাকে।
মানে হলো — ডিক্লেয়ার করার আগ পর্যন্ত ওই ভেরিয়েবল ধরা যাবে না।

### Function Declaration Hoisting
```js
sayHi(); // ✅ "Hello!" — আগে call করলেও কাজ করে!

function sayHi() {
  console.log("Hello!");
}
```

### Function Expression Hoisting করে না
```js
// sayHello(); ❌ TypeError — var দিয়ে লেখা হলে 'undefined' হবে, function না
var sayHello = function () {
  console.log("Hi!");
};
```

---

## ৫. TDZ — Temporal Dead Zone

TDZ হলো সেই সময়টুকু, যখন ভেরিয়েবল hoist হয়েছে কিন্তু initialize হয়নি।

```js
// এই জায়গাটা TDZ — এখানে myName ধরলে ReferenceError
let myName = "Hasan"; // TDZ শেষ, এখন access করা যাবে
```

**দুইটা এরর মনে রাখ:**

| এরর | কখন হয় |
|-----|---------|
| `ReferenceError` | `let`/`const` কে TDZ-এ access করলে |
| `SyntaxError` | `const` ডিক্লেয়ার করার সময় value না দিলে (`const x;`) |

---

## ৬. Global Scope-এ `var` vs `let`/`const`

```js
var user = "Hasan"; // window.user হয়ে যায় 😱 (Global Pollution)
let age = 25;       // window-এ যায় না, নিরাপদ ✅
const city = "Dhaka"; // window-এ যায় না, নিরাপদ ✅
```

> 🏆 **Best Practice:** গ্লোবাল ভেরিয়েবল বানানোর সময়ও `let` বা `const` ব্যবহার কর।
> `var` ব্যবহার করলে অন্য কোনো স্ক্রিপ্ট বা লাইব্রেরি ভুলে তোমার ভেরিয়েবল বদলে দিতে পারে — এটাকে বলে **Global Namespace Pollution**।

---

## 🎯 Interview Tips

- আধুনিক JS-এ `var` ব্যবহার করা উচিত না — `let` ও `const` ব্যবহার কর।
- `var` কেন বিপজ্জনক? কারণ সে ব্লক স্কোপ মানে না (Variable Leaking)।
- Lexical scope এর কারণেই চাইল্ড ফাংশন প্যারেন্ট স্কোপের ডাটা দেখতে পায়।
- `var` = hoist হয় + `undefined` থাকে।
- `let`/`const` = hoist হয় কিন্তু TDZ এর কারণে Error দেয়।
- Regular Function = পুরোপুরি hoist হয়, আগে call করা যায়।
- Arrow Function/Expression = hoist হয় না।
