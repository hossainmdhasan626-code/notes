# 🧬 Prototype & Prototype Chain

---

## ১. Prototype কী?

> JavaScript-এ প্রতিটা object-এর একটা গোপন লিংক থাকে তার parent object-এর দিকে।
> সেই লিংকই হলো **Prototype**।
>
> কোনো property না পেলে JS নিজে থেকে সেই লিংক ধরে উপরে উঠতে থাকে খুঁজতে।

---

## ২. Data Lookup — নিচ থেকে উপরে

JS-এ ডাটা খোঁজার নিয়ম: **Bottom → Top (Child → Parent → Grandparent → Object.prototype → null)**

```js
const human = {
  canTalk: true,
  greet() { console.log("Hello!"); }
};

const robot = {
  brand: "Tesla",
  work() { console.log("Working..."); }
};

// robot-এর parent বানালাম human-কে
Object.setPrototypeOf(robot, human);

const worker = {
  name: "Hasan",
  profession: "Dev"
};

// worker-এর parent বানালাম robot-কে
Object.setPrototypeOf(worker, robot);
```

```
worker → robot → human → Object.prototype → null
```

---

## ৩. Property Lookup ধাপে ধাপে

```js
console.log(worker.name);    // "Hasan" — নিজের কাছে পেয়েছে ✅
console.log(worker.brand);   // "Tesla" — parent (robot) থেকে এসেছে ✅
console.log(worker.canTalk); // true — grandparent (human) থেকে এসেছে ✅
console.log(worker.salary);  // undefined — কোথাও নেই, chain শেষে undefined ✅
```

**`worker.canTalk` খোঁজার ধাপ:**
1. `worker` নিজের কাছে? ❌ নেই
2. `worker.__proto__` (robot)? ❌ নেই
3. `robot.__proto__` (human)? ✅ পেয়েছি! `true` রিটার্ন।

---

## ৪. Property Shadowing — কাছেরটাই জেতে

```js
const boss = { name: "Boss" };
Object.setPrototypeOf(boss, human);

boss.canTalk = false; // নিজের কাছে রাখলো (Shadowing)

console.log(boss.canTalk); // false — নিজেরটা পেয়েছে, উপরে যায়নি
```

---

## ৫. `__proto__` vs `prototype` — পার্থক্য

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log("Hi, I am " + this.name);
};

const p = new Person("Hasan");
p.greet(); // "Hi, I am Hasan"

// Person.prototype → সব instance এই থেকে inherit করবে
// p.__proto__ === Person.prototype → true
```

- **`prototype`** → Function-এর property। `new` করলে instance এটা inherit করে।
- **`__proto__`** → Object-এর গোপন লিংক। Parent-কে point করে।

---

## ৬. Built-in Prototype Chain

```js
const arr = [1, 2, 3];

// arr নিজের কাছে push নেই, কিন্তু কোথায় পায়?
// arr → Array.prototype (এখানে push আছে!) → Object.prototype → null
```

> এই কারণেই array-তে `.map()`, `.filter()`, `.push()` সব পাওয়া যায় — সব **Array.prototype**-এ আছে।

---

## ৭. `hasOwnProperty()` — নিজের না parent-এর?

```js
console.log(worker.hasOwnProperty("name"));    // true — নিজের
console.log(worker.hasOwnProperty("canTalk")); // false — parent-এর
```

---

## 🎯 Interview Tips

- JS-এ inheritance হয় Prototype Chain দিয়ে, Class দিয়ে না (class হলো syntactic sugar)।
- Chain-এর শেষে থাকে `Object.prototype`, তারপর `null`।
- খোঁজা সবসময় **নিচ থেকে উপরে** — parent কখনো child-কে চেনে না।
- property কোথাও না পেলে `undefined` রিটার্ন করে — error না।
- `hasOwnProperty()` দিয়ে বুঝতে পারবি property নিজের না inherited।
- Single Inheritance — এক object-এর সরাসরি parent একটাই।
