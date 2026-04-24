# 🧰 Array Methods — মাস্টার নোট

---

## 🔥 High Priority — সবচেয়ে বেশি ব্যবহৃত

### `map()` — বদলে নতুন Array বানায়

```js
const data = [10, 20, 30];
const result = data.map(x => x + 5);
console.log(result); // [15, 25, 35]
// অরিজিনাল array ঠিক থাকে ✅
// সবসময় same length-এর array দেয়
```

---

### `filter()` — শর্ত অনুযায়ী ছেঁকে দেয়

```js
const data = [10, 20, 30];
const result = data.filter(x => x > 15);
console.log(result); // [20, 30]
// অরিজিনাল array ঠিক থাকে ✅
```

---

### `reduce()` — সব একজায়গায় জমা করে

```js
const cart = [100, 200, 300];
const total = cart.reduce((acc, curr) => acc + curr, 0);
console.log(total); // 600

// acc = accumulator (জমানো মান), curr = current (এখনকার item)
// 0 হলো শুরুর মান — না দিলে ১ম item শুরুর মান হয়

// সর্বোচ্চ বের করা
const max = cart.reduce((a, b) => Math.max(a, b)); // 300
```

---

### `find()` & `findIndex()` — প্রথম match খোঁজে

```js
const users = [{ id: 1, name: "Hasan" }, { id: 2, name: "Ali" }];

users.find(u => u.id === 1);        // { id: 1, name: "Hasan" }
users.findIndex(u => u.name === "Ali"); // 1

// না পেলে: find() → undefined, findIndex() → -1
```

---

### `forEach()` — শুধু loop করে, return করে না

```js
const names = ["Hasan", "Abir", "Tarek"];
names.forEach((name, index) => {
  console.log(`${index}: ${name}`);
});
// কিছু return করে না — side effect-এর জন্য ব্যবহার করো
```

---

### `includes()` — আছে কিনা চেক করে

```js
const ages = [18, 20, 25];
console.log(ages.includes(20)); // true
console.log(ages.includes(99)); // false
```

---

### `some()` & `every()` — condition চেক

```js
const ages = [18, 20, 25];

ages.some(age => age > 24);  // true — অন্তত একজন ২৪-এর বড়
ages.every(age => age > 15); // true — সবাই ১৫-এর বড়
ages.every(age => age > 20); // false — সবাই না
```

---

### `slice()` — কেটে নতুন Array দেয় (অরিজিনাল বদলায় না)

```js
const items = ["A", "B", "C", "D"];
console.log(items.slice(1, 3)); // ["B", "C"] — ১ থেকে ৩-এর আগ পর্যন্ত
console.log(items.slice(-2));   // ["C", "D"] — শেষের ২টি
// React-এ immutable copy বানাতে খুব লাগে ✅
```

---

### `splice()` — কেটে/বসিয়ে অরিজিনাল বদলায়

```js
const colors = ["Red", "Green", "Blue"];
colors.splice(1, 1, "Yellow"); // ১ নম্বর index থেকে ১টি বাদ দিয়ে Yellow বসাও
console.log(colors); // ["Red", "Yellow", "Blue"]

// (index, কয়টা কাটবে, কী বসাবে)
// যা delete হলো সেটা return করে
```

---

## 🧊 Lower Priority — দরকার হলে শেখো

### `sort()` — সাজানো

```js
const nums = [10, 2, 100, 1];
nums.sort((a, b) => a - b); // [1, 2, 10, 100] — ascending

const names = ["Zayan", "Abir", "Hasan"];
names.sort((a, b) => a.localeCompare(b)); // ["Abir", "Hasan", "Zayan"]

// ⚠️ sort() অরিজিনাল array বদলে দেয়!
// localeCompare() ছাড়া string sort ঠিকমতো হয় না
```

---

### `flat()` & `flatMap()` — Nested array ভাঙা

```js
const nest = [1, [2, 3], [4, [5]]];
console.log(nest.flat());    // [1, 2, 3, 4, [5]] — ১ লেভেল ভাঙে
console.log(nest.flat(2));   // [1, 2, 3, 4, 5] — ২ লেভেল ভাঙে
console.log(nest.flat(Infinity)); // সব লেভেল ভাঙে

// flatMap = map + flat(1)
const words = ["Hello World", "JS is Fun"];
words.flatMap(str => str.split(" ")); // ["Hello", "World", "JS", "is", "Fun"]
```

---

### `at()` — index দিয়ে item আনা (negative support করে)

```js
const fruits = ["Apple", "Mango", "Banana"];
fruits.at(0);   // "Apple"
fruits.at(-1);  // "Banana" — শেষেরটা
// fruits[-1] দিলে undefined — at() use করো ✅
```

---

### `toSpliced()` & `toSorted()` & `with()` — ES2023 Immutable versions

```js
const list = [1, 2, 3];

// toSpliced — অরিজিনাল ঠিক রেখে নতুন array
list.toSpliced(1, 1, 10); // [1, 10, 3]

// toSorted — অরিজিনাল ঠিক রেখে sort
[3, 1, 2].toSorted((a, b) => a - b); // [1, 2, 3]

// with — একটা index বদলে নতুন array
["A", "B", "C"].with(1, "Z"); // ["A", "Z", "C"]
```

---

### Static Methods

```js
Array.isArray([1, 2]);  // true — array কিনা চেক করে
Array.from("ABC");      // ["A", "B", "C"] — string/object থেকে array বানায়
Array.from({length: 3}, (_, i) => i); // [0, 1, 2]
```

---

## 📊 Mutates করে vs করে না — এক নজরে

| করে না (Immutable) ✅ | করে (Mutates) ⚠️ |
|----------------------|------------------|
| `map`, `filter`, `reduce` | `splice`, `sort`, `push`, `pop` |
| `slice`, `find`, `findIndex` | `reverse`, `fill` |
| `flat`, `flatMap`, `at` | |
| `toSpliced`, `toSorted`, `with` | |

> 💡 React-এ সবসময় **Immutable** method ব্যবহার করো।

---

## 🎯 Interview Tips

- `map` vs `forEach` → `map` নতুন array return করে, `forEach` করে না।
- `find` vs `filter` → `find` একটা দেয়, `filter` সব দেয়।
- `slice` vs `splice` → `slice` অরিজিনাল ঠিক রাখে, `splice` বদলায়।
- `some` vs `every` → `some` = যেকোনো একটা, `every` = সব।
- `reduce`-এর ২য় argument (initial value) না দিলে প্রথম item হয় starting value।
