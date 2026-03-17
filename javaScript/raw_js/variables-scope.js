/**
 * =========================================================================
 * TOPIC: VARIABLES & SCOPE (Global, Function, Block)
 * =========================================================================
 */

// 1. GLOBAL SCOPE
// কোডের যেকোনো জায়গা থেকে এক্সেস করা যায়।
let globalUser = "Hasan";

function showUser() {
  console.log(globalUser); // আউটপুট: Hasan (গ্লোবাল ভেরিয়েবল ভেতরে কাজ করবে)
}
showUser();

// -------------------------------------------------------------------------
// 2. FUNCTION SCOPE (var এর এলাকা)
// ভেরিয়েবলটি শুধু ওই ফাংশনের ভেতরেই কাজ করবে।
function sayHello() {
  var message = "Hello from function";
  console.log(message);
}
// console.log(message); // ReferenceError: message is not defined (বাইরে কাজ করবে না)

// -------------------------------------------------------------------------
// 3. BLOCK SCOPE (let & const এর এলাকা)
// { } ব্র্যাকেটের ভেতরের এলাকাকে ব্লক বলে।
if (true) {
  var canLeak = "আমি বাইরে যাব"; // var ব্লক মানে না
  let cannotLeak = "আমি ভেতরেই থাকব"; // let ব্লক মানে
  const stayHere = "আমিও ভেতরেই থাকব"; // const ব্লক মানে
}

console.log(canLeak); // আউটপুট: "আমি বাইরে যাব"
// console.log(cannotLeak); // ReferenceError: cannotLeak is not defined

// -------------------------------------------------------------------------
// 4. LEXICAL SCOPE (লেক্সিক্যাল স্কোপ)
// একটি ফাংশন তার বাইরের (Parent) স্কোপের ভেরিয়েবল এক্সেস করতে পারে।
/**
 * কোড রান হওয়ার সাথে সাথে যা ঘটবে (Step-by-Step)
 */

// ধাপ ১: Global Execution Context (GEC) তৈরি হবে।
// স্ট্যাকে [ GEC ] বসবে। মেমোরিতে parentFunc থাকবে।

function parentFunc() {
  // ধাপ ২: parentFunc কল হলো।
  // স্ট্যাকে এখন [ GEC -> parentFunc_EC ]
  // মেমোরিতে তৈরি হলো: parentName = "Hasan Mahmud"

  let parentName = "Hasan Mahmud";

  function childFunc() {
    // ধাপ ৪: childFunc কল হলো।
    // স্ট্যাকে এখন [ GEC -> parentFunc_EC -> childFunc_EC ]
    //
    //  childFunc-এর ভেতরের দৃশ্য:
    //    -----------------------
    //    [Memory Phase]:
    //    - childSecret: (Uninitialized/TDZ) <--- হ্যাঁ, জায়গা তৈরি হয়েছে!
    //    - Scope Chain Reference: Parent-এর মেমোরির সাথে লিঙ্ক।
    //      [Execution Phase]:
    //    - childSecret: "I am a secret" <--- মান বসলো।

    let childSecret = "I am a secret"; // এটি শুধু চাইল্ডের কাছেই থাকবে
    console.log(`Child access: ${parentName}`);
    // কেন অ্যাক্সেস পেল? কারণ childFunc_EC এর নিচে parentFunc_EC জীবিত আছে।
  }

  childFunc();
  // ধাপ ৫: childFunc-এর কাজ শেষ।
  // অমনি childFunc_EC স্ট্যাক থেকে 'POP OUT' (ডিলিট) হয়ে গেল।
  // চাইল্ডের মেমোরি 'childSecret' এখন পৃথিবী থেকে ভ্যানিশ!

  // ধাপ ৬: এখন কন্ট্রোল ফিরে আসলো parentFunc-এর কাছে।
  // console.log(childSecret); // <--- এখানে এরর দিবে!
}

parentFunc();
// ধাপ ৭: parentFunc-এর কাজ শেষ।
// parentFunc_EC স্ট্যাক থেকে ডিলিট হয়ে গেল। শুধু GEC থাকলো।

