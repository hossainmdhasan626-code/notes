# 📝 Function Expressions & Return

---

## ১. Function Expression vs Declaration

```js
// Declaration — Hoisted ✅
sayHi(); // আগে call করলেও কাজ করে!
function sayHi() {
  console.log("Hi!");
}

// Expression — Hoisted না ❌
// sayHello(); ← TypeError!
const sayHello = function() {
  console.log("Hello!");
};
sayHello(); // এখন call করা যাবে
```

---

## ২. Named vs Anonymous Function Expression

```js
// Anonymous (নাম নেই)
const greet = function() {
  console.log("Hello!");
};

// Named (নাম আছে — debugging-এ কাজে লাগে)
const greet2 = function sayGreeting() {
  console.log("Hello!");
};
```

---

## ৩. Conditional Return — শর্তসাপেক্ষে return

```js
function checkEligibility(age) {
  if (age >= 18) {
    return "Eligible for License";
  }
  return "Not Eligible"; // else লাগছে না কারণ আগেই return হয়ে যায়
}

console.log(checkEligibility(20)); // "Eligible for License"
console.log(checkEligibility(15)); // "Not Eligible"
```

---

## ৪. Function-এর ভেতর Function

```js
function outer() {
  function inner() {
    console.log("Inner function!");
  }
  inner(); // inner শুধু outer-এর ভেতর থেকে call করা যাবে
}

outer();   // ✅ কাজ করবে
// inner(); ❌ ReferenceError — বাইরে থেকে ধরা যাবে না
```

---

## 🎯 Interview Tips

- Function Expression কে সবসময় `const` দিয়ে declare করো।
- `return` মানে "ফাংশন এখানেই শেষ, এই মান নাও।"
- `return` ছাড়া function `undefined` return করে।
