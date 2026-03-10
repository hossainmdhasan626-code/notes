/**
 * =========================================================================
 * Callbacks_hof.js
 * TOPIC: CALLBACK FUNCTIONS & HIGHER-ORDER FUNCTIONS (SYNCHRONOUS)
 * =========================================================================
 * * ১. সংজ্ঞা (Definitions):
 * - Callback Function: যে ফাংশনটি অন্য ফাংশনের আর্গুমেন্ট হিসেবে পাস করা হয়।
 * - Higher-Order Function (HOF): যে ফাংশনটি অন্য ফাংশনকে রিসিভ করে।
 */

// ২. কলব্যাক ফাংশন ডিক্লেয়ার করার ৩টি সিনট্যাক্স (Syntax Variations):

// ক. Regular Function Syntax
function notify(name) {
    console.log("Notification for: " + name);
}

// খ. Arrow Function Syntax (সবচেয়ে বেশি ব্যবহৃত)
const silentNotify = (name) => console.log("Silent alert: " + name);

// গ. Anonymous Function (সরাসরি কলের সময় লিখে দেওয়া)
// এটি আলাদা করে ডিক্লেয়ার করতে হয় না।


/**
 * ৩. প্রফেশনাল সিনট্যাক্স (HOF Structure):
 * 'callback' বা 'cb' নামটি কেবল একটি প্যারামিটার, এখানে যেকোনো নাম দেওয়া যায়।
 */

const executeTask = (userName, cb) => {
    console.log("Task is being processed...");
    cb(userName); // এখানে পাঠানো ফাংশনটি এক্সিকিউট হচ্ছে
};

// কল করার সময় বিভিন্নভাবে পাঠানো:
executeTask("Hasan", notify);       // Regular ফাংশন পাস
executeTask("Hasan", silentNotify); // Arrow ফাংশন পাস
executeTask("Hasan", (name) => {    // Anonymous অ্যারো ফাংশন পাস
    console.log("Custom logic for: " + name);
});



/**
 * ৪. ডায়নামিক লজিক উদাহরণ (The Calculator Strategy):
 * এটিই কলব্যাকের আসল শক্তি। মেইন ফাংশন একই থাকে, শুধু কাজ বদলে যায়।
 */

const doMath = (a, b, operation) => {
    return operation(a, b); 
};

// অপারেশনগুলো কলব্যাক হিসেবে পাস করা হচ্ছে
const sum = (x, y) => x + y;
const sub = (x, y) => x - y;

console.log("Result of Addition:", doMath(20, 10, sum)); // ৩০
console.log("Result of Subtraction:", doMath(20, 10, sub)); // ১০


/**
 * ৫. কিউরিওসিটি টিপস (Best Practices):
 * - নাম দেওয়ার সময় 'callback', 'cb' বা কাজের সাথে মিল রেখে নাম দিন (যেমন: 'onSuccess')।
 * - কলব্যাক পাঠানোর সময় ফাংশনটিকে কল করবেন না (যেমন: notify()), শুধু নাম লিখুন (notify)।
 * - ফাংশন কল করলে সেটি সাথে সাথে রান হয়ে যায়, কিন্তু আমরা চাই HOF যখন বলবে তখন রান হোক।
 */



/**
 * ৬. কেন এগুলো শিখছি?
 * - এটি কোডকে Reusable করে (একই doMath ফাংশন হাজার রকম কাজ করতে পারে)।
 * - এটি ছাড়া Array Methods (map, filter) বোঝা অসম্ভব।
 */

/**
 * ৭. Callback Hell (The Problem Section)
 * এটি মূলত অ্যাসিনক্রোনাস (Async) কোডে ঘটে। যখন একটি কাজের ভেতর আরেকটি কলব্যাক দিতে হয়, 
 * তখন কোডটি দেখতে ডানের দিকে বেঁকে যায় এবং পিরামিডের মতো হয়ে যায়।
 */

// উদাহরণ: ইউজার ডাটা আনো -> তারপর তার পোস্ট আনো -> তারপর কমেন্ট আনো
const getSocialData = () => {
    setTimeout(() => {
        console.log("1. User Data Loaded");
        setTimeout(() => {
            console.log("2. User Posts Loaded");
            setTimeout(() => {
                console.log("3. Post Comments Loaded");
                // এভাবে চলতেই থাকলে একেই বলে Callback Hell বা Pyramid of Doom
            }, 1000);
        }, 1000);
    }, 1000);
};

// সমাধান: এই সমস্যা থেকে বাঁচতেই জাভাস্ক্রিপ্টে Promises এবং Async/Await এসেছে।


/**
 * ৮. React/Next.js এ বাস্তব প্রয়োগ (Lifting State Up)
 * রিয়্যাক্টে চাইল্ড থেকে প্যারেন্টে ডাটা পাঠানোর একমাত্র উপায় হলো কলব্যাক ফাংশন।
 */

// উদাহরণ ১: একটি সিম্পল সার্চ ফিল্ড (Child) যা প্যারেন্টকে ডাটা পাঠায়
const SearchInput = ({ onSearch }) => {
    return (
        <input 
            type="text" 
            onChange={(e) => onSearch(e.target.value)} // এখানে onSearch একটি কলব্যাক
            placeholder="Type something..."
        />
    );
};

// উদাহরণ ২: প্যারেন্ট কম্পোনেন্টে কলব্যাক রিসিভ করা
const ParentPage = () => {
    const handleSearch = (query) => {
        console.log("Search query received in Parent:", query);
    };

    return (
        <div>
            <h1>My Store</h1>
            <SearchInput onSearch={handleSearch} /> 
            {/* handleSearch ফাংশনটিকে প্রপস হিসেবে পাঠিয়ে দেওয়া হলো */}
        </div>
    );
};


/**
 * ৯. কেন রিয়্যাক্টে এটি গুরুত্বপূর্ণ? (The "Why")
 * ১. রিয়্যাক্টে ডাটা একমুখী (One-way data flow)। নিচের দিক থেকে উপরে ডাটা পাঠাতে এই কলব্যাকই একমাত্র হাতিয়ার।
 * ২. পারফরম্যান্স অপ্টিমাইজেশনে (useCallback) এটি সরাসরি কাজে লাগে।
 */