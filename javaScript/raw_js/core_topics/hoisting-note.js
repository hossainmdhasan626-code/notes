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

/**
 * ==========================================================
 * হোস্টিং সম্পর্কিত এরর (Reference vs Syntax Error)
 * ==========================================================
 * হোস্টিংয়ের সময় জাভাস্ক্রিপ্ট ইঞ্জিন let এবং const-এর ক্ষেত্রে 
 * যে নির্দিষ্ট এররগুলো দেয়:
 */

// ১. ReferenceError (হোস্টিং ও TDZ এর কারণে)
// ব্যাখ্যা: let এবং const হোস্টেড হয় ঠিকই, কিন্তু ডিক্লেয়ার করার আগে 
// এগুলো মেমোরির 'Temporal Dead Zone' (TDZ) এ থাকে। এই সময় এদের 
// ডাকলে জাভাস্ক্রিপ্ট রেফারেন্স এরর দেয়।

try {
    console.log(myDeveloperName); 
} catch (err) {
    console.log("Error Type:", err.name); // ReferenceError
    console.log("Reason: Initialization এর আগে let/const এক্সেস করা যাবে না।");
}
let myDeveloperName = "Hasan";


// ২. SyntaxError (ডিক্লারেশন রুলস ও হোস্টিং)
// ব্যাখ্যা: জাভাস্ক্রিপ্ট ইঞ্জিন কোড রান করার আগেই (Parsing Phase) পুরো কোডটা পড়ে। 
// যেহেতু const-কে হোস্টিং করার সময় অবশ্যই ভ্যালুসহ ডিক্লেয়ার করতে হয়, 
// তাই ভ্যালু ছাড়া শুধু 'const PI;' লিখলে ইঞ্জিন শুরুতেই সিনট্যাক্স এরর দেয়।

/* const PROJECT_NAME; 
   // এটি আনকমেন্ট করলে কোড চলবেই না, সরাসরি দিবে:
   // SyntaxError: Missing initializer in const declaration
*/


/**
 * মনে রাখার সহজ উপায় (Summary for Hasan):
 * --------------------------------------
 * ১. ডিক্লেয়ার করার আগে ব্যবহার করলে (let/const) = ReferenceError (যেহেতু সে TDZ এ আছে)।
 * ২. const ডিক্লেয়ার করার সময় ভ্যালু না দিলে = SyntaxError (যেহেতু গ্রামার ভুল)।
 * ৩. var-এর ক্ষেত্রে আগে ব্যবহার করলে = undefined (কোনো এরর নেই)।
 */