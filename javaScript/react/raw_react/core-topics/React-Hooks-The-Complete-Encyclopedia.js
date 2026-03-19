/**
 * ========================================================================
 * HASAN'S ULTIMATE REACT HOOKS ENCYCLOPEDIA (DEEP DIVE)
 * ========================================================================
 * রিয়্যাক্টের প্রতিটি হুক এখানে বিস্তারিতভাবে ব্যাখ্যা করা হয়েছে।
 */

// ------------------------------------------------------------------------
// CATEGORY 1: MOST USED HOOKS (প্রতিদিনের প্রজেক্টে লাগবেই)
// ------------------------------------------------------------------------

/**
 * ১. useState (Basic State Management) - [ES6+]
 * -------------------------------------------
 * IMPORT: import { useState } from 'react';
 * CONVENTION: [value, setValue] - প্রথমটি ডাটা, দ্বিতীয়টি ফাংশন('Setter Function')।
 * ফাংশনের নাম সবসময় 'set' দিয়ে শুরু করে ভেরিয়েবলের নাম উটপাখি (CamelCase) স্টাইলে লিখতে হয়।
 * * - কাজ: ফাংশনাল কম্পোনেন্টে ডেটা বা স্টেট ধরে রাখা।
 * - ইউনিক বিষয়: এটি যখন আপডেট হয়, রিয়্যাক্ট পুরো কম্পোনেন্টকে রি-রেন্ডার করে।
 * * USE CASE 1: ইনপুট ফিল্ড হ্যান্ডেল করা।
 * USE CASE 2: টগল (True/False) সুইচ।
 */

/**
 * SETTER FUNCTION (Deep Dive):
 * ---------------------------
 * - useState-এর ২য় প্যারামিটারকে 'Setter Function' বলে।
 * - এটি কল করলে রিয়্যাক্ট বুঝতে পারে যে কম্পোনেন্টকে রি-রেন্ডার করতে হবে।
 * - এটি 'Asynchronous' ভাবে কাজ করে, তাই সরাসরি স্টেটের পরেই নতুন ভ্যালু কনসোল করলে পুরনোটা দেখা যায়।
 */

/**
 * INITIAL STATE / DEFAULT VALUE (Deep Dive):
 * -----------------------------------------
 * - useState("") -> এখানে ব্র্যাকেটের ভেতরের অংশটি হলো 'Initial Value'।
 * - এটি শুধুমাত্র কম্পোনেন্টের প্রথম রেন্ডারে (Initial Render) ব্যবহৃত হয়।
 * - ডাটা টাইপ: এখানে তুমি যেকোনো ধরণের জাভাস্ক্রিপ্ট ডাটা টাইপ রাখতে পারো:
 * ১. Primitive: string, number, boolean (যেমন: useState(0), useState(true))
 * ২. Complex: object, array (যেমন: useState([]), useState({ name: "Hasan" }))
 * ৩. Null/Undefined: যদি শুরুতে কোনো ডাটা না থাকে (useState(null))
 * * - প্রো-টিপ (Lazy Initialization): 
 * যদি ইনিশিয়াল ভ্যালু বের করতে কোনো বড় ক্যালকুলেশন লাগে, তবে সরাসরি ভ্যালু না দিয়ে 
 * একটি ফাংশন দেওয়া যায়: useState(() => heavyCalculation())। 
 * এতে প্রতি রি-রেন্ডারে ওই ক্যালকুলেশন আর হবে না, শুধু প্রথমবার হবে।
 */

const [name, setName] = useState(""); // Example 1
const [isOpen, setIsOpen] = useState(false); // Example 2

/**
 * ২. useEffect (Side Effects Management) - [ES6+]
 * ---------------------------------------------
 * IMPORT: import { useEffect } from 'react';
 * CONVENTION: useEffect(() => { ... }, [dependencies]);
 * * - কাজ: API কল, সাবস্ক্রিপশন, বা DOM ম্যানিপুলেশন করা।
 * - ইউনিক বিষয়: এটি মাউন্ট, আপডেট এবং আনমাউন্ট (Cleanup) তিনটি কাজই করতে পারে।
 * * USE CASE 1: কম্পোনেন্ট লোড হওয়ার সময় API থেকে ডেটা আনা।
 * USE CASE 2: উইন্ডো রিসাইজ ইভেন্ট লিসেনার সেট করা।
 */