// -------------------------------------------------------------------------
// 5. REDECLARATION & REASSIGNMENT (পার্থক্য এক নজরে)
// -------------------------------------------------------------------------

/**
 * ভেরিয়েবল  |  Scope    |  Redeclare?  |  Re-assign?
 * --------------------------------------------------
 * var      | Function |     Yes      |     Yes
 * let      |  Block   |     No       |     Yes
 * const    |  Block   |     No       |     No
 */

// Example:
var x = 1;
var x = 2; // Redeclare করা যায় (বিপজ্জনক!)

let y = 1;
// let y = 2; // Error! Redeclare করা যাবে না।
y = 2; // Re-assign করা যায়।

const z = 1;
// z = 2; // Error! Re-assign করা যাবে না।

// -------------------------------------------------------------------------
// 6. SHADOWING (শ্যাডোয়িং)
// যদি বাইরের এবং ভেতরের স্কোপে একই নামের ভেরিয়েবল থাকে।
let name = "Global Hasan";

if (true) {
  let name = "Block Abir"; // বাইরের 'name' কে সে ব্লক করে দিয়েছে (Shadowing)
  console.log(name); // আউটপুট: Block Abir
}
console.log(name); // আউটপুট: Global Hasan (বাইরেরটা আগের মতোই আছে)

/**
 * =========================================================================
 * SUMMARY FOR INTERVIEW:
 * 1. আধুনিক জেএস-এ সবসময় let এবং const ব্যবহার করা উচিত।
 * 2. var কেন বিপজ্জনক? কারণ সে ব্লক স্কোপ মানে না (Variable Leaking)।
 * 3. Lexical scope এর কারণেই চাইল্ড ফাংশন পেরেন্ট স্কোপের ডাটা দেখতে পায়।
 * =========================================================================
 */

/**
 * =========================================================================
 * TOPIC: HOISTING & TDZ (Temporal Dead Zone)
 * =========================================================================
 */

// --- ১. var এর Hoisting ---
console.log(a); // আউটপুট: undefined
var a = 10;

/**
 * ব্যাখ্যা: JavaScript ইঞ্জিন 'var a' কে কোডের শুরুতে নিয়ে যায় কিন্তু মান (10) নেয় না।
 * তাই ডিক্লেয়ার করার আগে একে কল করলে সে 'undefined' দেখায়।
 * একে বলা হয়: "নামটা জানে কিন্তু মানটা চিনে না।"
 */

// --- ২. let/const এর Hoisting এবং TDZ ---
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

/**
 * ব্যাখ্যা: let এবং const-ও Hoist হয়, কিন্তু তারা মেমোরিতে 'Reserved' বা তালাবদ্ধ থাকে।
 * যতক্ষণ না কোড ওই লাইনে পৌঁছাচ্ছে, ততক্ষণ একে এক্সেস করা যায় না।
 * এই সময়টুকুকেই বলা হয় Temporal Dead Zone (TDZ)।
 */
/**
 * =========================================================================
 * TOPIC: HOISTING & TDZ (Temporal Dead Zone)
 * =========================================================================
 */

// --- ১. var এর Hoisting ---
console.log(a); // আউটপুট: undefined
var a = 10;

/**
 * ব্যাখ্যা: JavaScript ইঞ্জিন 'var a' কে কোডের শুরুতে নিয়ে যায় কিন্তু মান (10) নেয় না।
 * তাই ডিক্লেয়ার করার আগে একে কল করলে সে 'undefined' দেখায়।
 * একে বলা হয়: "নামটা জানে কিন্তু মানটা চিনে না।"
 */

// --- ২. let/const এর Hoisting এবং TDZ ---
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

/**
 * ব্যাখ্যা: let এবং const-ও Hoist হয়, কিন্তু তারা মেমোরিতে 'Reserved' বা তালাবদ্ধ থাকে।
 * যতক্ষণ না কোড ওই লাইনে পৌঁছাচ্ছে, ততক্ষণ একে এক্সেস করা যায় না।
 * এই সময়টুকুকেই বলা হয় Temporal Dead Zone (TDZ)।
 */

