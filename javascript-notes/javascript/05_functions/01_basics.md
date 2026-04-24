# 🔧 Functions — Basics, Parameters & Return

---

## ১. Function Declaration — Blueprint তৈরি

```js
function checkEven(number) {
  if (number % 2 === 0) {
    console.log(number + " is Even");
  } else {
    console.log(number + " is Odd");
  }
}

checkEven(10); // "10 is Even"
```

> 💡 ফাংশন একটি Blueprint-এর মতো। একবার লিখে রাখো, বারবার ব্যবহার করো।

---

## ২. Parameter vs Argument — পার্থক্য

```js
function userProfile(name, city) { // 'name', 'city' = Parameters (Placeholder)
  console.log("Name: " + name + ", City: " + city);
}

userProfile("Hasan", "Dhaka"); // "Hasan", "Dhaka" = Arguments (আসল মান)
```

- **Parameter** → ফাংশন বানানোর সময় দেওয়া নাম।
- **Argument** → ফাংশন call করার সময় পাঠানো আসল মান।

---

## ৩. কম Argument দিলে কী হয়?

```js
function test(a, b) {
  console.log("A is:", a);
  console.log("B is:", b);
}

test(5);
// A is: 5
// B is: undefined — b-এর জন্য কিছু না পেয়ে undefined ধরে নিয়েছে
```

---

## ৪. Default Parameter — না দিলে fallback

```js
function welcome(user = "Guest") {
  console.log("Welcome, " + user);
}

welcome();        // "Welcome, Guest"
welcome("Hasan"); // "Welcome, Hasan"
```

---

## ৫. Return Keyword — বাইরে পাঠানো

```js
function calculateTax(amount) {
  const tax = amount * 0.15;
  return tax; // মানটি বাইরে পাঠাচ্ছে
  console.log("এটা কখনো print হবে না"); // Dead Code — return এর পরে কিছু চলে না
}

const myTax = calculateTax(1000);
console.log("Tax:", myTax); // 150
```

> ⚠️ `return` পেলে ফাংশন সাথে সাথে থেমে যায়।
> `return` না দিলে ডিফল্টভাবে `undefined` রিটার্ন হয়।

---

## ৬. Function Expression — Variable-এ ফাংশন রাখা

```js
const getFullName = function(firstName, lastName) {
  return firstName + " " + lastName;
};

const myName = getFullName("Hasan", "Developer");
console.log(myName); // "Hasan Developer"
```

> 💡 Convention: Function Expression সবসময় `const` দিয়ে ডিক্লেয়ার করো।
> Hoisting হয় না — তাই আগে declare করো, পরে call করো।

---

## 🎯 Interview Tips

- Function Declaration = Hoisted ✅ (আগে call করা যায়)।
- Function Expression = Hoisted না ❌ (আগে declare করতে হবে)।
- Return ছাড়া function `undefined` দেয়।
- Parameter (placeholder) আর Argument (actual value) এক জিনিস না।