useEffect(() => {
  const timer = setInterval(() => console.log("Tick"), 1000);
  return () => clearInterval(timer); // Cleanup (মাস্ট)
}, []);

/**
 * ৩. useContext (Global State Access) - [ES6+]
 * ------------------------------------------
 * IMPORT: import { useContext } from 'react';
 * CONVENTION: const value = useContext(MyContext);
 * * - কাজ: প্রপ ড্রিলিং (Prop Drilling) ছাড়াই গ্লোবাল ডেটা এক্সেস করা।
 * - ইউনিক বিষয়: এটি Context API-কে অনেক সহজে ব্যবহারযোগ্য করে তোলে।
 * * USE CASE 1: ইউজার থিম (Dark/Light Mode) এক্সেস করা।
 * USE CASE 2: লগইন করা ইউজারের ইনফরমেশন সব কম্পোনেন্টে পাঠানো।
 */
const theme = useContext(ThemeContext);

// ------------------------------------------------------------------------
// CATEGORY 2: PERFORMANCE HOOKS (অ্যাপ ফাস্ট করার জন্য)
// ------------------------------------------------------------------------

/**
 * ৪. useMemo (Memoizing Values) - [ES6+]
 * -------------------------------------
 * IMPORT: import { useMemo } from 'react';
 * CONVENTION: const memoValue = useMemo(() => calculate(), [dependencies]);
 * * - কাজ: কোনো জটিল ক্যালকুলেশন বারবার না করে মেমোরিতে সেভ করে রাখা।
 * - ইউনিক বিষয়: এটি শুধু তখনই রান করে যখন এর ডিপেন্ডেন্সি চেঞ্জ হয়।
 * * USE CASE 1: বিশাল কোনো লিস্ট থেকে ডেটা ফিল্টার করা।
 * USE CASE 2: ভারী কোনো গাণিতিক হিসাব।
 */
const expensiveValue = useMemo(() => heavyCalculation(count), [count]);

/**
 * ৫. useCallback (Memoizing Functions) - [ES6+]
 * ------------------------------------------
 * IMPORT: import { useCallback } from 'react';
 * CONVENTION: const memoFunction = useCallback(() => { ... }, [dependencies]);
 * * - কাজ: ফাংশন যেন প্রতি রেন্ডারে নতুন করে তৈরি না হয় তা নিশ্চিত করা।
 * - ইউনিক বিষয়: এটি চাইল্ড কম্পোনেন্টের অপ্রয়োজনীয় রি-রেন্ডার রোধ করে।
 */
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, [dependency]);

// ------------------------------------------------------------------------
// CATEGORY 3: REF & DOM HOOKS
// ------------------------------------------------------------------------

/**
 * ৬. useRef (Direct DOM Access & Persistent Value)
 * -----------------------------------------------
 * IMPORT: import { useRef } from 'react';
 * CONVENTION: const myRef = useRef(initialValue); - এক্সেস করার সময় myRef.current ব্যবহার করতে হয়।
 * * - কাজ: সরাসরি কোনো DOM এলিমেন্ট ধরা অথবা এমন ভ্যালু রাখা যা রি-রেন্ডার ঘটাবে না।
 * * USE CASE 1: ইনপুট বক্সে অটো ফোকাস করা।
 * USE CASE 2: আগের রেন্ডারের কোনো ভ্যালু স্টোর করা।
 */
const inputRef = useRef(null);
// inputRef.current.focus();

// ------------------------------------------------------------------------
// CATEGORY 4: ADVANCED/LESS USED HOOKS (বিশেষ প্রয়োজনে)
// ------------------------------------------------------------------------

