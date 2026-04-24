# ⏳ While & Do-While Loop

---

## ১. While Loop — Entry-Controlled

> "যতক্ষণ condition `true` থাকবে, ততক্ষণ চলবে।"
> কাজ শুরু করার **আগে** condition চেক করে।

```js
let count = 1;

while (count <= 5) {
  console.log("Counting:", count);
  count++; // ⚠️ এটা না দিলে Infinite Loop হবে!
}
```

**৪টি ধাপ:**
1. **Initialization** — `let count = 1` (লুপের বাইরে)
2. **Condition** — `count <= 5` (লুপের হেডে)
3. **কাজ** — body-র ভেতরে
4. **Update** — `count++` (না দিলে অনন্তকাল চলবে!)

---

## ২. কখন While ব্যবহার করব?

যখন জানি না লুপ কতবার চলবে।

```js
// একটা সংখ্যাকে যতক্ষণ 1-এর বেশি থাকে, ততক্ষণ 2 দিয়ে ভাগ করা
let val = 100;
while (val > 1) {
  console.log("Current:", val);
  val = Math.floor(val / 2); // 100 → 50 → 25 → 12 → 6 → 3 → 1
}
```

---

## ৩. Do-While Loop — Exit-Controlled

> **আগে একবার চালায়, তারপর condition চেক করে।**
> মানে হলো — কমপক্ষে একবার তো চলবেই।

```js
let i = 10;

do {
  console.log("চলছে:", i); // একবার চলবেই, condition false হলেও!
  i++;
} while (i < 5); // condition false — কিন্তু উপরে একবার চলে গেছে
```

---

## ৪. While vs Do-While — পার্থক্য

| | `while` | `do...while` |
|---|---------|-------------|
| Condition check | আগে | পরে |
| Minimum চলে | 0 বার | 1 বার |
| কখন দরকার | সাধারণ কাজে | অন্তত একবার চালাতে হলে |

```js
// Example: User Input যতক্ষণ সঠিক না হয়
let password;
do {
  password = prompt("পাসওয়ার্ড দাও:"); // কমপক্ষে একবার জিজ্ঞেস করবেই
} while (password !== "12345");
```

---

## 🎯 Interview Tips

- `for` loop → কতবার চলবে জানা থাকলে।
- `while` loop → কতবার চলবে জানা নেই, কিন্তু নাও চলতে পারে।
- `do...while` loop → কমপক্ষে একবার চালাতেই হবে।
- Infinite loop এড়াতে সবসময় update step দিতে ভুলবি না।
