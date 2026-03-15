/**
 * ==========================================================
 * TOPIC: REACT EVENT HANDLING (THE COMPLETE GUIDE)
 * ==========================================================
 * হাসান, রিয়্যাক্টে ইভেন্ট হ্যান্ডলিং মানেই হলো কলব্যাক এবং ক্লোজারের খেলা।
 */

/**
 * ১. ফাংশন পাসিং বনাম কলিং (The Pitfall ⚠️)
 * -----------------------------------------
 * হাসান, এখানে 'handleClick' হলো একটি কলব্যাক ফাংশন।
 */
// সঠিক (Passing a callback): onClick={handleClick} 
// ভুল (Calling immediately): onClick={handleClick()}

/**
 * ২. প্রপস হিসেবে ইভেন্ট হ্যান্ডলার পাঠানো (Callback in Action)
 */
function Button({ onClick, children }) {
    // এখানে 'onClick' প্রপসটি একটি কলব্যাক ফাংশন হিসেবে কাজ করছে
    return <button onClick={onClick}>{children}</button>;
}

/**
 * ৩. ইভেন্ট প্রোপাগেশন ও স্টপ প্রোপাগেশন (Bubbling 🫧)
 */
function StopPropagationButton({ onClick, children }) {
    return (
        <button onClick={e => {
            e.stopPropagation(); 
            onClick(); // এই 'onClick' একটি কলব্যাক ফাংশন যা প্যারেন্ট থেকে এসেছে
        }}>
            {children}
        </button>
    );
}

/**
 * ৪. ইভেন্ট হ্যান্ডলার ও ক্লোজার (The Closure Connection 🧠)
 * ---------------------------------------------------
 * হাসান, যখন একটি ইভেন্ট হ্যান্ডলার তার বাইরের স্কোপের ভেরিয়েবল ব্যবহার করে,
 * তখনই সেখানে ক্লোজার তৈরি হয়।
 */
function AlertButton({ message, children }) {
    // এখানে 'handleClick' একটি ক্লোজার। 
    // কারণ এটি 'message' ভেরিয়েবলটিকে তার স্মৃতিতে আটকে রেখেছে।
    const handleClick = () => {
        alert(message); 
    };

    return <button onClick={handleClick}>{children}</button>;
}



/**
 * ৫. ডিফল্ট আচরণ বন্ধ করা (e.preventDefault) ✋
 */
export function SignupForm() {
    return (
        <form onSubmit={e => {
            e.preventDefault(); 
            alert('Submitting form!');
        }}>
            <input />
            <button>Send</button>
        </form>
    );
}

/**
 * ==========================================================
 * ৬. ডেডিকেটেড সেকশন: কলব্যাক এবং ক্লোজার বিশ্লেষণ
 * ==========================================================
 */

/**
 * ক. কেন এটি কলব্যাক (Callback)?
 * ----------------------------
 * রিয়্যাক্টে ইভেন্ট হ্যান্ডলারগুলো হলো কলব্যাক ফাংশন। 
 * উদাহরণ: <button onClick={() => console.log('Hi')}>
 * এখানে () => console.log('Hi') একটি কলব্যাক। কারণ এটি সাথে সাথে রান হচ্ছে না, 
 * রিয়্যাক্ট একে 'কল' করার জন্য ধরে রেখেছে (Hold করে রেখেছে)।
 */

/**
 * খ. কখন এবং কীভাবে ক্লোজার (Closure) তৈরি হয়?
 * -----------------------------------------
 * হাসান, ক্লোজার চেনার সহজ উপায়:
 * ১. ফাংশনের ভেতরে আরেকটি ফাংশন থাকতে হবে (যেমন কম্পোনেন্টের ভেতর হ্যান্ডলার)।
 * ২. ভেতরের ফাংশনটি যদি বাইরের কোনো ভেরিয়েবল (Props বা State) ব্যবহার করে।
 */

// ক্লোজার উদাহরণ:
function Counter({ step }) {
    const handleIncrement = () => {
        // 'step' বাইরে থেকে আসছে। handleIncrement একে 'Close over' করে রেখেছে।
        // তাই এটি একটি ক্লোজার।
        console.log("Incrementing by:", step);
    };
    return <button onClick={handleIncrement}>Add</button>;
}

// ক্লোজার নয় এমন উদাহরণ:
const simpleClick = () => console.log("No closure here!");
// কারণ এটি কোনো বাইরের ডাইনামিক ডাটা (Props/State) ব্যবহার করছে না।



/**
 * ==========================================================
 * হাসান'স মাস্টার সামারি (আপডেটেড):
 * ==========================================================
 * ১. ইভেন্ট হ্যান্ডলার = একটি কলব্যাক ফাংশন যা ক্লিকের অপেক্ষায় থাকে।
 * ২. ক্লোজার = যখন হ্যান্ডলার ফাংশনটি প্রপস বা স্টেটকে "মনে রাখে"।
 * ৩. ইনলাইন অ্যারো ফাংশন () => ... সবসময় একটি নতুন কলব্যাক তৈরি করে।
 * ৪. e.stopPropagation() বাবলিং থামায়, e.preventDefault() রিলোড থামায়।
 */

console.log("Hasan, your Deep Dive with Callback & Closure is ready!");