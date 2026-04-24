# 🫧 Event Propagation, Bubbling & Delegation

---

## ১. Event Propagation — ইভেন্টের যাতায়াত

কোনো element-এ click হলে event ৩ ধাপে চলে:

```
Window
  ↓ (Capturing Phase — উপর থেকে নিচে)
Document
  ↓
div.parent
  ↓
button.child ← (Target Phase — আসল যেখানে click হয়েছে)
  ↑
div.parent
  ↑ (Bubbling Phase — নিচ থেকে উপরে) ← সবচেয়ে বেশি ব্যবহৃত
Window
```

> JS-এ ডিফল্টভাবে সব event **Bubble** করে (নিচ থেকে উপরে)।

---

## ২. Event Bubbling — নিচ থেকে উপরে ওঠা

```js
const parent = document.querySelector('.parent');
const child  = document.querySelector('.child');

child.addEventListener('click', (e) => {
  console.log("Child Clicked! 👦");
});

parent.addEventListener('click', (e) => {
  console.log("Parent Clicked! 👨 (Due to Bubbling)");
});

// child-এ click করলে output:
// "Child Clicked! 👦"
// "Parent Clicked! 👨 (Due to Bubbling)" ← bubble হয়ে parent-এও গেছে
```

---

## ৩. `stopPropagation()` — Bubbling থামানো

```js
child.addEventListener('click', (e) => {
  e.stopPropagation(); // ⛔ উপরে আর যাবে না
  console.log("Child Only! No Bubbling.");
});

// এখন parent-এর listener fire হবে না
```

**কখন দরকার?** Modal বা Dropdown বন্ধ করার লজিক-এ:
```js
// Modal background-এ click করলে বন্ধ হবে
document.querySelector('.modal-overlay').addEventListener('click', closeModal);

// কিন্তু modal-এর ভেতরে click করলে বন্ধ হবে না
document.querySelector('.modal-content').addEventListener('click', (e) => {
  e.stopPropagation(); // bubble উপরে যাবে না → overlay-এর listener fire হবে না
});
```

---

## ৪. Event Delegation — স্মার্ট কৌশল 🏆

১০০টি `<li>`-তে আলাদা আলাদা listener না দিয়ে শুধু parent `<ul>`-কে listener দেওয়া।

```js
const listParent = document.querySelector('#todo-list');

listParent.addEventListener('click', (e) => {
  // e.target = যেটায় আসলে click হয়েছে
  if (e.target.tagName === 'LI') {
    console.log("Clicked:", e.target.innerText);
    e.target.classList.toggle('completed');
  }
});
```

**কেন দরকার?**
- মেমোরি বাঁচে — ১টি listener বনাম ১০০টি।
- নতুন `<li>` dynamically যোগ করলেও কাজ করবে ✅।

---

## ৫. Capturing Phase — উপর থেকে নিচে

```js
// 3rd argument true দিলে Capturing phase-এ কাজ করে
parent.addEventListener('click', () => {
  console.log("Capturing: Parent"); // child-এর আগে fire হবে
}, true);

child.addEventListener('click', () => {
  console.log("Target: Child");
});

// Output order: "Capturing: Parent" → "Target: Child"
```

> এটা খুব কম ব্যবহৃত হয়, তবে interview-এ জিজ্ঞেস করে।

---

## ৬. Summary Table

| টপিক | কাজ কী | কেন শিখবো |
|------|--------|-----------|
| Propagation | ইভেন্টের পুরো যাত্রার map | Browser কীভাবে event handle করে বুঝতে |
| Bubbling | নিচ থেকে উপরে ওঠা | ডিফল্ট behavior, সবসময় হয় |
| Delegation | parent-কে দায়িত্ব দেওয়া | Performance ও dynamic elements |
| stopPropagation | bubbling আটকানো | Modal/Dropdown logic |

---

## 🎯 Interview Tips

- ডিফল্টভাবে events **bubble** করে — capturing করে না।
- `stopPropagation()` → bubbling থামায়।
- `preventDefault()` → default browser action থামায় (form submit, link click)।
- Event Delegation → performance-এর জন্য best practice।
- React-এ `e.stopPropagation()` একইভাবে কাজ করে।
- `e.target` = যেটায় click হয়েছে, `e.currentTarget` = যেটায় listener আছে।
