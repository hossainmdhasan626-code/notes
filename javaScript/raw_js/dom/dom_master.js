/**
 * 🚀 JavaScript DOM: Selectors & Events (Master Note)
 * Author: Hasan
 * Topics: Selectors, Events, Priority, ES6+
 */

// =========================================================
// পার্ট ১: Selectors (এলিমেন্ট ধরার উপায়)
// =========================================================

// --- 🔥 সবথেকে বেশি ব্যবহৃত (High Priority) ---

// ১. document.querySelector(selector) [ES5+]
// কেন: এটি সবথেকে আধুনিক এবং ফ্লেক্সিবল। আইডি, ক্লাস বা ট্যাগ সবই ধরা যায়।
const header = document.querySelector('#main-header'); // ID দিয়ে
const navItem = document.querySelector('.nav-link');  // প্রথম Class দিয়ে
// Example 2: ডাইনামিক ইনপুট ধরা
const emailField = document.querySelector('input[name="email"]');

// ২. document.querySelectorAll(selector) [ES5+]
// কেন: একই নামের সব এলিমেন্ট ধরার জন্য। এটি একটি NodeList দেয় যাতে সরাসরি forEach চালানো যায়।
const buttons = document.querySelectorAll('.btn-primary');
buttons.forEach(btn => btn.style.borderRadius = "5px");
// Example 2: সব লিস্ট আইটেম ধরা
const listItems = document.querySelectorAll('ul > li');

// ৩. document.getElementById(id) [ES3+]
// কেন: আইডি দিয়ে ধরার সবথেকে ফাস্ট উপায়।
const loginBtn = document.getElementById('login-btn');
loginBtn.innerText = "Log In Now";




// --- 🧊 কম ব্যবহৃত (Low Priority) ---

// ৪. document.getElementsByClassName(names)
// সমস্যা: এটি HTMLCollection দেয়, যাতে সরাসরি forEach চালানো যায় না (Array-তে কনভার্ট করতে হয়)।
const cards = document.getElementsByClassName('card');
Array.from(cards).map(card => card.style.border = "1px solid red");

// ৫. document.getElementsByTagName(name)
// কেন: সরাসরি HTML ট্যাগ (div, p, h1) দিয়ে সব এলিমেন্ট ধরার জন্য।
const allParagraphs = document.getElementsByTagName('p');


// =========================================================
// পার্ট ২: addEventListener (ইভেন্ট লিসেনার)
// =========================================================

const myBtn = document.querySelector('#action-btn');
const myInput = document.querySelector('#user-input');

// --- 🔥 সবথেকে বেশি ব্যবহৃত (High Priority) ---

// ১. 'click' - মাউস ক্লিক করলে
myBtn.addEventListener('click', (e) => {
    console.log("Button Clicked!", e.target);
});
// Example 2: কার্ডে ক্লিক করলে কালার চেঞ্জ
document.querySelector('.card')?.addEventListener('click', function() {
    this.style.backgroundColor = 'lightgray';
});

// ২. 'input' - ইনপুটে টাইপ করার সাথে সাথে (ES6+ প্রজেক্টে রিয়্যাক্টের মতো কাজ করে)
myInput.addEventListener('input', (e) => {
    console.log("Current Value:", e.target.value);
});
// Example 2: পাসওয়ার্ড লেন্থ চেক করা
myInput.addEventListener('input', (e) => {
    if(e.target.value.length < 6) console.log("Too short!");
});

// ৩. 'submit' - ফর্ম সাবমিট করার সময় (খুবই গুরুত্বপূর্ণ)
const myForm = document.querySelector('#login-form');
myForm?.addEventListener('submit', (e) => {
    e.preventDefault(); // পেজ রিলোড আটকানো (মাস্ট)
    console.log("Form Submitted!");
});

// ৪. 'DOMContentLoaded' - HTML পড়া শেষ হলে (Script ট্যাগের ঝামেলা এড়াতে)
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM is fully loaded and parsed");
});




// --- 🧊 কম ব্যবহৃত (Low Priority) ---

// ৫. 'mouseenter' & 'mouseleave' - হোভার (Hover) ইফেক্টের জন্য
myBtn.addEventListener('mouseenter', () => myBtn.style.opacity = '0.7');
myBtn.addEventListener('mouseleave', () => myBtn.style.opacity = '1');

// ৬. 'keyup' / 'keydown' - কীবোর্ড বাটন চাপা বা ছেড়ে দেওয়া
window.addEventListener('keyup', (e) => {
    if(e.key === "Escape") console.log("Escape pressed!");
});

// ৭. 'resize' - উইন্ডো ছোট-বড় করলে
window.addEventListener('resize', () => {
    console.log("Width:", window.innerWidth);
});


// =========================================================
// পার্ট ৩: Manipulation (ডাটা পরিবর্তন) [ES6+ Updates]
// =========================================================

const box = document.querySelector('.box');

// ১. classList (সবথেকে বেশি লাগে)
box.classList.add('active');    // ক্লাস যোগ
box.classList.toggle('hidden'); // থাকলে রিমুভ করবে, না থাকলে যোগ করবে (ম্যাজিক!)

// ২. style (সরাসরি CSS)
box.style.display = 'flex';
box.style.marginTop = '20px'; // CamelCase ব্যবহার করতে হয়

// ৩. attributes (ES6+ আধুনিক উপায়)
const link = document.querySelector('a');
link.setAttribute('href', 'https://google.com');
console.log(link.getAttribute('href'));