/**
 * ৭. useReducer (The State Engine) - [ES6+]
 * ----------------------------------------
 * IMPORT: import { useReducer } from 'react';
 * CONVENTION: const [state, dispatch] = useReducer(reducer, initialState);
 * * উপাদানসমূহ (Components):
 * ১. initialState: স্টেটের শুরুর মান (যেমন: খালি অ্যারে [] বা অবজেক্ট {})।
 * ২. reducer: এটি একটি মাস্টার ফাংশন যা ঠিক করে স্টেট "কীভাবে" আপডেট হবে।
 * ৩. dispatch: এটি একটি সিগন্যাল পাঠানোর ফাংশন যা দিয়ে আমরা রিয়্যাক্টকে বলি "কী করতে হবে"।
 * * - কাজ: যখন একটি স্টেটের ভেতর অনেক ধরণের কাজ (Actions) থাকে এবং লজিক জটিল হয়।
 * - সুবিধা: এটি স্টেট আপডেটের সব হিসাব-নিকাশ কম্পোনেন্টের বাইরে নিয়ে যায়, ফলে কোড পরিষ্কার থাকে।
 * * * * REAL PROJECT USE CASE (Shopping Cart):
 * * USE CASE 1: কার্টে নতুন প্রোডাক্ট যোগ করা (Add Item)।
 * * USE CASE 2: কার্ট থেকে কোনো প্রোডাক্ট মুছে ফেলা (Remove Item)।
 * * USE CASE 3: পুরো কার্ট একবারে খালি করা (Clear Cart)।
 */

// --- ১. Reducer Logic (এটি সাধারণত কম্পোনেন্টের বাইরে থাকে) ---
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload]; // নতুন ডেটা যোগ হলো
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload.id); // ফিল্টার করে বাদ দেওয়া হলো
    case 'RESET':
      return []; // স্টেট খালি করা হলো
    default:
      return state; // কোনো অ্যাকশন না মিললে বর্তমান স্টেট থাকবে
  }
};

// --- ২. কম্পোনেন্টের ভেতর ব্যবহার (Example) ---
/*
const [cart, dispatch] = useReducer(cartReducer, []);

const handleAdd = (item) => {
  // dispatch মানে হলো সিগন্যাল পাঠানো
  dispatch({ type: 'ADD_TO_CART', payload: item });
};
*/

/**
 * ইউনিক পার্থক্য (useState vs useReducer):
 * --------------------------------------
 * - useState: "আমি জানি নতুন ভ্যালু কী হবে, তাই সরাসরি সেট করে দিচ্ছি।"
 * - useReducer: "আমি জানি কী 'অ্যাকশন' করতে হবে (যেমন: ADD), কিন্তু স্টেট কীভাবে বদলাবে তা Reducer ফাংশন ঠিক করবে।"
 */
/**
 * ৮. useLayoutEffect (Pre-Paint Effect)
 * ------------------------------------
 * IMPORT: import { useLayoutEffect } from 'react';
 * * - কাজ: useEffect এর মতোই, কিন্তু এটি স্ক্রিনে ছবি আঁকার (Paint) ঠিক আগে রান হয়।
 * - ইউনিক: লেআউট মেজারমেন্টের জন্য এটি সেরা।
 */

/**
 * ৯. useImperativeHandle
 * ----------------------
 * IMPORT: import { useImperativeHandle } from 'react';
 * CONVENTION: useImperativeHandle(ref, () => ({ method() {} }));
 * * - কাজ: প্যারেন্ট কম্পোনেন্ট থেকে চাইল্ডের কোনো নির্দিষ্ট ফাংশনকে কন্ট্রোল করা।
 */

/**
 * ১০. useDebugValue
 * -----------------
 * IMPORT: import { useDebugValue } from 'react';
 * * - কাজ: কাস্টম হুক তৈরির সময় রিয়্যাক্ট ডেভ-টুলসে লেবেল দেওয়ার জন্য।
 */

// ------------------------------------------------------------------------
// CATEGORY 5: NEW HOOKS (REACT 18 & 19 - LATEST ES6+)
// ------------------------------------------------------------------------

/**
 * ১১. useTransition (React 18)
 * ---------------------------
 * IMPORT: import { useTransition } from 'react';
 * CONVENTION: const [isPending, startTransition] = useTransition();
 * * - কাজ: UI আপডেটকে দুই ভাগে ভাগ করা (Urgent vs Non-Urgent)।
 * - ব্যবহার: সার্চ ফিল্টারিং করার সময় টাইপিং যেন ল্যাগ না করে।
 */
const [isPending, startTransition] = useTransition();

/**
 * ১২. useDeferredValue (React 18)
 * ------------------------------
 * IMPORT: import { useDeferredValue } from 'react';
 * * - কাজ: কোনো ভ্যালুর আপডেটকে একটু পিছিয়ে দেওয়া (Throttle/Debounce এর মতো)।
 */

/**
 * ১৩. useId (React 18)
 * -------------------
 * IMPORT: import { useId } from 'react';
 * * - কাজ: সার্ভার এবং ক্লায়েন্টের মধ্যে ইউনিক আইডি জেনারেট করা (Accessibility এর জন্য)।
 */

