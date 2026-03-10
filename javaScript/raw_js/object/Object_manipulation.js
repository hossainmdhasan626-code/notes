/**
 * 🚀 JavaScript Object Manipulation (Techniques & Actions)
 * Folder: objects/
 * Description: Common patterns to create, update, merge, and delete object data.
 */

// =========================================================
// ১. Property Access & Update (Dot & Bracket Notation)
// বিবরণ: অবজেক্টের ডাটা পড়া এবং পরিবর্তন করার প্রাথমিক উপায়।
// =========================================================
const user = { name: "Hasan", age: 22 };

// Example 1: Dot Notation (সবথেকে বেশি ব্যবহৃত)
user.age = 23; 

// Example 2: Bracket Notation (ডাইনামিক কী-র জন্য প্রয়োজন)
const keyName = "role";
user[keyName] = "Junior Developer"; 

console.log(user); // { name: "Hasan", age: 23, role: "Junior Developer" }
// খুঁটিনাটি: যদি প্রপার্টি নামে স্পেস বা হাইফেন থাকে (যেমন: "user-id"), তবে Bracket Notation বাধ্যতামূলক।


// =========================================================
// ২. Object Destructuring [ES6]
// বিবরণ: অবজেক্ট থেকে সহজে ডাটা বের করে আলাদা ভেরিয়েবল বানানো।
// =========================================================
const student = { sName: "Hasan", sAge: 22, city: "Dhaka" };

// Example 1: Basic Destructuring
const { sName, sAge } = student;
console.log(sName); // "Hasan"

// Example 2: Aliasing (নাম পরিবর্তন) ও Default Value
const { city: location, status = "Active" } = student;
console.log(location, status); // "Dhaka", "Active"



// খারাপ দিক: যদি student ভেরিয়েবলটি null হয়, তবে এটি এরর দিবে। তাই সেফটি চেক জরুরি।


// =========================================================
// ৩. Spread Operator (...) [ES2018]
// বিবরণ: অবজেক্ট ক্লোন করা বা একাধিক অবজেক্টকে একত্রে মিশিয়ে ফেলা (Merge)।
// =========================================================
const basicInfo = { name: "Hasan" };
const technical = { skill: "React" };

// Example 1: Merging (দুইটি অবজেক্ট জোড়া দেওয়া)
const fullProfile = { ...basicInfo, ...technical, country: "BD" };
console.log(fullProfile); // { name: "Hasan", skill: "React", country: "BD" }

// Example 2: Cloning (কপি করা)
const copyObj = { ...fullProfile };



// খারাপ দিক: এটি "Shallow Copy" করে। নেস্টেড অবজেক্ট থাকলে অরিজিনাল ডাটার সাথে লিংক থেকে যায়।


// =========================================================
// ৪. Property Deletion (delete keyword)
// বিবরণ: অবজেক্ট থেকে কোনো নির্দিষ্ট প্রপার্টি বা ডাটা পুরোপুরি মুছে ফেলা।
// =========================================================
const product = { id: 101, title: "Laptop", stock: 5 };

// Example 1: সাধারণ ডিলিট
delete product.stock;

// Example 2: ডাইনামিক ডিলিট
const target = "id";
delete product[target];

console.log(product); // { title: "Laptop" }
// খারাপ দিক: delete অপারেটর জাভাস্ক্রিপ্ট ইঞ্জিনের পারফরম্যান্স কিছুটা কমিয়ে দেয়, তাই বড় লুপে এটি এড়িয়ে চলা ভালো।


// =========================================================
// ৫. Property Shorthand [ES6]
// বিবরণ: ভেরিয়েবলের নাম এবং অবজেক্টের কী (Key) একই হলে ছোট করে লেখা।
// =========================================================
const username = "hasan_dev";
const isAdmin = false;

const auth = {
    username, // username: username লেখার প্রয়োজন নেই
    isAdmin
};
console.log(auth); // { username: "hasan_dev", isAdmin: false }


// =========================================================
// ৬. Computed Property Names [ES6]
// বিবরণ: অবজেক্ট তৈরির সময় সরাসরি থার্ড ব্র্যাকেট দিয়ে ডাইনামিক কী সেট করা।
// =========================================================
const field = "status";
const value = "pending";

const task = {
    id: 1,
    [field]: value // রানটাইমে 'field' এর মান এখানে 'status' হয়ে যাবে
};
console.log(task); // { id: 1, status: "pending" }