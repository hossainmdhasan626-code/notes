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

/**
 * ==========================================================
 * BEYOND TRANSLATION: VITE vs BABEL DEEP DIVE
 * ==========================================================
 * হাসান, এই ফাইলটি তোমাকে ইন্টারভিউতে অন্যদের থেকে আলাদা করবে।
 */

const architectureComparison = {
    babel_workflow: {
        nature: "Old School Bundler approach (Webpack/CRA)",
        step_1: "পুরো প্রজেক্টের সব ফাইল স্ক্যান করে।",
        step_2: "সব JSX-কে JS-এ ট্রান্সপাইল (Babel) করে।",
        step_3: "সব কোডকে একটা বিশাল ফাইলে (Bundle) প্যাকেট করে।",
        drawback: "প্রজেক্ট যত বড় হয়, সার্ভার স্টার্ট হতে তত বেশি সময় লাগে (ধীরগতি)।"
    },
    vite_workflow: {
        nature: "Modern 'Unbundled' approach (Native ESM)",
        step_1: "সার্ভার সাথে সাথে স্টার্ট হয় (বিন্দুমাত্র বান্ডেল না করে)।",
        step_2: "ব্রাউজার যখন কোনো নির্দিষ্ট ফাইল চায়, কেবল তখনই সেই ফাইলকে প্রসেস করে।",
        step_3: "ব্রাউজারের 'Native ESM' ক্ষমতা ব্যবহার করে সরাসরি ফাইল পাঠিয়ে দেয়।",
        advantage: "প্রজেক্ট ১ লাখ লাইনের হলেও স্টার্ট হতে মাত্র কয়েক মিলি-সেকেন্ড লাগে।"
    }
};

/* ----------------------------------------------------------
   ২ টার কাজের ধরণ: কী করে আর কী করে না?
   ---------------------------------------------------------- */

const whatTheyDo = {
    babel: {
        does: "এটি প্রতিটি কোড লাইনে গিয়ে চেক করে তার ব্যাকরণ ঠিক আছে কি না এবং পুরনো ব্রাউজারের উপযোগী বানায়।",
        does_not: "এটি নিজে কোনো সার্ভার চালায় না বা ফাইল ম্যানেজ করে না। এ শুধু একজন অনুবাদক।"
    },
    vite: {
        does: "এটি একটি বিল্ড টুল চেইন। এটি কোড ট্রান্সপাইল করে, সার্ভার চালায়, প্রজেক্ট বিল্ড করে।",
        does_not: "Vite নিজে কোড অনুবাদ করে না, সে esbuild বা SWC-কে দিয়ে কাজটা করিয়ে নেয়।"
    }
};

/* ----------------------------------------------------------
   ইঞ্জিন লেভেল ডিফারেন্স (The 'Speed' Secret)
   ---------------------------------------------------------- */

/**
 * হাসান, এখানে মূল পার্থক্যটা ইঞ্জিনে:
 * - Babel তৈরি হয়েছে JavaScript দিয়ে (Single threaded & Interpreted)।
 * - esbuild (যা Vite ব্যবহার করে) তৈরি Go ভাষায়, যা অনেক দ্রুত এবং Parallel কাজ করতে পারে।
 */

const speedStats = {
    babel: "সে ১ টি বড় কাজ শেষ করে পরেরটায় হাত দেয়।",
    vite_esbuild: "সে একই সাথে অনেকগুলো ফাইলকে প্রসেস করতে পারে (Multi-threading)।"
};

/* ----------------------------------------------------------
   সারসংক্ষেপ: রিয়্যাক্ট এলিমেন্ট কি সরাসরী তৈরি হয়?
   ----------------------------------------------------------
   হাসান, উত্তর হলো— না! 
   - Vite/Babel শুধু তোমার JSX কে বদলে 'React.createElement()' লিখে দেয়।
   - এই ফাংশনটা যখন ব্রাউজারে রান হয়, তখনই 'React Element' (Object) তৈরি হয়।
   - এরপর রিয়্যাক্ট লাইব্রেরি সেগুলো দিয়ে Virtual DOM এবং Reconciliation শুরু করে।
*/

const h_final_summary = "Babel হলো সূক্ষ্ম কারিগর, আর Vite হলো একটি আল্ট্রা-ফাস্ট স্মার্ট ল্যাব।";

console.log("Hasan, your 'JSX & Elements' deep dive is now documented!");