/**
 * =========================================================================
 * FILE: 02_expressions_return.js
 * TOPIC: RETURN KEYWORD & FUNCTION EXPRESSIONS
 * =========================================================================
 * * ১. রিটার্ন কী (The Return Keyword):
 * ফাংশনের ভেতর থেকে কোনো রেজাল্ট বা মান বাইরে পাঠানোর জন্য এটি ব্যবহার করা হয়।
 * 'return' পেলে ফাংশন সাথে সাথে থেমে যায়। এর নিচের কোনো কোড আর চলে না।
 */

function calculateTax(amount) {
    const tax = amount * 0.15;
    return tax; // মানটি বাইরে পাঠিয়ে দিচ্ছে
    console.log("This will never print"); // Dead Code: return এর পরে হওয়ায় এটি চলবে না
}

const myTax = calculateTax(1000); // রিটার্ন করা মানটি 'myTax' ভেরিয়েবলে জমা হলো
console.log("Your tax is:", myTax);


/**
 * ২. ফাংশন এক্সপ্রেশন (Function Expression):
 * যখন একটি ফাংশনকে ভেরিয়েবলের মধ্যে স্টোর করা হয়।
 * কনভেনশন: সবসময় 'const' ব্যবহার করা উচিত যাতে ফাংশনটি কেউ ভুল করে বদলে না ফেলে।
 */

const getFullName = function(firstName, lastName) {
    return firstName + " " + lastName;
};

const myName = getFullName("Hasan", "Developer");
console.log(myName);


/**
 * ৩. হোইস্টিং টিপস (The Hoisting Secret):
 * Normal function declaration হোইস্ট (Hoisted) হয়, অর্থাৎ ডিক্লেয়ার করার আগেও কল করা যায়।
 * কিন্তু Function Expression হোইস্ট হয় না। তাই একে আগে ডিক্লেয়ার করতে হবে, তারপর কল।
 */

// testHoisting(); // ❌ এটি ERROR দিবে কারণ এটি Function Expression

const testHoisting = function() {
    console.log("I am not hoisted!");
};

testHoisting(); // ✅ এটি সঠিক পদ্ধতি


/**
 * ৪. প্রো-টিপস (Interview Points):
 * - যদি ফাংশনে কিছু 'return' না করা হয়, তবে সেটি ডিফল্টভাবে 'undefined' রিটার্ন করে।
 * - ভেরিয়েবলে ফাংশন রাখার সময় নামগুলো এমন দিন যা কাজ বোঝায় (যেমন: calculate, get, check)।
 */

// একটি রিয়েল ইউজ কেস (Conditional Return)
function checkEligibility(age) {
    if (age >= 18) {
        return "Eligible for License";
    }
    return "Not Eligible"; // 'else' ছাড়াই কাজ করবে কারণ প্রথমটি না মিললে এখানে আসবে
}

console.log(checkEligibility(20));