# 🖱️ DOM — Selectors & Events

---

## পার্ট ১: Selectors — Element ধরার উপায়

### 🔥 বেশি ব্যবহৃত

#### `querySelector()` — সবচেয়ে flexible

```js
const header = document.querySelector('#main-header'); // ID দিয়ে
const navItem = document.querySelector('.nav-link');   // Class দিয়ে (প্রথমটা)
const email = document.querySelector('input[name="email"]'); // Attribute দিয়ে
```

#### `querySelectorAll()` — সব match করা elements

```js
const buttons = document.querySelectorAll('.btn-primary');
buttons.forEach(btn => btn.style.borderRadius = "5px");
// NodeList দেয় → সরাসরি forEach চলে ✅
```

#### `getElementById()` — সবচেয়ে fast (ID-তে)

```js
const loginBtn = document.getElementById('login-btn');
loginBtn.innerText = "Log In Now";
```

---

### 🧊 কম ব্যবহৃত

```js
// getElementsByClassName — HTMLCollection দেয়, forEach কাজ করে না!
const cards = document.getElementsByClassName('card');
Array.from(cards).forEach(card => card.style.border = "1px solid red");

// getElementsByTagName
const allParagraphs = document.getElementsByTagName('p');
```

---

## পার্ট ২: addEventListener — Event শোনা

### 🔥 বেশি ব্যবহৃত Events

```js
const myBtn   = document.querySelector('#action-btn');
const myInput = document.querySelector('#user-input');
const myForm  = document.querySelector('#login-form');

// 'click' — মাউস ক্লিক
myBtn.addEventListener('click', (e) => {
  console.log("Clicked!", e.target); // e.target = যেটায় ক্লিক হয়েছে
});

// 'input' — টাইপ করার সাথে সাথে
myInput.addEventListener('input', (e) => {
  console.log("Value:", e.target.value);
});

// 'submit' — form submit
myForm?.addEventListener('submit', (e) => {
  e.preventDefault(); // পেজ reload আটকানো — মাস্ট!
  console.log("Form Submitted!");
});

// 'DOMContentLoaded' — HTML ready হলে
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM is ready!");
});
```

---

### 🧊 কম ব্যবহৃত Events

```js
// Hover effect
myBtn.addEventListener('mouseenter', () => myBtn.style.opacity = '0.7');
myBtn.addEventListener('mouseleave', () => myBtn.style.opacity = '1');

// Keyboard
window.addEventListener('keyup', (e) => {
  if (e.key === "Escape") console.log("Escape pressed!");
});

// Window resize
window.addEventListener('resize', () => {
  console.log("Width:", window.innerWidth);
});
```

---

## পার্ট ৩: DOM Manipulation — Data পরিবর্তন

```js
const box = document.querySelector('.box');

// classList — সবচেয়ে বেশি লাগে
box.classList.add('active');    // class যোগ
box.classList.remove('hidden'); // class বাদ
box.classList.toggle('dark');   // থাকলে বাদ, না থাকলে যোগ ✨
box.classList.contains('active'); // true/false

// Content পরিবর্তন
box.innerText = "নতুন লেখা";          // plain text
box.innerHTML = "<strong>Bold</strong>"; // HTML render করে

// Style
box.style.display    = 'flex';
box.style.marginTop  = '20px'; // CamelCase ব্যবহার করতে হয়
box.style.backgroundColor = 'red';

// Attributes
const link = document.querySelector('a');
link.setAttribute('href', 'https://google.com');
console.log(link.getAttribute('href'));
link.removeAttribute('target');
```

---

## পার্ট ৪: Element তৈরি ও যোগ করা

```js
// নতুন element তৈরি
const newDiv = document.createElement('div');
newDiv.className = 'card';
newDiv.innerText = "নতুন কার্ড";

// DOM-এ যোগ করা
document.body.appendChild(newDiv);          // শেষে যোগ
document.body.prepend(newDiv);              // শুরুতে যোগ
document.body.insertBefore(newDiv, refEl);  // নির্দিষ্ট জায়গায়

// Remove
newDiv.remove(); // নিজেকে সরিয়ে দেয়
```

---

## 🎯 Interview Tips

- `querySelector` vs `getElementById` → id-তে `getElementById` দ্রুত, কিন্তু `querySelector` বেশি flexible।
- `querySelectorAll` → NodeList (forEach কাজ করে), `getElementsByClassName` → HTMLCollection (forEach কাজ করে না)।
- `e.preventDefault()` → form submit বা link click-এর default behavior আটকায়।
- `innerText` vs `innerHTML` → `innerHTML` XSS attack-এর ঝুঁকি তৈরি করে — user input-এ সাবধান।
- `classList.toggle()` → UI toggle করতে সবচেয়ে clean solution।
