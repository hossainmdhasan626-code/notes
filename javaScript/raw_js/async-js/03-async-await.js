/**
 * 📂 async-js/03-async-await.js
 * TOPIC: ASYNC/AWAIT (THE MODERN WAY)
 * ---------------------------------------------------------
 * ব্যাখ্যা: এটি প্রমিজ হ্যান্ডেল করার সবথেকে পরিষ্কার উপায়। 
 * এটি কোডকে দেখতে সিঙ্ক্রোনাস কোডের মতো সহজ করে তোলে।
 */

// ১. নিয়ম: 
// - ফাংশনের আগে 'async' বসাতে হবে।
// - প্রমিজ লাইনের আগে 'await' বসাতে হবে।
// - এরর হ্যান্ডেল করতে 'try...catch' ব্লক ব্যবহার করতে হবে।

// ২. বেসিক উদাহরণ:
const loadData = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        console.log("Task:", data.title);
    } catch (err) {
        console.log("Error Caught:", err);
    }
};
loadData();

/**
 * ৩. উদাহরণ ১: প্রোফাইল ডাটা লোড করা (রিয়্যাক্ট স্টাইল)
 */
async function getUserProfile(id) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!res.ok) throw new Error("User not found!");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Profile Error:", error.message);
    }
}
getUserProfile(2).then(user => console.log("User:", user?.name));

/**
 * ৪. উদাহরণ ২: একাধিক এপিআই থেকে ডাটা আনা
 */
const getMultipleData = async () => {
    try {
        const [res1, res2] = await Promise.all([
            fetch('https://jsonplaceholder.typicode.com/posts/1'),
            fetch('https://jsonplaceholder.typicode.com/posts/2')
        ]);
        const post1 = await res1.json();
        const post2 = await res2.json();
        console.log("Posts loaded successfully.");
    } catch (err) {
        console.log("Failed to load multiple posts.");
    }
};