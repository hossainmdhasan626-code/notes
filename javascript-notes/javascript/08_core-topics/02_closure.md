# 🔒 Closure — ক্লোজার

---

## ১. Closure কী?

> "একটি ফাংশন যখন তার জন্মস্থানের (Parent Scope) ভেরিয়েবলগুলোকে পকেটে নিয়ে ঘোরে — এমনকি Parent ফাংশন শেষ হয়ে গেলেও — তাকে Closure বলে।"

এটা কোনো আলাদা syntax না, JS-এর একটা **স্বভাব (Nature)**।

---

## ২. Basic Example

```js
function greeting() {
  let message = "আসসালামু আলাইকুম"; // Parent-এর variable

  return function() {
    console.log(message); // ইনার ফাংশন 'message' মনে রেখেছে
  };
}

const sayHello = greeting();
sayHello(); // "আসসালামু আলাইকুম"
// greeting() শেষ হয়ে গেছে, কিন্তু message এখনো জীবিত — Closure!
```

---

## ৩. Dynamic Closure — কাস্টম ফাংশন বানানো

```js
function createMultiplier(factor) {
  return function(number) {
    return number * factor; // factor ক্লোজারের মাধ্যমে আসছে
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
// double আর triple দুইটা আলাদা closure — নিজস্ব factor আছে
```

---

## ৪. Data Privacy — Private Variable বানানো

Closure দিয়ে এমন variable বানানো যায় যেটা বাইরে থেকে কেউ সরাসরি বদলাতে পারবে না।

```js
function createCounter() {
  let count = 0; // বাইরে থেকে সরাসরি access নেই

  return {
    increment: function() {
      count++;
      console.log("Count:", count);
    },
    decrement: function() {
      count--;
      console.log("Count:", count);
    },
    getCount: function() {
      return count;
    }
  };
}

const myCounter = createCounter();
myCounter.increment(); // Count: 1
myCounter.increment(); // Count: 2
// console.log(count); ❌ ReferenceError — count private
console.log(myCounter.getCount()); // 2
```

---

## ৫. Arrow Function দিয়ে Closure — Cleaner Syntax

```js
const add = (a) => (b) => a + b;

const add5 = add(5);
console.log(add5(3)); // 8
console.log(add5(7)); // 12
```

---

## ৬. React-এ Closure

React-এর বেশিরভাগ hook closure-এর উপর নির্ভর করে।

```js
// useState-এ closure
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // handleClick একটি closure — 'count'-এর snapshot ধরে রাখে
    setTimeout(() => {
      alert(count); // ক্লিকের সময়ের count দেখাবে
    }, 3000);
  };

  return <button onClick={handleClick}>Alert</button>;
}
```

---

## ৭. Stale Closure — একটা কমন ভুল

```js
// ❌ ভুল — count সবসময় 0 দেখাবে
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // Stale Closure! সবসময় 0
  }, 1000);
  return () => clearInterval(timer);
}, []); // dependency empty

// ✅ সঠিক — count dependency-তে দাও
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // সঠিক count দেখাবে
  }, 1000);
  return () => clearInterval(timer);
}, [count]); // count বদলালে effect নতুন করে চলবে
```

---

## ৮. Best Practices

- দরকার না হলে ফাংশনের ভেতর ফাংশন রাখিস না — মেমোরি নষ্ট হয়।
- বিশাল data closure-এ ধরে রাখলে কাজ শেষে `null` করে দে — **Memory Leak** এড়াবে।
- React-এ `useEffect`-এ সব dependency দে, নইলে **Stale Closure** হবে।

---

## 🎯 Interview Tips

- Closure = function + তার birth scope-এর variable।
- Parent function শেষ হলেও closure-এর variable বেঁচে থাকে।
- Private variable বানাতে closure ব্যবহার হয়।
- Lexical Scoping-এর কারণেই closure কাজ করে।
- React-এর `useState`, `useEffect`, event handler — সবই closure।
- Stale Closure কী? `useEffect`-এ dependency না দিলে পুরনো value ধরে থাকা।