/**
 * ১৪. useSyncExternalStore (React 18 - Rare)
 * -----------------------------------------
 * IMPORT: import { useSyncExternalStore } from 'react';
 * * - কাজ: এক্সটারনাল স্টোর (যেমন: ব্রাউজার API বা স্টোর ম্যানেজমেন্ট) এর সাথে সিঙ্ক করা।
 */

/**
 * ১৫. useInsertionEffect (React 18 - CSS-in-JS)
 * --------------------------------------------
 * IMPORT: import { useInsertionEffect } from 'react';
 * * - কাজ: স্টাইল ইনজেকশন করার জন্য (সাধারণত লাইব্রেরি ডেভেলপাররা ইউজ করে)।
 */

/**
 * ১৬. use (React 19 - Newest!)
 * ---------------------------
 * IMPORT: import { use } from 'react';
 * * - কাজ: প্রমিস (Promise) বা কনটেক্সট রিড করার একদম নতুন এবং স্মার্ট উপায়।
 * - এটি কন্ডিশনাললি বা লুপের ভেতরেও ব্যবহার করা যায় (যা অন্য হুক পারে না)।
 */

/**
 * ১৭. useOptimistic (React 19)
 * ---------------------------
 * IMPORT: import { useOptimistic } from 'react';
 * CONVENTION: const [optimisticState, addOptimistic] = useOptimistic(state);
 * * - কাজ: সার্ভারে ডেটা পাঠানোর আগেই UI-তে সাকসেস দেখানো (Optimistic UI)।
 */

/**
 * ১৮. useActionState / useFormStatus (React 19)
 * --------------------------------------------
 * IMPORT: import { useActionState } from 'react'; (Formerly useFormState)
 * * - কাজ: ফরম হ্যান্ডলিং এবং পেন্ডিং স্টেট দেখার জন্য স্পেশাল হুক।
 */

console.log("Hasan, keep this file as your Hooks Dictionary!");

/**
 * ========================================================================
 * HASAN'S DEEP DIVE: REACT ROUTER HOOKS (USE CASES & METHODS)
 * ========================================================================
 */

// ------------------------------------------------------------------------
// ১৯. useParams - [The Dynamic ID Hunter]
// ------------------------------------------------------------------------
/**
 * IMPORT: import { useParams } from 'react-router-dom';
 * CONVENTION: const { paramName } = useParams();
 * * কাজ: URL থেকে ডাইনামিক প্যারামিটার (যেমন /product/:id) বের করা।
 * USE CASE: ই-কমার্স সাইটে যখন ইউজার কোনো নির্দিষ্ট প্রোডাক্টে ক্লিক করে।
 */
const { id, category } = useParams();

// Real-world Example:
useEffect(() => {
  // URL যদি হয় /shop/electronics/101
  // id হবে '101' আর category হবে 'electronics'
  fetchProductDetails(id);
}, [id]);

// ------------------------------------------------------------------------
// ২০. useSearchParams - [The URL Query Engine]
// ------------------------------------------------------------------------
/**
 * IMPORT: import { useSearchParams } from 'react-router-dom';
 * CONVENTION: const [searchParams, setSearchParams] = useSearchParams();
 * * এটি শুধু ডাটা পড়ে না, এটি URL-কে একটি "মিনি স্টেট" হিসেবে ম্যানেজ করে।
 * মেথডসমূহ: get(), getAll(), set(), append(), delete(), has()
 */
const [searchParams, setSearchParams] = useSearchParams();

// USE CASE 1: Filtering & Sorting (The Most Common)
const sortBy = searchParams.get("sort"); // 'price' বা 'date' পড়া
const allTags = searchParams.getAll("tag"); // একই নামের একাধিক ভ্যালু পড়া (যেমন ?tag=js&tag=react)

// USE CASE 2: Updating URL (The 'Put' or 'Set' Logic)
const updateFilter = (newVal) => {
  // ১. set(): আগের সব মুছে শুধু এটা বসাবে
  searchParams.set("brand", "apple");

  // ২. append(): আগের গুলোর সাথে নতুন একটা যোগ করবে (একই কিউওয়ার্ডে একাধিক ভ্যালু)
  searchParams.append("color", "red");

  // ৩. delete(): ইউজার ফিল্টার রিমুভ করলে
  searchParams.delete("old-param");

  // ৪. has(): চেক করা এই ফিল্টারটা এখন আছে কি না
  if (searchParams.has("category")) {
    /* do something */
  }

  setSearchParams(searchParams); // ফাইনালি URL আপডেট করা
};

