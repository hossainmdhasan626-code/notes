/**
 * =========================================================================
 * FILE: 01_basics.js
 * TOPIC: FUNCTION DECLARATION, PARAMETERS & ARGUMENTS
 * =========================================================================
 */

/**
 * ১. ফাংশন ডিক্লেয়ারেশন (Function Declaration)
 * ব্যাখ্যা: এটি একটি ব্লু-প্রিন্টের মতো। আপনি একবার কোড লিখে রাখবেন, 
 * যা বারবার ব্যবহার করা যাবে।
 */
function checkEven(number) {
    if (number % 2 === 0) {
        console.log(number + " is Even");
    } else {
        console.log(number + " is Odd");
    }
}

// ফাংশন কল করা (Calling/Invoking)
checkEven(10); // Output: 10 is Even


/**
 * ২. প্যারামিটার বনাম আর্গুমেন্ট (Parameters vs Arguments)
 * Parameters: ফাংশন বানানোর সময় যে নামগুলো দেওয়া হয় (Placeholder)।
 * Arguments: ফাংশন কল করার সময় যে আসল মান পাঠানো হয়।
 */


function userProfile(name, city) { // 'name' and 'city' are Parameters
    console.log("Name: " + name + ", City: " + city);
}

userProfile("Hasan", "Dhaka"); // "Hasan" and "Dhaka" are Arguments


/**
 * ৩. মাল্টিপল প্যারামিটার এবং আনডিফাইনড (Undefined Behavior)
 * যদি আর্গুমেন্ট কম পাঠানো হয়, তবে জাভাস্ক্রিপ্ট বাকিগুলোকে 'undefined' ধরে নেয়।
 */
function test(a, b) {
    console.log("A is: " + a);
    console.log("B is: " + b);
}

test(5); 
// Output: 
// A is: 5
// B is: undefined


/**
 * ৪. ডিফল্ট প্যারামিটার (Default Parameters)
 * যদি ইউজার কোনো আর্গুমেন্ট না পাঠায়, তবে একটি ডিফল্ট মান কাজ করবে।
 */
function welcome(user = "Guest") {
    console.log("Welcome, " + user);
}

welcome(); // Output: Welcome, Guest
welcome("Hasan"); // Output: Welcome, Hasan


/**
 * ৫. কিছু ছোট কিন্তু দরকারি তথ্য (Details):
 * - Hoisting: ফাংশন ডিক্লেয়ার করার আগেই একে কল করা যায়।
 * - Naming Convention: ফাংশনের নাম সবসময় camelCase-এ হওয়া ভালো (যেমন: calculateTotal)।
 */