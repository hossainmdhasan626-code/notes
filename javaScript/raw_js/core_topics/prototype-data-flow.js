/**
 * ==========================================================
 * TOPIC: PROTOTYPE DATA FLOW & LOOKUP MECHANISM
 * ==========================================================
 * ব্যাখ্যা: জাভাস্ক্রিপ্টে ইনহেরিটেন্স কীভাবে কাজ করে এবং ডাটা 
 * কোন দিক থেকে কোন দিকে খোঁজা হয় তার বিস্তারিত নোট।
 */

// ১. ডাটা ফ্লো এর নিয়ম (The Look-up Rule):
// জাভাস্ক্রিপ্টে ডাটা ফ্লো হয় "Bottom-to-Top" (নিচ থেকে উপরে)।
// অর্থাৎ: Child -> Parent -> Grandparent -> Object.prototype -> null

// উদাহরণ সেটআপ:
const human = { 
    canTalk: true,
    greet() { console.log("Hello!"); }
};

const robot = { 
    brand: "Tesla",
    work() { console.log("Working..."); }
};

// রোবটের প্যারেন্ট বানালাম হিউম্যানকে (robot < human)
Object.setPrototypeOf(robot, human);

const worker = { 
    name: "Hasan",
    profession: "Dev"
};

// ওয়ার্কারের প্যারেন্ট বানালাম রোবটকে (worker < robot)
Object.setPrototypeOf(worker, robot);



/**
 * ২. ডাটা খোঁজার ধাপসমূহ (Step-by-Step Lookup):
 * যখন আমরা লিখি: console.log(worker.canTalk);
 * * ধাপ ১: 'worker' অবজেক্টের নিজের ভেতর খোঁজে। (নাই)
 * ধাপ ২: 'worker.__proto__' (robot) এর ভেতর খোঁজে। (নাই)
 * ধাপ ৩: 'robot.__proto__' (human) এর ভেতর খোঁজে। (পাওয়া গেছে! true রিটার্ন করবে)
 */

console.log(worker.name);    // "Hasan" (নিজস্ব প্রোপার্টি)
console.log(worker.brand);   // "Tesla" (প্যারেন্ট robot থেকে এসেছে)
console.log(worker.canTalk); // true (গ্র্যান্ড-প্যারেন্ট human থেকে এসেছে)

/**
 * ৩. শ্যাডোয়িং (Property Shadowing):
 * যদি চাইল্ডের কাছে একই নামের প্রোপার্টি থাকে, তবে সে আর উপরে যায় না।
 */
const boss = { name: "Boss" };
Object.setPrototypeOf(boss, human);
boss.canTalk = false; // Shadowing: নিজস্ব ভ্যালু সেট করা হলো

console.log(boss.canTalk); // false (সে আর হিউম্যানের true ভ্যালুটা নিবে না)



/**
 * ৪. মনে রাখার মতো গুরুত্বপূর্ণ পয়েন্ট:
 * --------------------------------
 * - Single Inheritance: একটি অবজেক্টের সরাসরি প্যারেন্ট একজনই হতে পারে।
 * - Search Direction: সব সময় নিচ থেকে উপরে (Child to Parent)। 
 * প্যারেন্ট তার চাইল্ড সম্পর্কে কিছুই জানে না।
 * - End of Chain: চেইনের একদম শেষ মাথায় থাকে Object.prototype, যার উপরে আছে null।
 */

// ৫. ইন্টারভিউ প্রশ্ন: "কি হবে যদি প্রোপার্টি কোথাও না পাওয়া যায়?"
// উত্তর: পুরো চেইন খুঁজে কোথাও না পেলে জাভাস্ক্রিপ্ট 'undefined' রিটার্ন করবে।
console.log(worker.salary); // undefined (পুরো চেইনের কোথাও নেই)



/**
 * হাসান, এই মেকানিজমটিই জাভাস্ক্রিপ্টকে অন্যান্য ল্যাঙ্গুয়েজ থেকে আলাদা করে।
 * এটি তোমার 'e-comark' প্রজেক্টে মেমোরি ম্যানেজমেন্ট বুঝতে অনেক সাহায্য করবে।
 */