/**
 * ==========================================================
 * TOPIC: REACT PROPS & ELEMENTS - THE ARCHITECT'S NOTE
 * ==========================================================
 * হাসান, এই ফাইলটি তোমার হাতের লেখা নোট এবং রিয়্যাক্টের কোর 
 * কনসেপ্টের একটি কম্বাইন্ড মাস্টার ফাইল।
 */

/* ১. রিয়্যাক্ট এলিমেন্ট ও প্রপস পাসিং (The True Flow)
   ----------------------------------------------------------
   হাসান, এখানে আসল মেকানিজমটা ৩টি ধাপে ঘটে:
*/

// ধাপ ১.১ (JSX): আমরা যা লিখি (মানুষের পড়ার জন্য)
// <Button text="Login" />

// ধাপ ১.২ (Transpilation): Vite বা Babel এটাকে ফাংশন কলে রূপান্তর করে
// React.createElement(Button, { text: "Login" })

// ধাপ ১.৩ (The Object/React Element): এই ফাংশনটি রান হওয়ার পর আউটপুট হিসেবে এই JS Object-টি দেয়
// { type: Button, props: { text: "Login" } }

/**
 * হাসান'স গাইডলাইন: 
 * "JSX হলো একটি ডিজাইন, createElement হলো সেই ডিজাইনের প্রসেসিং, 
 * আর অবজেক্টটি হলো সেই প্রসেসিংয়ের ফাইনাল রেজাল্ট—যা থেকে ভার্চুয়াল ডোম তৈরি হয়।"
 */
// JSX ইনপুট:
// <div className="container">
//    <Icon />
//    <Button text="Login" color="blue" />
// </div>

// ট্রান্সপাইলার আউটপুট (Babel/Vite যা করে):
// React.createElement("div", { className: "container" }, 
//   React.createElement(Icon, null), // ২য় ভ্যালু null মানে কোনো প্রপস নেই
//   React.createElement(Button, { text: "Login", color: "blue" })
// );

/* ২. মেমোরিতে এলিমেন্ট অবজেক্ট ও ভার্চুয়াল ডোম (The Reality)
   ------------------------------------------------------
   ভার্চুয়াল ডোম আসলে এই নেস্টেড জাভাস্ক্রিপ্ট অবজেক্ট ছাড়া আর কিছুই না।
*/

const nestedElementExample = {
    type: 'div',
    props: {
        className: 'container',
        children: [
            { type: Icon, props: {} }, // ১ম চাইল্ড
            { 
                type: Button, // ২য় চাইল্ড
                props: { text: 'Login', color: 'blue' } 
            }
        ]
    }
};


/**
 * ৩. প্রপস হ্যান্ডলিং এবং ডাইনামিক স্টাইল (Practical Usage)
 * ---------------------------------------------------
 */

// ক. Destructuring (🏆 Best Practice): সরাসরি প্যারামিটারে ভেঙে ফেলা।
const BestWay = ({ text, color }) => (
    <button style={{ backgroundColor: color }}>{text}</button>
);

// খ. Dynamic Classes (Tailwind Example): 
const DynamicTailwindWay = ({ bgColor, text }) => (
    <button className={`px-4 py-2 rounded bg-${bgColor}`}>{text}</button>
);

// গ. Default Values: ডাটা না আসলে সেফটি হিসেবে।
const SafeWay = ({ text = "Click Me" }) => <button>{text}</button>;

// ঘ. Props Object (Full Object Catch) - সব ডাটা একটি ভেরিয়েবলে ধরা।
// হাসান, অনেক সময় আমরা ডাটা না ভেঙে পুরো অবজেক্টটাকে 'props' নামে রিসিভ করি।
// এটি তখন দরকার হয় যখন আমাদের অনেকগুলো প্রপস একসাথে অন্য কোথাও পাস করতে হয়।

const GeneralWay = (props) => {
    // এখানে props হলো একটি অবজেক্ট { text: '...', color: '...' }
    return (
        <button style={{ backgroundColor: props.color }}>
            {props.text}
        </button>
    );
};

/* হাসান'স টিপ: 
   যখন তুমি 'props.something' লিখছো, তুমি সরাসরি মেমোরিতে থাকা 
   সেই এলিমেন্ট অবজেক্টের প্রপার্টিকে কল করছো।
*/

/**
 * ৪. স্পেশাল প্রপ: 'children' (The Wrapper Pattern)
 * -----------------------------------------------
 * ট্যাগের মাঝখানে যা পাঠানো হয়, রিয়্যাক্ট তাকে 'children' প্রপসে ঢুকিয়ে দেয়।
 */

const Card = ({ children }) => <div className="card-style">{children}</div>;

// ব্যবহার: <Card> <h1>Hasan</h1> </Card>


/**
 * ৫. হাসান'স স্পেশাল থিওরি: ইমিউটেবিলিটি ও মেমোরি (Pro Insights)
 * ---------------------------------------------------------
 * কেন প্রপস সরাসরি চেঞ্জ করা যায় না? (তোমার গারবেজ কালেকশন লজিক)
 */

/*
   - Immutability: রিয়্যাক্ট পুরনো অবজেক্ট না বদলে নতুন রেফারেন্স তৈরি করে।
   - Garbage Collection: পুরনো অবজেক্ট যখন আর দরকার হয় না, JS ইঞ্জিন (V8) 
     সেটিকে মেমোরি থেকে সরিয়ে দেয়।
   - Reference Check: নতুন অবজেক্ট মানেই নতুন মেমোরি অ্যাড্রেস। এতে রিয়্যাক্ট 
     খুব দ্রুত বুঝতে পারে যে তাকে রি-রেন্ডার করতে হবে।
*/


/**
 * ৬. মাইন্ডসেট: ইন্ডিপেনডেন্ট কম্পোনেন্ট (The Black Box Theory)
 * ---------------------------------------------------------
 * হাসান, তোমার মাইন্ডসেট হবে এমন: 
 * ১. কম্পোনেন্ট যেন বাইরের গ্লোবাল ডাটার ওপর নির্ভরশীল না হয়।
 * ২. একই প্রপস দিলে যেন প্রতিবার একই রেজাল্ট পাওয়া যায় (Pure Function)।
 * ৩. কম্পোনেন্ট হবে একটি 'প্লাগ-অ্যান্ড-প্লে' ডিভাইসের মতো।
 */

/* অতিরিক্ত তথ্য (যা তোমার নোটে থাকা জরুরি):
   - Key Prop: যখন আমরা 'children' কে অ্যারে হিসেবে পাঠাই, রিয়্যাক্ট প্রতিটি 
     চাইল্ডের জন্য একটি ইউনিক 'key' খোঁজে যাতে সে ডোম আপডেট আরও ফাস্ট করতে পারে।
   - Props Forwarding: অনেক সময় সব প্রপস (...props) দিয়ে অন্য এলিমেন্টে পাস করে দিতে হয়।
*/

console.log("Hasan, your integrated Master Note is ready in .js format!");