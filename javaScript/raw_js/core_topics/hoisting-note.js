/**
 * ==========================================================
 * TOPIC: JAVASCRIPT HOISTING (হোস্টিং)
 * ==========================================================
 * সংজ্ঞা: কোড এক্সিকিউট হওয়ার আগে জাভাস্ক্রিপ্ট ইঞ্জিন সব ডিক্লারেশনকে 
 * (Variable & Function) মেমোরির উপরে তুলে নেয়। এটিই হোস্টিং।
 */

// ১. ভ্যারিয়েবল হোস্টিং (var)
console.log(name); // আউটপুট: undefined
var name = "Hasan"; 
// কেন? কারণ পর্দার আড়ালে 'var name;' উপরে চলে গেছে।

// ২. লেট ও কনস্ট (let & const) এবং TDZ
// console.log(age); // ReferenceError!
let age = 25; 
// নোট: let/const হোস্টেড হয় ঠিকই, কিন্তু ডিক্লেয়ার করার আগে এদের 
// এক্সেস করা যায় না। এই সময়টাকে বলে Temporal Dead Zone (TDZ)।



// ৩. ফাংশন হোস্টিং (Function Declaration)
sayHi(); // আউটপুট: "Hi!" (কাজ করবে)
function sayHi() {
    console.log("Hi!");
}

// ৪. ফাংশন এক্সপ্রেশন (Arrow Function)
// sayHello(); // TypeError: sayHello is not a function
var sayHello = () => {
    console.log("Hello!");
};

/**
 * ইন্টারভিউ টিপস:
 * - কেন হোস্টিং হয়? জাভাস্ক্রিপ্ট ইঞ্জিনের 'Creation Phase'-এর কারণে।
 * - হোস্টিং কি ভালো? না, এটি কোডে বাগ তৈরি করতে পারে। 
 * - সমাধান কী? সবসময় let এবং const ব্যবহার করা এবং ফাংশন ব্যবহারের আগে ডিক্লেয়ার করা।
 */