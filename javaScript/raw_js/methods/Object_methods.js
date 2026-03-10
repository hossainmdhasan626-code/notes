/**
 * 🚀 JavaScript Object Methods (Master Guide)
 * Folder: methods/
 * Description: All static methods provided by the Object constructor.
 */

// =========================================================
// ১. Object.keys(obj) [ES5]
// বিবরণ: অবজেক্টের সব 'Property Names' বা 'Keys' গুলোকে একটি অ্যারে হিসেবে দেয়।
// =========================================================
const user = { id: 101, name: "Hasan", role: "Dev" };
console.log(Object.keys(user)); // ["id", "name", "role"]

// Example 2: অবজেক্ট খালি কি না চেক করা (রিয়েল প্রজেক্টে খুব লাগে)
const data = {};
const isEmpty = Object.keys(data).length === 0; 
console.log(isEmpty); // true

// খুঁটিনাটি: এটি শুধু সরাসরি অবজেক্টের নিজস্ব এবং 'Enumerable' কী গুলো দেয়।


// =========================================================
// ২. Object.values(obj) [ES2017]
// বিবরণ: অবজেক্টের সব 'Values' গুলোকে একটি অ্যারে হিসেবে দেয়।
// =========================================================
const prices = { apple: 100, orange: 200 };
console.log(Object.values(prices)); // [100, 200]

// Example 2: সব ভ্যালুর যোগফল বের করা (অ্যারে মেথড ব্যবহার করে)
const total = Object.values(prices).reduce((a, b) => a + b, 0); 
console.log(total); // 300


// =========================================================
// ৩. Object.entries(obj) [ES2017]
// বিবরণ: কি এবং ভ্যালুকে [key, value] ফরম্যাটে একটি নেস্টেড অ্যারে দেয়।
// =========================================================
const settings = { theme: "dark", notifications: true };
console.log(Object.entries(settings)); // [["theme", "dark"], ["notifications", true]]

// Example 2: অবজেক্টকে লুপ করে ডাটা প্রিন্ট করা (React এ খুব লাগে)
Object.entries(settings).forEach(([key, value]) => {
    console.log(`${key} is set to ${value}`);
});




// =========================================================
// ৪. Object.fromEntries(iterable) [ES2019]
// বিবরণ: [key, value] জোড়া সম্বলিত অ্যারে থেকে পুনরায় অবজেক্ট তৈরি করে। (entries এর উল্টো)
// =========================================================
const arr = [["color", "red"], ["size", "large"]];
const objFromArr = Object.fromEntries(arr);
console.log(objFromArr); // { color: "red", size: "large" }

// Example 2: URL Parameters থেকে অবজেক্ট তৈরি করা
const params = new URLSearchParams("name=hasan&age=22");
console.log(Object.fromEntries(params)); // { name: "hasan", age: "22" }


// =========================================================
// ৫. Object.freeze(obj) [ES5]
// বিবরণ: অবজেক্টকে পুরোপুরি লক করে দেয়। নতুন কিছু যোগ, ডিলিট বা এডিট করা অসম্ভব।
// =========================================================
const appConfig = { version: "1.0.2" };
Object.freeze(appConfig);

appConfig.version = "2.0.0"; // পরিবর্তন হবে না ❌
appConfig.newKey = "test";   // যোগ হবে না ❌
console.log(appConfig.version); // "1.0.2"

// খারাপ দিক: এটি 'Shallow Freeze' করে। অর্থাৎ নেস্টেড অবজেক্ট থাকলে সেটি কিন্তু লক হয় না।


// =========================================================
// ৬. Object.seal(obj) [ES5]
// বিবরণ: প্রপার্টি আপডেট করা যাবে, কিন্তু নতুন কিছু যোগ বা ডিলিট করা যাবে না।
// =========================================================
const profile = { username: "hasan_dev" };
Object.seal(profile);

profile.username = "hasan_pro"; // আপডেট হবে ✅
delete profile.username;        // ডিলিট হবে না ❌
console.log(profile.username);  // "hasan_pro"


// =========================================================
// ৭. Object.assign(target, ...sources) [ES6]
// বিবরণ: এক বা একাধিক সোর্স অবজেক্টের ডাটা টার্গেট অবজেক্টে কপি করে।
// =========================================================
const obj1 = { a: 1 };
const obj2 = { b: 2, c: 3 };
Object.assign(obj1, obj2);
console.log(obj1); // { a: 1, b: 2, c: 3 }

// Example 2: খালি অবজেক্টে কপি করা (Cloning)
const copy = Object.assign({}, obj1);




// =========================================================
// ৮. Object.hasOwn(obj, prop) [ES2022]
// বিবরণ: চেক করে প্রপার্টিটি কি অবজেক্টের নিজস্ব নাকি উত্তরাধিকারসূত্রে পাওয়া।
// =========================================================
const student = { name: "Hasan" };
console.log(Object.hasOwn(student, "name")); // true
console.log(Object.hasOwn(student, "toString")); // false (উত্তরাধিকারসূত্রে পাওয়া)

// সুবিধা: এটি পুরাতন `obj.hasOwnProperty()` এর আধুনিক এবং নিরাপদ বিকল্প।


// =========================================================
// ৯. Object.is(val1, val2) [ES6]
// বিবরণ: দুটি ভ্যালু একদম সমান কি না তা চেক করে (=== এর মতো কিন্তু আরও নিখুঁত)।
// =========================================================
console.log(Object.is(NaN, NaN)); // true (NaN === NaN দিলে false আসে)
console.log(Object.is(-0, +0));   // false (-0 === +0 দিলে true আসে)

// Example 2: অবজেক্ট রেফারেন্স চেক
const o = { a: 1 };
console.log(Object.is(o, o)); // true


// =========================================================
// ১০. Object.create(proto) [ES5]
// বিবরণ: একটি নির্দিষ্ট প্রোটোটাইপ ব্যবহার করে নতুন অবজেক্ট তৈরি করে।
// =========================================================
const proto = { greet: function() { console.log("Hello!"); } };
const newObj = Object.create(proto);
newObj.greet(); // "Hello!"

// Example 2: নাল প্রোটোটাইপ অবজেক্ট (একদম ক্লিন অবজেক্ট)
const cleanObj = Object.create(null);
console.log(cleanObj.toString); // undefined