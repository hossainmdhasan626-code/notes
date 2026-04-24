# 🔄 Callbacks & Higher-Order Functions (HOF)

---

## ১. সংজ্ঞা

- **Callback Function** → যে ফাংশনটি অন্য ফাংশনের argument হিসেবে পাস করা হয়।
- **Higher-Order Function (HOF)** → যে ফাংশনটি অন্য ফাংশনকে receive করে বা return করে।

```js
// greet = Callback
// executeTask = Higher-Order Function (HOF)

function greet(name) {
  console.log("Hello, " + name);
}

const executeTask = (userName, callback) => {
  console.log("Processing...");
  callback(userName); // এখন callback টা চলবে
};

executeTask("Hasan", greet); // "Processing..." → "Hello, Hasan"
```

---

## ২. Callback পাঠানোর ৩টি উপায়

```js
// ক. Regular Function পাস
executeTask("Hasan", notify);

// খ. Arrow Function পাস
executeTask("Hasan", silentNotify);

// গ. Anonymous Function (inline লিখে দেওয়া — সবচেয়ে বেশি ব্যবহৃত)
executeTask("Hasan", (name) => {
  console.log("Custom: " + name);
});
```

> ⚠️ Callback পাস করার সময় `notify()` না লিখে `notify` লিখো।
> `()` দিলে সাথে সাথে run হয়ে যাবে!

---

## ৩. HOF-এর আসল শক্তি — Dynamic Logic

```js
// একই function, আলাদা আলাদা কাজ করছে
const doMath = (a, b, operation) => operation(a, b);

const sum = (x, y) => x + y;
const sub = (x, y) => x - y;
const mul = (x, y) => x * y;

console.log(doMath(20, 10, sum)); // 30
console.log(doMath(20, 10, sub)); // 10
console.log(doMath(20, 10, mul)); // 200
```

> 💡 `doMath` ফাংশন একটাই, কিন্তু callback বদলে দিলে কাজ বদলে যায়। এটাই HOF-এর শক্তি।

---

## ৪. Built-in HOF — Array Methods

JS-এর built-in HOF গুলো এই concept-এর উপরেই দাঁড়িয়ে:

```js
const numbers = [1, 2, 3, 4, 5];

// .map() — প্রতিটি element বদলে নতুন array দেয়
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// .filter() — condition অনুযায়ী ছেঁকে দেয়
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]

// .forEach() — শুধু loop করে, কিছু return করে না
numbers.forEach(n => console.log(n));
```

---

## ৫. Callback Hell — সমস্যাটা কী?

Async কাজে একটার ভেতর আরেকটা callback দিতে দিতে code ডানে বেঁকে যায়:

```js
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      // এটাই Callback Hell 😱
      // দেখতে পিরামিডের মতো
    });
  });
});
```

> এই সমস্যার সমাধান হলো **Promise** আর **Async/Await** — `10_async-js/` ফোল্ডারে দেখ।

---

## 🎯 Interview Tips

- HOF = function নেয় বা function return করে।
- Callback = অন্য function-এ argument হিসেবে দেওয়া function।
- `map`, `filter`, `reduce`, `forEach` — সবই HOF।
- Callback পাঠানোর সময় কখনো `()` দিবি না।
