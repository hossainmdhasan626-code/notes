# 🔁 For Loop — মাস্টার নোট

---

## ১. Basic Structure — গঠন

```js
for (initialization; condition; increment) {
  // কাজ
}
```

```js
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i); // 1, 2, 3, 4, 5
}
```

**৩টি অংশ:**
- **Initialization** (`let i = 1`) — লুপ কোথা থেকে শুরু হবে। একবারই চলে।
- **Condition** (`i <= 5`) — কতক্ষণ চলবে। `true` থাকলে চলতে থাকে।
- **Increment** (`i++`) — প্রতি চক্করে কতটুকু আগাবে।

---

## ২. Custom Steps — নিজের মতো করে বাড়ানো

```js
// ২ করে বাড়ানো (জোড় সংখ্যা)
for (let i = 0; i <= 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8, 10
}

// উল্টো দিক থেকে
for (let i = 10; i > 0; i--) {
  console.log(i); // 10, 9, 8... 1
}

// একসাথে দুই ভেরিয়েবল (Advanced)
for (let i = 0, j = 10; i <= 10; i++, j--) {
  console.log(`i: ${i}, j: ${j}`);
}
```

---

## ৩. Array দিয়ে Loop

```js
const fruits = ["Apple", "Banana", "Mango", "Orange"];

for (let i = 0; i < fruits.length; i++) {
  console.log(`Index ${i} এ আছে: ${fruits[i]}`);
}
```

---

## ৪. `break` & `continue` — লুপ নিয়ন্ত্রণ

```js
// break: সাথে সাথে থামিয়ে দেয়
for (let i = 1; i <= 10; i++) {
  if (i === 5) break;
  console.log(i); // 1, 2, 3, 4
}

// continue: এই চক্কর skip করে পরেরটায় যায়
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i); // 1, 2, 4, 5
}
```

---

## ৫. Nested Loop — লুপের ভেতর লুপ

```js
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}
```

> ⚠️ Nested loop বেশি গভীর হলে performance কমে যায়। সাবধানে ব্যবহার করবি।

---

## 🎯 Interview Tips

- `for` loop তখন ব্যবহার কর যখন জানিস লুপ কতবার চলবে।
- Array loop করতে `for...of` অনেক বেশি clean — পরের নোটে দেখ।
- `break` আর `continue` এর পার্থক্য জানা দরকার।
