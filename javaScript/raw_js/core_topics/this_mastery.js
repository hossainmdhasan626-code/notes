/**
 * =========================================================================
 * FILE: this_mastery.js
 * TOPIC: THE COMPLETE GUIDE TO 'this' KEYWORD IN JAVASCRIPT
 * =========================================================================
 * * ১. 'this' আসলে কী? (What is 'this'?)
 * - 'this' একটি কিউওয়ার্ড যা বর্তমান এক্সিকিউশন কনটেক্সট (Execution Context)-কে বোঝায়।
 * - সহজ কথায়: "কে কাজটা করছে?" বা "কার প্রোপার্টি ব্যবহার করা হচ্ছে?"—তা নির্দিষ্ট করাই এর কাজ।
 * - এটি কোডকে Dynamic এবং Reusable করতে সাহায্য করে।
 */

// ২. গ্লোবাল কনটেক্সট (Global Context)
// কোনো ফাংশনের বাইরে একা 'this' লিখলে সেটি গ্লোবাল অবজেক্টকে বোঝায়।
console.log("Global this:", this); // ব্রাউজারে এটি 'window' অবজেক্ট।


/**
 * ৩. অবজেক্ট মেথডে 'this' (Object Methods)
 * যখন কোনো মেথড (অবজেক্টের ভেতরের ফাংশন) কল করা হয়, তখন 'this' মানে ওই অবজেক্টটি।
 */
const user = {
    username: "Hasan",
    greet: function() {
        console.log("Hello, I am " + this.username); // 'this' এখানে 'user' অবজেক্ট।
    }
};
user.greet();





/**
 * ৪. নেস্টেড ফাংশনের সমস্যা (The Nested Function Problem)
 * নরমাল ফাংশনের ভেতর আরেকটি নরমাল ফাংশন থাকলে, ভেতরের জন তার প্যারেন্টকে চেনে না।
 * সে সরাসরি 'window' অবজেক্টকে 'this' হিসেবে ধরে নেয়।
 */
const computer = {
    brand: "Apple",
    start: function() {
        // এখানে 'this' হলো 'computer'
        const process = function() {
            console.log("Inner Normal Function:", this.brand); 
            // Output: undefined (কারণ এখানে 'this' হলো 'window')
        };
        process(); // Simple function call সবসময় window-কে ধরে।
    }
};
computer.start();


/**
 * ৫. অ্যারো ফাংশন এবং 'this' (Arrow Functions - The Hero)
 * অ্যারো ফাংশনের নিজস্ব কোনো 'this' নেই। সে তার বাইরের (Parent) ফাংশনের 
 * 'this'-কে ধার করে ব্যবহার করে। একে Lexical 'this' বলে।
 */
const smartphone = {
    model: "iPhone",
    start: function() {
        const process = () => {
            console.log("Inner Arrow Function:", this.model); 
            // Output: iPhone (কারণ সে প্যারেন্ট 'start' এর 'this' ব্যবহার করছে)
        };
        process();
    }
};
smartphone.start();





/**
 * ৬. ডম ইভেন্ট হ্যান্ডলারে 'this' (DOM Event Listeners)
 * যখন কোনো HTML এলিমেন্টে (যেমন বাটন) ক্লিক করা হয়, তখন 'this' মানে সেই এলিমেন্টটি।
 */
// উদাহরণ (ব্রাউজারে কাজ করবে):
/*
button.addEventListener('click', function() {
    console.log(this); // আউটপুট: <button> এলিমেন্টটি
    this.style.color = "red"; 
});
*/


/**
 * ৭. এক্সপ্লিসিট বাইন্ডিং (Explicit Binding: Call, Apply, Bind)
 * যখন আমরা জোর করে কোনো ফাংশনকে বলি— "তোমার 'this' হবে অমুক অবজেক্ট", তখন এগুলো লাগে।
 */
function showInfo(city) {
    console.log(this.name + " lives in " + city);
}

const person1 = { name: "Abir" };
const person2 = { name: "Hasan" };

showInfo.call(person1, "Dhaka");  // Abir lives in Dhaka
showInfo.call(person2, "Narayanganj"); // Hasan lives in Narayanganj


/**
 * ৮. কনস্ট্রাক্টর ফাংশন (Constructor Functions)
 * যখন 'new' কিউওয়ার্ড দিয়ে নতুন অবজেক্ট বানানো হয়, তখন 'this' মানে ওই নতুন অবজেক্ট।
 */
function Player(n) {
    this.playerName = n;
}
const p1 = new Player("Sakib");
console.log(p1.playerName); // Sakib


/**
 * সারসংক্ষেপ (Summary Table):
 * -------------------------------------------------------------------------
 * কোথায় ব্যবহার করছি?       | 'this' এর মান কী হবে?
 * -------------------------------------------------------------------------
 * ১. গ্লোবাল বা একা         | window অবজেক্ট
 * ২. অবজেক্ট মেথডে          | ওই নির্দিষ্ট অবজেক্টটি
 * ৩. সাধারণ ফাংশন কলে      | window (Strict mode-এ undefined)
 * ৪. অ্যারো ফাংশনে           | বাইরের (Parent) ফাংশনের 'this'
 * ৫. ইভেন্ট লিসেনারে         | যে এলিমেন্টে ক্লিক করা হয়েছে
 * ৬. 'new' কিউওয়ার্ডে        | নতুন তৈরি হওয়া অবজেক্টটি
 * -------------------------------------------------------------------------
 */