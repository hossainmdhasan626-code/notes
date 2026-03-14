/**
 * ==========================================================
 * TOPIC: JSX & THE ANATOMY OF REACT ELEMENTS
 * ==========================================================
 * হাসান, তোমার নোটের ওপর ভিত্তি করে এটি তৈরি। 
 * এখানে JSX-এর ক্ষমতা এবং এলিমেন্ট অবজেক্টের গঠন বিস্তারিত আছে।
 */

/* ১. JSX: HTML-এর মতো দেখতে হলেও যা আসলে HTML নয়
  --------------------------------------------------
  JSX (JavaScript XML) হলো একটি সিনট্যাক্টিক সুগার। 
  এর কিছু নির্দিষ্ট কনভেনশন আছে যা মেনে চলতে হয়:
  - Class-এর বদলে 'className' লিখতে হয়।
  - For-এর বদলে 'htmlFor' লিখতে হয়।
  - সব ট্যাগ অবশ্যই ক্লোজ করতে হয় (Self-closing tags included).
  - CamelCase ব্যবহার করতে হয় (যেমন: onclick -> onClick).
*/

/* ২. Interpolation: JSX-এর আসল ক্ষমতা
  -----------------------------------
  তুমি লিখেছ— "Interpolation মানে হলো স্ট্রিং বা টেক্সটের মাঝে { } ব্যবহার করে কিছু লিখা।"
  আসলে { } এর ভেতরে আমরা যেকোনো "JavaScript Expression" লিখতে পারি।
*/

const name = "Hasan";
const element = <h1>Hello, {name}</h1>; // এখানে {name} হলো ইন্টারপোলেশন।

/* ৩. The Conversion Journey (হাসান'স ফ্লো)
  ---------------------------------------
  JSX ──(Babel)──> React.createElement() ──> React Element (JS Object)
*/

// তুমি যা লিখছ (JSX):
// <h1 className="title">Hello World</h1>

// Babel যা বানাচ্ছে (Transpiled):
// React.createElement("h1", { className: "title" }, "Hello World");


/* ৪. Nested Element Object Structure (Deep Dive)
  ----------------------------------------------
  তুমি চেয়েছিলে একটি div, তার ভেতর Tailwind ক্লাস এবং আরও দুটি nested div থাকলে 
  অবজেক্টটা কেমন দেখাবে। নিচে তার একটি উদাহরণ:
*/

/**
 * JSX Structure:
 * <div className="flex p-4">
 * <div className="text-red">Child 1</div>
 * <div className="text-blue">Child 2</div>
 * </div>
 */

const nestedElementObject = {
    type: 'div',
    props: {
        className: 'flex p-4',
        children: [
            {
                type: 'div',
                props: {
                    className: 'text-red',
                    children: 'Child 1'
                }
            },
            {
                type: 'div',
                props: {
                    className: 'text-blue',
                    children: 'Child 2'
                } 
            }
        ]
    }
};


/* ৫. React Element Properties (Immutable Nature)
  ----------------------------------------------
  তোমার নোটের ২য় পৃষ্ঠার অত্যন্ত গুরুত্বপূর্ণ পয়েন্ট:
  "React elements are immutable." 
  - একবার এলিমেন্ট তৈরি হয়ে গেলে তার চাইল্ড বা প্রপস পরিবর্তন করা যায় না।
  - যদি UI আপডেট করতে হয়, তবে পুরো নতুন একটি এলিমেন্ট (New Object) তৈরি করতে হয়।
  - রিয়্যাক্ট এই নতুন অবজেক্টকে আগের অবজেক্টের (Snapshot) সাথে তুলনা করে 'Diffing' এর মাধ্যমে।
*/

/* ৬. The Workflow Summary (JSX to Virtual DOM)
  --------------------------------------------
  ১. Developer writes JSX.
  ২. Babel converts JSX to React.createElement() calls.
  ৩. Execution of these calls produces 'React Elements' (Plain JS Objects).
  ৪. These objects form the 'Virtual DOM Tree' (The Map in memory).
  ৫. React uses 'Reconciliation' to sync this tree with the Real DOM.
*/

console.log("Hasan, your 'JSX & Elements' deep dive is now documented!");