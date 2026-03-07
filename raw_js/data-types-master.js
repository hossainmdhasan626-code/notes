/**
 * =========================================================================
 * JAVASCRIPT CORE MASTER NOTE (Data Types, Memory, Coercion, & Operators)
 * =========================================================================
 * Author: Hasan Notes
 * Level: Basic to Advanced
 */

// -------------------------------------------------------------------------
// 1. DATA TYPES OVERVIEW
// -------------------------------------------------------------------------
// জাভাস্ক্রিপ্টে ডাটা টাইপ প্রধানত ২ প্রকার: Primitive এবং Reference।

// -------------------------------------------------------------------------
// 2. PRIMITIVE TYPES (Pass by Value & Immutable)
// -------------------------------------------------------------------------

const myString = "Hasan Mahmud";   // String
const myNumber = 28;               // Number (Integer/Float)
const myBool = true;               // Boolean
const myUndefined = undefined;     // Undefined (মান দেওয়া হয়নি)
const myNull = null;               // Null (ইচ্ছা করে খালি রাখা)
const mySymbol = Symbol("id");     // Symbol (ইউনিক আইডি)
const myBigInt = 9007199254n;      // BigInt (বিশাল বড় সংখ্যা)

/** * ⚠ INTERVIEW BUG:
 * typeof null; // output: "object" (এটা জাভাস্ক্রিপ্টের শুরু থেকে চলে আসা বাগ)
 * typeof NaN;  // output: "number" (NaN মানে Not a Number, কিন্তু এটি Number টাইপ)
 */



// -------------------------------------------------------------------------
// 3. REFERENCE TYPES (Pass by Reference & Mutable)
// -------------------------------------------------------------------------

const myObject = { name: "Hasan", age: 28 };
const myArray = ["JS", "React", "Node"];
const myFunction = function() { return "Hello"; };

// -------------------------------------------------------------------------
// 4. MEMORY LOGIC: PASS BY VALUE vs REFERENCE
// -------------------------------------------------------------------------

// Primitive Example (Pass by Value)
let a = 10;
let b = a;  // 'a' এর একটি আলাদা কপি 'b' পেল
b = 20;     
console.log(a); // 10 (অরিজিনাল মান বদলায়নি)

// Reference Example (Pass by Reference)
let user1 = { name: "Hasan" };
let user2 = user1; // 'user1' এর মেমোরি ঠিকানা বা Reference 'user2' পেল
user2.name = "Abir"; 
console.log(user1.name); // "Abir" (অরিজিনাল বদলে গেছে কারণ দুজন একই ঠিকানায় থাকে)



// -------------------------------------------------------------------------
// 5. SPREAD OPERATOR & COPYING
// -------------------------------------------------------------------------

// Shallow Copy (প্রথম লেভেল কপি করে)
let originalUser = { name: "Hasan", city: "Dhaka" };
let copiedUser = { ...originalUser }; 
copiedUser.name = "Abir"; 
console.log(originalUser.name); // "Hasan" (এখন আর অরিজিনাল ডাটা বদলায়নি)

// 💡 কেন const দিয়েও Array/Object বদলানো যায়?
const colors = ["Red", "Green"];
colors.push("Blue"); // কাজ করবে! 
// কারণ: আমরা মেমোরি অ্যাড্রেস (Address) পাল্টাচ্ছি না, শুধু ভেতরের ডাটা পাল্টাচ্ছি।

// -------------------------------------------------------------------------
// 6. TYPE COERCION (Implicit Type Conversion)
// -------------------------------------------------------------------------

// '+' অপারেটর: যদি কোনো একপাশে String থাকে, সে কনক্যাটিনেট (জোড়া লাগানো) করে।
console.log(1 + 2 + "hasan"); // "3hasan" (বাম থেকে কাজ শুরু: ১+২=৩, ৩+"hasan"="3hasan")
console.log("hasan" + 1 + 2); // "hasan12" (শুরুতে স্ট্রিং থাকায় সব স্ট্রিং হয়ে গেছে)

// '-', '*', '/' অপারেটর: এগুলো শুধুমাত্র গাণিতিক কাজ করে (স্ট্রিংকে নাম্বার বানিয়ে নেয়)।
console.log("10" - 2); // 8
console.log("10" * "2"); // 20

// -------------------------------------------------------------------------
// 7. OPERATOR PRECEDENCE & ASSOCIATIVITY
// -------------------------------------------------------------------------

// PEMDAS নিয়ম: Parentheses (), Exponent **, Multiply *, Divide /, Add +, Subtract -
const calc = 10 + (5 * 2) / (5 - 3); 
// ধাপ ১: (5-3) = 2, (5*2) = 10
// ধাপ ২: 10 / 2 = 5
// ধাপ ৩: 10 + 5 = 15
console.log(calc); // 15

// Increment Operator
let x = 5;
let y = x++; // Post-increment: আগে x এর মান y তে বসবে (5), তারপর x বাড়বে (6)
console.log(x, y); // 6, 5

// -------------------------------------------------------------------------
// 8. MODERN ES6+ FEATURES
// -------------------------------------------------------------------------

// Template Literal
const name = "Hasan";
console.log(`Hello, I am ${name} and my age is ${2026 - 1998}`);

// Optional Chaining (?.)
const profile = { name: "Hasan" };
console.log(profile?.address?.city); // undefined (এরর আসবে না)

/**
 * =========================================================================
 * SUMMARY FOR INTERVIEW:
 * 1. Primitive = Stack memory, Reference = Heap memory.
 * 2. == (Value check), === (Value + Type check).
 * 3. Array.isArray(arr) - এটি চেক করে কোনো কিছু অ্যারে কি না।
 * 4. Post-increment (x++) আগে অ্যাসাইন করে পরে বাড়ায়।
 * =========================================================================
 */