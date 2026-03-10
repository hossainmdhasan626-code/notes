/**
 * 📂 async-js/01-promises.js
 * TOPIC: UNDERSTANDING PROMISES (THE FOUNDATION)
 * ---------------------------------------------------------
 * সংজ্ঞা: Promise হলো একটি অবজেক্ট যা ভবিষ্যতে কোনো একটি কাজের 
 * ফলাফল (সাফল্য বা ব্যর্থতা) দেওয়ার প্রতিশ্রুতি দেয়।
 */

// ১. প্রমিজের ৩টি অবস্থা (States):
// - Pending: কাজ এখনো চলছে।
// - Resolved (Fulfilled): কাজ সফলভাবে শেষ হয়েছে।
// - Rejected: কাজে কোনো ভুল হয়েছে বা ফেইল করেছে।

// ২. প্রমিজ তৈরির সিনট্যাক্স:
const myPromise = new Promise((resolve, reject) => {
    const success = true; 
    if (success) {
        resolve("কাজটি সফল হয়েছে! 🎉"); // সফল হলে resolve কল হয়
    } else {
        reject("দুঃখিত, কোনো সমস্যা হয়েছে। ❌"); // ব্যর্থ হলে reject কল হয়
    }
});

// ৩. প্রমিজ ব্যবহার করার নিয়ম (.then / .catch):
myPromise
    .then((data) => console.log(data))   // resolve হলে এখানে আসবে
    .catch((err) => console.error(err)); // reject হলে এখানে আসবে

/**
 * ৪. উদাহরণ ১: একটি কাস্টম ডিলে (Delay) ফাংশন
 */
const wait = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`${ms}ms সময় শেষ!`);
        }, ms);
    });
};
wait(2000).then(msg => console.log(msg));

/**
 * ৫. উদাহরণ ২: ডাটাবেস চেক করার সিমুলেশন
 */
const checkUser = (id) => {
    return new Promise((resolve, reject) => {
        if (id === 1) {
            resolve({ id: 1, name: "Hasan" });
        } else {
            reject("ইউজার খুঁজে পাওয়া যায়নি!");
        }
    });
};
checkUser(1).then(user => console.log(user)).catch(err => console.log(err));