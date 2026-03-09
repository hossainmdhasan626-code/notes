/**
 * 🚀 JavaScript Object: Methods & Manipulation (Master Note)
 * Author: Hasan
 * Topics: CRUD, Destructuring, Spread, Modern Static Methods
 */

// =========================================================
// ১. Object.keys(obj) [ES5]
// বিবরণ: অবজেক্টের সব 'Key' বা প্রপার্টি নামগুলোকে একটি অ্যারে হিসেবে দেয়।
// =========================================================
const user = { id: 101, name: "Hasan", role: "Dev" };
console.log(Object.keys(user)); // ["id", "name", "role"]

// Example 2: লুপ চালিয়ে চেক করা কয়টি ডাটা আছে
const car = { brand: "Toyota", model: "Corolla" };
if (Object.keys(car).length > 0) { console.log("Data exists!"); }

// খুঁটিনাটি: এটি শুধু 'enumerable' প্রপার্টিগুলো দেয়। প্রোটোটাইপ চেইনের ডাটা দেয় না।


// =========================================================
// ২. Object.values(obj) [ES2017]
// বিবরণ: অবজেক্টের সব 'Value' গুলোকে একটি অ্যারে হিসেবে দেয়।
// =========================================================
const prices = { apple: 100, orange: 200 };
console.log(Object.values(prices)); // [100, 200]

// Example 2: সব ভ্যালুর যোগফল বের করা (অ্যারে মেথড ব্যবহার করে)
const total = Object.values(prices).reduce((a, b) => a + b, 0); 
console.log(total); // 300


// =========================================================
// ৩. Object.entries(obj) [ES2017]
// বিবরণ: [key, value] জোড়ায় জোড়ায় একটি নেস্টেড অ্যারে দেয়।
// =========================================================
const settings = { theme: "dark", notifications: true };
console.log(Object.entries(settings)); // [["theme", "dark"], ["notifications", true]]

// Example 2: অবজেক্টকে লুপ করে ডাটা প্রিন্ট করা (React এ খুব লাগে)
Object.entries(settings).forEach(([key, value]) => {
    console.log(`${key} is set to ${value}`);
});



// =========================================================
// ৪. Object Destructuring [ES6] (Manipulation)
// বিবরণ: অবজেক্ট থেকে সরাসরি ভেরিয়েবল হিসেবে ডাটা বের করা।
// =========================================================
const person = { pName: "Hasan", age: 22, country: "BD" };
const { pName, age } = person; 
console.log(pName); // "Hasan"

// Example 2: নাম পরিবর্তন (Aliasing) এবং ডিফল্ট ভ্যালু
const { country: location, job = "Student" } = person;
console.log(location, job); // "BD", "Student"

// খারাপ দিক: যদি অবজেক্টটি null বা undefined হয়, তবে কোড ক্র্যাশ করবে।


// =========================================================
// ৫. Spread Operator (...) [ES2018] (Manipulation)
// বিবরণ: অবজেক্ট কপি করা বা একাধিক অবজেক্ট জোড়া (Merge) দেওয়া।
// =========================================================
const bio = { name: "Hasan" };
const skill = { tech: "React" };
const fullProfile = { ...bio, ...skill, status: "Active" };
console.log(fullProfile); // {name: "Hasan", tech: "React", status: "Active"}

// Example 2: অবজেক্টের ক্লোন (Clone) বানানো
const original = { x: 1, y: 2 };
const clone = { ...original };



// খারাপ দিক: এটি "Shallow Copy" করে। অর্থাৎ নেস্টেড অবজেক্ট থাকলে ভেতরের ডাটা রেফারেন্স হিসেবে থেকে যায়।


// =========================================================
// ৬. Object.freeze() vs Object.seal() [ES5]
// বিবরণ: freeze কিছুই করতে দেয় না। seal শুধু আপডেট করতে দেয়।
// =========================================================
const frozenObj = { a: 1 };
Object.freeze(frozenObj);
frozenObj.a = 10; // হবে না ❌

const sealedObj = { b: 2 };
Object.seal(sealedObj);
sealedObj.b = 20; // আপডেট হবে ✅
delete sealedObj.b; // ডিলিট হবে না ❌

// খুঁটিনাটি: 'use strict' মোড থাকলে এগুলো পরিবর্তন করার চেষ্টা করলে এরর দেখাবে।


// =========================================================
// ৭. Object.assign(target, source) [ES6]
// বিবরণ: এক বা একাধিক অবজেক্টকে টার্গেট অবজেক্টে কপি করে।
// =========================================================
const obj1 = { a: 1 };
const obj2 = { b: 2 };
Object.assign(obj1, obj2);
console.log(obj1); // { a: 1, b: 2 }

// Example 2: খালি অবজেক্টে কপি করা
const copy = Object.assign({}, obj1);


// =========================================================
// ৮. Object.hasOwn(obj, prop) [ES2022]
// বিবরণ: চেক করে প্রপার্টিটি কি অবজেক্টের নিজস্ব নাকি উত্তরাধিকারসূত্রে পাওয়া।
// =========================================================
const student = { name: "Hasan" };
console.log(Object.hasOwn(student, "name")); // true
console.log(Object.hasOwn(student, "toString")); // false

// খুঁটিনাটি: এটি পুরাতন `obj.hasOwnProperty()` এর আধুনিক এবং নিরাপদ বিকল্প।


// =========================================================
// ৯. property deletion (delete keyword)
// বিবরণ: অবজেক্ট থেকে কোনো কি-ভ্যালু জোড়া মুছে ফেলা।
// =========================================================
const emp = { name: "Ali", salary: 5000 };
delete emp.salary;
console.log(emp); // { name: "Ali" }

// খারাপ দিক: এটি অ্যারেতে ব্যবহার করলে 'empty slot' তৈরি করে, তাই অ্যারেতে এটি এড়িয়ে চলা উচিত।