// ------------------------------------------------------------------------
// ২১. useNavigate - [The Programmatic Captain]
// ------------------------------------------------------------------------
/**
 * IMPORT: import { useNavigate } from 'react-router-dom';
 * CONVENTION: const navigate = useNavigate();
 * * কাজ: কোনো বাটন ক্লিক বা লজিকের ওপর ভিত্তি করে ইউজারকে অন্য পেজে পাঠানো।
 */
const navigate = useNavigate();

// USE CASE 1: Redirect after Action (Login/Signup/Payment)
const handleLogin = () => {
  // replace: true মানে হলো ইউজার ব্যাক বাটন চাপলে আর লগইন পেজে ফিরতে পারবে না।
  navigate("/dashboard", { replace: true });
};

// USE CASE 2: Passing Hidden Data (State)
// অনেক সময় আমরা URL-এ আইডি দেখাতে চাই না, কিন্তু অন্য পেজে ডাটা পাঠাতে চাই।
const goToProfile = () => {
  navigate("/profile", { state: { userId: 55, from: "home" } });
};

// USE CASE 3: Go Back / Forward
const goBack = () => navigate(-1); // ব্রাউজারের ব্যাক বাটনের মতো কাজ করবে।

// ------------------------------------------------------------------------
// ২২. useLocation - [The Inspector]
// ------------------------------------------------------------------------
/**
 * IMPORT: import { useLocation } from 'react-router-dom';
 * CONVENTION: const location = useLocation();
 * * কাজ: বর্তমান পেজের সব তথ্য (Path, State, Hash) আয়নার মতো দেখানো।
 */
const location = useLocation();

// USE CASE 1: Secret Data Recovery
// navigate দিয়ে পাঠানো 'state' এখানে ধরা যায়।
const secretId = location.state?.userId;

// USE CASE 2: Active Link Styling (Manual)
// মেনুবারে কোন লিংকটা এখন একটিভ তা বোঝার জন্য।
const isActive = location.pathname === "/about";

// USE CASE 3: Authentication Redirect
// ইউজার যদি লগইন না করে কোনো পেজে যায়, তবে লগইন পেজে পাঠিয়ে দেওয়া
// এবং লগইন শেষে তাকে আবার ওই পেজে ফিরিয়ে আনা।
const redirectPath = location.pathname; // বর্তমান পাথ সেভ করে রাখা

// ------------------------------------------------------------------------
// ২৩. useNavigation (v6.4+) - [The Global Loader Spy]
// ------------------------------------------------------------------------
/**
 * IMPORT: import { useNavigation } from 'react-router-dom';
 * * কাজ: পুরো অ্যাপে যখন ডাটা লোড হয় বা পেজ চেঞ্জ হয়, তখন তার স্ট্যাটাস জানা।
 * মেথড/প্রোপার্টি: state ("idle" | "submitting" | "loading"), formData, location
 */
const navigation = useNavigation();

// USE CASE: Global Loading Spinner
// যখনই ইউজার এক পেজ থেকে অন্য পেজে যাবে (যেখানে loader আছে),
// তখন এটি "loading" দেখাবে।
{
  navigation.state === "loading" && <p>বড় ডেটা লোড হচ্ছে, দাঁড়াও হাসান...</p>;
}

// ------------------------------------------------------------------------
// ২৪. useLoaderData & useActionData (v6.4+) - [The Data Specialists]
// ------------------------------------------------------------------------
/**
 * IMPORT: import { useLoaderData, useActionData } from 'react-router-dom';
 * * useLoaderData: পেজ আসার আগেই যে ডাটা ফেচ হয়েছে তা হাতে পাওয়া।
 * useActionData: ফর্ম সাবমিট করার পর সার্ভার থেকে আসা রেজাল্ট বা এরর পাওয়া।
 */
const products = useLoaderData(); // ডাটা সরাসরি চলে আসবে, useEffect লাগবে না।
const formError = useActionData(); // ভুল পাসওয়ার্ড দিলে সার্ভারের মেসেজ এখানে আসবে।
