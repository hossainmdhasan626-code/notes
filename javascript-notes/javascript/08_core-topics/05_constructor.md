# 🏗️ Constructor Functions & ES6 Classes

---

## ১. Constructor কী এবং কেন?

Constructor হলো একটা স্পেশাল function যা নতুন object তৈরি করে।

**কেন দরকার?**
- **Reusability** → একই structure-এর অনেক object বানাতে।
- **Consistency** → সব object যেন same structure মেনে চলে।

---

## ২. Constructor Function (Old Way)

```js
// Convention: নাম PascalCase-এ দিতে হয়
function Device(name, brand) {
  this.name = name;
  this.brand = brand;
  this.turnOn = function() {
    console.log(this.name + " is turning on...");
  };
}

const laptop = new Device("MacBook", "Apple");
const phone  = new Device("Galaxy S24", "Samsung");

laptop.turnOn(); // "MacBook is turning on..."
phone.turnOn();  // "Galaxy S24 is turning on..."
```

---

## ৩. `new` Keyword কী করে?

```js
const laptop = new Device("MacBook", "Apple");
```

`new` দিলে পর্দার আড়ালে যা হয়:
1. একটা নতুন খালি object `{}` তৈরি হয়।
2. `this` ওই নতুন object-কে point করে।
3. Object-এর `__proto__` সেট হয় `Device.prototype`-এ।
4. ফাংশন শেষে নতুন object টি return হয়।

---

## ৪. Arrow Function দিয়ে Constructor হয় না

```js
const IllegalCon = (name) => { this.name = name; };
// const obj = new IllegalCon("Hasan"); ❌ TypeError!

// কারণ:
// - Arrow function-এর নিজস্ব 'this' নেই
// - new দিয়ে call করা যায় না
// - 'prototype' property নেই
```

---

## ৫. ES6 Class — Modern Way (Recommended ✅)

```js
class Member {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    return `${this.name} (${this.email})`;
  }
}

const m1 = new Member("Hasan", "hasan@dev.com");
console.log(m1.getInfo()); // "Hasan (hasan@dev.com)"
```

> Class হলো syntactic sugar — পর্দার আড়ালে Prototype-ই কাজ করছে।

---

## ৬. Class Inheritance — `extends` & `super`

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + " makes a sound.");
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Parent-এর constructor call করতেই হবে
    this.breed = breed;
  }

  speak() {
    console.log(this.name + " barks!");
  }
}

const d = new Dog("Rex", "Labrador");
d.speak(); // "Rex barks!" — override হয়েছে
```

---

## ৭. Static Method — Instance ছাড়াই call করা যায়

```js
class MathHelper {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathHelper.add(5, 3)); // 8 — new না করেই
// const m = new MathHelper(); m.add(5,3) ❌ কাজ করবে না
```

---

## ৮. JS Built-in Constructors

```js
const obj  = new Object();   // {} — অনুরোধ করে তৈরি
const arr  = new Array();    // []
const date = new Date();     // বর্তমান তারিখ ও সময়
const map  = new Map();      // Map data structure
const set  = new Set();      // Set data structure
```

---

## 🎯 Interview Tips

- Modern JS-এ Constructor Function-এর বদলে `class` ব্যবহার করো।
- `class` হলো syntactic sugar — পর্দার আড়ালে Prototype কাজ করছে।
- Arrow Function দিয়ে constructor বানানো যায় না।
- `new` কী করে? → empty object তৈরি, `this` bind, `prototype` set, return করে।
- `extends` → Inheritance, `super()` → Parent-এর constructor call।
- `static` method → instance ছাড়াই class থেকে সরাসরি call করা যায়।
