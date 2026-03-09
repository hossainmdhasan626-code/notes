/**
 * 🚀 DOM Event Propagation, Bubbling & Delegation
 * Author: Hasan
 * Topic: How Events Travel in Browser & How to Handle Them Smartly
 */

// =========================================================
// ১. Event Propagation (ইভেন্টের যাতায়াত)
// =========================================================
/* থিওরি: একটি ইভেন্ট যখন ঘটে, তখন এটি ৩টি ধাপে যাতায়াত করে:
১. Capturing Phase: Window থেকে নিচের দিকে (Target Element পর্যন্ত) নামা।
২. Target Phase: আসল এলিমেন্টে পৌঁছানো যেখানে ক্লিক হয়েছে।
৩. Bubbling Phase: এলিমেন্ট থেকে আবার উপরের দিকে (Window পর্যন্ত) ওঠা। [সবথেকে বেশি ব্যবহৃত]
*/

// =========================================================
// ২. Event Bubbling (নিচ থেকে উপরে ওঠা)
// =========================================================
// ডিফল্টভাবে জাভাস্ক্রিপ্টে সব ইভেন্ট "Bubble" করে।

const parent = document.querySelector('.parent');
const child = document.querySelector('.child');

// চাইল্ডে ক্লিক করলে সেটি বাবল হয়ে প্যারেন্টকেও জানাবে
child.addEventListener('click', (e) => {
    console.log("Child Clicked! 👦");
});

parent.addEventListener('click', (e) => {
    console.log("Parent Clicked! 👨 (Due to Bubbling)");
});

// --- 🔥 প্রো-টিপ: e.stopPropagation() ---
// যদি আপনি চান ক্লিকটি শুধুমাত্র চাইল্ডেই থাকুক, উপরে না যাক:
child.addEventListener('click', (e) => {
    e.stopPropagation(); // ⛔ বাবলিং থামিয়ে দিল। এখন প্যারেন্ট আর জানবে না।
    console.log("Child Only! No more Bubbling.");
});


// =========================================================
// ৩. Event Delegation (স্মার্ট কৌশল)
// =========================================================
/* কেন দরকার: যদি আপনার ১০০টি <li> থাকে, তবে ১০০টি লিসেনার না লিখে শুধু তাদের বাপ (Parent) <ul>-কে লিসেনার দেওয়া। 
এটি পারফরম্যান্স অনেক বাড়িয়ে দেয় এবং ডাইনামিক ডাটার জন্য বেস্ট।
*/

const listParent = document.querySelector('#todo-list');

// 🔥 হাই প্রায়োরিটি মেথড (High Priority)
listParent.addEventListener('click', (e) => {
    // e.target দিয়ে দেখা হয় আসলে কোন চাইল্ডে ক্লিক হয়েছে
    if (e.target.tagName === 'LI') {
        console.log("Clicked on:", e.target.innerText);
        e.target.classList.toggle('completed');
    }
});

/* সুবিধা: 
১. মেমোরি বাঁচে (১টি লিসেনার বনাম ১০০টি)।
২. নতুন কোনো <li> যোগ করলেও সেটি অটোমেটিক কাজ করবে।
*/


// =========================================================
// ৪. React-এ এর প্রয়োগ (React Concept)
// =========================================================
/*
রিয়্যাক্টে আমরা সরাসরি addEventListener লিখি না, কিন্তু e.stopPropagation() ঠিকই লাগে।
উদাহরণ: একটি মোডাল (Modal) বা ড্রপডাউন বন্ধ করার লজিক।
*/

const handleModalContentClick = (e) => {
    e.stopPropagation(); // মোডালের ভেতরের কন্টেন্টে ক্লিক করলে যেন মোডাল বন্ধ না হয়।
    console.log("Clicked inside modal content.");
};


// =========================================================
// ৫. পার্থক্য এক নজরে (Summary Table)
// =========================================================
/*
| টপিক | কাজ কী? | কেন শিখবো? |
| :--- | :--- | :--- |
| Propagation | পুরো রাস্তার ম্যাপ। | ব্রাউজার কীভাবে ইভেন্ট হ্যান্ডেল করে তা বুঝতে। |
| Bubbling | নিচ থেকে উপরে উঠা। | ইভেন্ট চেইনিং বুঝতে (এটি ডিফল্ট)। |
| Delegation | প্যারেন্টকে দায়িত্ব দেওয়া। | পারফরম্যান্স এবং ডাইনামিক এলিমেন্ট হ্যান্ডেল করতে। |
| stopPropagation | বাবলিং বন্ধ করা। | এক ক্লিকের কারণে অন্য জায়গায় ঝামেলা এড়াতে। |
*/