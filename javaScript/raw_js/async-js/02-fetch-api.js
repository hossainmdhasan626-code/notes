/**
 * 📂 async-js/02-fetch-api.js
 * TOPIC: FETCH API & PROMISE CHAINING (.then)
 * ---------------------------------------------------------
 * ব্যাখ্যা: fetch() একটি বিল্ট-ইন ফাংশন যা প্রমিজ রিটার্ন করে। 
 * এটি দিয়ে আমরা এপিআই থেকে ডাটা আনি।
 */

// ১. কেন দুটি .then()? 
// - ১ম .then: সার্ভারের রেসপন্স অবজেক্ট (Raw Data) ধরার জন্য।
// - ২য় .then: ডাটাকে JSON-এ রূপান্তর করে আসল ডেটা ধরার জন্য।

// ২. বেসিক সিনট্যাক্স:
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json()) // json() নিজেও একটি প্রমিজ
    .then(data => console.log(data))
    .catch(err => console.log("Network Error:", err));

/**
 * ৩. উদাহরণ ১: ইউজারের নাম এবং ইমেইল আনা
 */
fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => {
        if (!res.ok) throw new Error("Status code error!"); // ৪শে ৪ বা ৫০০ এরর হ্যান্ডেল করা
        return res.json();
    })
    .then(user => console.log(`Name: ${user.name}, Email: ${user.email}`))
    .catch(err => console.log(err));

/**
 * ৪. উদাহরণ ২: পোস্টের লিস্ট আনা
 */
fetch('https://jsonplaceholder.typicode.com/posts?_limit=2')
    .then(res => res.json())
    .then(posts => {
        posts.forEach(post => console.log("Post Title:", post.title));
    })
    .catch(err => console.log("Failed to load posts"));