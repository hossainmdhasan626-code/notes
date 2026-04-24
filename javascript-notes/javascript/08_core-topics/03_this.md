# 🎯 `this` Keyword — সম্পূর্ণ গাইড

---

## ১. `this` আসলে কী?

> "`this` হলো সেই object-কে point করে যে এই মুহূর্তে কাজটা করছে।"

সহজ কথায়: **"কে কাজটা করছে?"** — সেটাই `this`।

---

## ২. Global Context-এ `this`

```js
console.log(this); // Browser-এ: window object
```

---

## ৩. Object Method-এ `this` — সবচেয়ে স্বাভাবিক

```js
const user = {
  username: "Hasan",
  greet: function() {
    console.log("Hello, I am " + this.username);
    // this = user object
  }
};

user.greet(); // "Hello, I am Hasan"
```

---

## ৪. Nested Function-এর সমস্যা — `this` হারিয়ে যায়!

```js
const computer = {
  brand: "Apple",
  start: function() {
    // এখানে this = computer ✅
    const process = function() {
      console.log(this.brand);
      // ❌ এখানে this = window! (ভেতরের regular function window-কে ধরে)
    };
    process();
  }
};

computer.start(); // undefined
```

---

## ৫. Arrow Function — সমাধান! (Lexical `this`)

Arrow function-এর নিজস্ব `this` নেই। সে **Parent-এর `this`** ব্যবহার করে।

```js
const smartphone = {
  model: "iPhone",
  start: function() {
    const process = () => {
      console.log(this.model);
      // ✅ this = smartphone (parent-এর this ধার করেছে)
    };
    process();
  }
};

smartphone.start(); // "iPhone" ✅
```

---

## ৬. DOM Event Listener-এ `this`

```js
const btn = document.querySelector("button");

btn.addEventListener("click", function() {
  console.log(this); // this = button element ✅
  this.style.color = "red";
});

// Arrow function হলে this = window (parent context)
btn.addEventListener("click", () => {
  console.log(this); // this = window ❌ (DOM event-এ arrow ব্যবহার করবি না)
});
```

---

## ৭. Explicit Binding — জোর করে `this` সেট করা

`call()`, `apply()`, `bind()` দিয়ে বলে দেওয়া যায় `this` কে হবে।

```js
function showInfo(city) {
  console.log(this.name + " lives in " + city);
}

const person1 = { name: "Abir" };
const person2 = { name: "Hasan" };

// call() — সাথে সাথে call করে, argument আলাদা আলাদা দেয়
showInfo.call(person1, "Dhaka");       // "Abir lives in Dhaka"
showInfo.call(person2, "Narayanganj"); // "Hasan lives in Narayanganj"

// apply() — সাথে সাথে call করে, argument array-তে দেয়
showInfo.apply(person1, ["Dhaka"]);

// bind() — নতুন function return করে, পরে call করা যায়
const boundFunc = showInfo.bind(person1);
boundFunc("Chittagong"); // "Abir lives in Chittagong"
```

---

## ৮. Constructor Function-এ `this`

```js
function Player(name) {
  this.playerName = name; // this = নতুন object যেটা তৈরি হচ্ছে
}

const p1 = new Player("Sakib");
console.log(p1.playerName); // "Sakib"
```

---

## ৯. `this` Summary Table

| কোথায় ব্যবহার | `this` মানে কী |
|--------------|----------------|
| Global / একা | `window` object (browser) |
| Object Method | ওই নির্দিষ্ট object |
| Regular Function (ভেতরে) | `window` (strict mode-এ `undefined`) |
| Arrow Function | Parent-এর `this` (Lexical) |
| DOM Event (regular fn) | ওই HTML element |
| DOM Event (arrow fn) | `window` (সাবধান!) |
| Constructor (`new`) | নতুন তৈরি object |
| `call/apply/bind` | তুমি যা বলো তাই |

---

## 🎯 Interview Tips

- Arrow function-এর নিজস্ব `this` নেই — এটাই সবচেয়ে গুরুত্বপূর্ণ।
- DOM event listener-এ Arrow function ব্যবহার করলে `this` হবে `window`, element না।
- `call` = সাথে সাথে চলে, arg আলাদা।
- `apply` = সাথে সাথে চলে, arg array-তে।
- `bind` = নতুন function তৈরি করে, পরে চালানো যায়।
- Constructor-এ `new` দিলে `this` = নতুন object।
