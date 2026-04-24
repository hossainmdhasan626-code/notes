# ⚛️ কেন React? — Why React

---

## ১. React কোন সমস্যার সমাধান করে?

Raw JS-এ যখন data বদলায়, UI নিজে নিজে বদলায় না। ডেভেলপারকে হাতে ধরে বলতে হয়।

```js
// Raw JS — প্রতিটা কাজ হাতে করতে হয়
const countEl = document.getElementById('count');
let count = 0;

document.getElementById('btn').addEventListener('click', () => {
  count++;
  countEl.innerText = count; // UI update হাতে করতে হচ্ছে 😩
  // আরো ১০ জায়গায় count দেখালে — ১০ জায়গায় update করতে হবে!
});
```

```jsx
// React — শুধু state বদলাও, UI নিজে বদলায় ✅
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>Click</button>
// count যেখানেই দেখানো হোক, সব জায়গায় অটো update 🎉
```

---

## ২. Raw JS-এর ৩টা মূল সমস্যা

```js
const theProblemOfRawJS = {
  manualDOM: "প্রতিটা click-এ কোথায় কোথায় UI বদলাবে হাতে ধরে বলতে হয়",
  syncIssue: "Data আর UI sync রাখা কঠিন — একটা বদলালে অন্যটা মিস হয়",
  codeSpaghetti: "Project বড় হলে কোড জটিল 'Spaghetti' হয়ে যায়",
};
```

---

## ৩. React-এর ৩টা সমাধান

```js
const theReactSolution = {
  stateDriven: "শুধু State update করো — UI অটোমেটিক re-render হয়",
  virtualDOM: "আসল DOM-এ না গিয়ে Virtual copy-তে চেক করে — শুধু দরকারী অংশ update",
  oneWayDataFlow: "Data একমুখী — Debug করা সহজ",
};
```

---

## ৪. React-এর মূল Concept

### Declarative vs Imperative

```js
// Imperative (Raw JS) — "কীভাবে" করতে হবে বলো
const el = document.getElementById('title');
el.innerText = "New Title";
el.style.color = "red";

// Declarative (React) — "কী" দেখাতে হবে বলো
<h1 style={{ color: "red" }}>New Title</h1>
// React নিজেই বের করে "কীভাবে" করতে হবে
```

### Component-Based — ছোট ছোট টুকরো

```jsx
// পুরো page ছোট ছোট reusable টুকরো দিয়ে তৈরি
<Page>
  <Navbar />
  <ProductList />
  <Cart />
  <Footer />
</Page>
```

---

## ৫. React-এর মূল Mission

```js
const theMainMission = {
  problem:  "Manual DOM Updates — হাতে ধরে সব জায়গায় data পাল্টানো",
  solution: "Reactivity — State পাল্টালে সব জায়গায় অটো update",
  benefit:  "Developer UI নিয়ে ভাবে না, শুধু data আর logic নিয়ে ভাবে",
};
```

---

## ৬. Reconciliation — React-এর Engine

```
State বদলায়
    ↓
নতুন Virtual DOM তৈরি হয়
    ↓
Diffing Algorithm → পুরনো vs নতুন তুলনা করে
    ↓
শুধু যা বদলেছে সেটুকু Real DOM-এ update হয়
    ↑ এই পুরো process-এর নাম Reconciliation
```

---

## 🎯 Interview Tips

- React কেন ব্যবহার করো? → "State-to-UI Sync Problem" সমাধান করতে।
- Declarative UI → "কী" দেখাবো বলি, React বের করে "কীভাবে"।
- Component-based → Reusable, maintainable।
- Reconciliation → Virtual DOM diff করে শুধু প্রয়োজনীয় অংশ update করে।
- One-way data flow → Data parent থেকে child-এ যায়, উল্টো না।