// -------------------------------------------------------------------------
// 3. HOISTING IN FUNCTIONS (ইন্টারভিউ ট্রিক)
// -------------------------------------------------------------------------

// ক. Function Declaration: এটা হোয়েস্ট হয়
sayHi(); // আউটপুট: "Hello!" (আগে কল করলেও কাজ করবে)

function sayHi() {
  console.log("Hello!");
}

// খ. Function Expression: এটা হোয়েস্ট হয় না (কারণ এটি ভেরিয়েবল হিসেবে আছে)
// sayHello(); // TypeError: sayHello is not a function (যদি var দিয়ে করা হয়)
var sayHello = function () {
  console.log("Hi!");
};

/**
 * =========================================================================
 * SUMMARY OF HOISTING:
 * 1. var = Hoist হয় এবং 'undefined' থাকে।
 * 2. let/const = Hoist হয় কিন্তু TDZ এর কারণে Error দেয়।
 * 3. Regular Function = পুরোপুরি Hoist হয়, তাই আগে কল করা যায়।
 * 4. Arrow Function/Expression = হোয়েস্ট হয় না।
 * =========================================================================
 */
// -------------------------------------------------------------------------
// 3. HOISTING IN FUNCTIONS (ইন্টারভিউ ট্রিক)
// -------------------------------------------------------------------------

// ক. Function Declaration: এটা হোয়েস্ট হয়
sayHi(); // আউটপুট: "Hello!" (আগে কল করলেও কাজ করবে)

function sayHi() {
  console.log("Hello!");
}

// খ. Function Expression: এটা হোয়েস্ট হয় না (কারণ এটি ভেরিয়েবল হিসেবে আছে)
// sayHello(); // TypeError: sayHello is not a function (যদি var দিয়ে করা হয়)
var sayHello = function () {
  console.log("Hi!");
};

/**
 * =========================================================================
 * SUMMARY OF HOISTING:
 * 1. var = Hoist হয় এবং 'undefined' থাকে।
 * 2. let/const = Hoist হয় কিন্তু TDZ এর কারণে Error দেয়।
 * 3. Regular Function = পুরোপুরি Hoist হয়, তাই আগে কল করা যায়।
 * 4. Arrow Function/Expression = হোয়েস্ট হয় না।
 * =========================================================================
 */

/**
 * =========================================================================
 * TOPIC: GLOBAL SCOPE RULES (var vs let vs const)
 * =========================================================================
 */

// ১. তিনটির যেকোনোটি দিয়েই গ্লোবাল ভেরিয়েবল তৈরি করা যায়।
// ২. পার্থক্য হলো: 'var' গ্লোবাল অবজেক্টের (window) প্রপার্টি হয়ে যায়।
// ৩. 'let' এবং 'const' গ্লোবাল হলেও তারা window অবজেক্টে লুকায়িত থাকে।

var user = "Hasan"; // Global
let age = 25; // Global
const city = "Dhaka"; // Global

function checkScope() {
  // ফাংশনের ভেতর থেকে সবাইকেই এক্সেস করা যাচ্ছে
  console.log(user, age, city);
}
checkScope();

/**
 * BEST PRACTICE:
 * গ্লোবাল ভেরিয়েবল বানানোর সময়ও 'let' বা 'const' ব্যবহার করুন।
 *
 * কারণ 'var' গ্লোবাল উইন্ডো অবজেক্টকে নোংরা (Pollute) করে ফেলে।
 *
 * যদি আপনি var দিয়ে গ্লোবাল ভেরিয়েবল ডিক্লেয়ার করেন, তবে সেটি
 * সরাসরি ব্রাউজারের গ্লোবাল অবজেক্টের সাথে মিশে যায়।
 * এতে অন্য কোনো
 * স্ক্রিপ্ট বা লাইব্রেরি ভুলবশত আপনার ভেরিয়েবলটি বদলে দিতে পারে
 * (একে বলে Global Namespace Pollution)। তাই আধুনিক
 * জেএস-এ গ্লোবাল ভেরিয়েবল হিসেবেও let বা const ব্যবহার করা
 * নিরাপদ।
 */
