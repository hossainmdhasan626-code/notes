/**
 *  The Lifecycle of Data: Lifting State Up & Execution Context
 * -----------------------------------------------------------
 * এই নোটটি জাভাস্ক্রিপ্টের Call Stack এবং রিঅ্যাক্টের Re-render-এর 
 * গভীর সম্পর্ক ব্যাখ্যা করে। (হাসানের স্পেশাল ডিপ ডাইভ নোট)
 */

/**
 * ১. বেসিক কনসেপ্ট (Lifting State Up):
 * -------------------------------
 * - যখন দুটি ভাই-বোন (Sibling) কম্পোনেন্টের একই ডাটা লাগে, তখন আমরা ডাটাটিকে 
 * তাদের কমন প্যারেন্টে (Parent) নিয়ে যাই।
 * - রিঅ্যাক্টে ডাটা সবসময় ওপর থেকে নিচে (One-way Data Flow) যায়।
 */

/**
 * ২. ইন-ডেপথ লজিক (Execution Context & Call Stack):
 * -----------------------------------------------
 * হাসান, তুমি যা ভেবেছ তা এখানে স্টেপ-বাই-স্টেপ ব্যাখ্যা করা হলো:
 * * ক) Initial Render:
 * 1. প্রথমে GEC (Global Execution Context) তৈরি হয়।
 * 2. কল স্ট্যাকে 'Calculator' (Parent) ফাংশনটি আসে।
 * 3. Calculator রান করার সময় 'TemperatureInput' (Child 1) কে কল করে। 
 * এখন স্ট্যাকে Calculator-এর ওপর TemperatureInput বসে।
 * 4. এরপর 'BoilingVerdict' (Child 2) কল হয় এবং স্ট্যাকে আসে। কাজ শেষ করে তারা Pop-out হয়ে যায়।
 * * খ) The State Update (The Twist):
 * 1. যখন ইউজার ইনপুট দেয়, 'TemperatureInput' তার কাজ শেষ করে Pop-out হওয়ার ঠিক আগে 
 * প্যারেন্টের থেকে আসা 'setTemperature' ফাংশনটি কল করে ডাটা পাঠিয়ে দেয়।
 * 2. এই ডাটাটি সরাসরি Calculator-এর 'State Memory'-তে গিয়ে জমা হয়।
 * * গ) The Re-render Cycle (The 'Kecal'):
 * - স্ট্যাক থেকে চাইল্ড Pop-out হয়ে গেলেও প্যারেন্ট (Calculator) কিন্তু সাথে সাথে 
 * অন্য চাইল্ডকে ডাটা দিতে পারে না। 
 * - কারণ রিঅ্যাক্ট যখন দেখে 'State' আপডেট হয়েছে, সে পুরো 'Calculator' ফাংশনটিকে 
 * আবারও 'Call' করে (Re-render)।
 * - এবার দ্বিতীয়বার রান করার সময় Calculator নতুন ডাটাটি হাতে নিয়ে রান করে এবং 
 * 'BoilingVerdict'-কে নতুন ডাটা 'Argument' হিসেবে পাস করে।
 */

// --- ৩. কোড স্ট্রাকচার ও লজিক ফ্লো ---

function TemperatureInput({ temp, onUpdate }) {
  // ১. ইউজার টাইপ করলে এই ফাংশনটি প্যারেন্টের মেমোরিতে সিগন্যাল পাঠায়
  return <input value={temp} onChange={(e) => onUpdate(e.target.value)} />;
}

function BoilingVerdict({ celsius }) {
  // ৪. সেকেন্ড রেন্ডারে এই চাইল্ডটি নতুন ডাটা পায় এবং স্ক্রিন আপডেট করে
  return <p>{celsius >= 100 ? "পানি ফুটছে" : "ঠান্ডা পানি"}</p>;
}

export default function Calculator() {
  // ২. এই স্টেটটি হলো লজেন্স, যা বড় ভাইয়ের (Parent) পকেটে আছে
  const [temp, setTemp] = useState('');

  // ৩. স্টেট আপডেট হলে রিঅ্যাক্ট এই পুরো Calculator ফাংশনটিকে আবার কল করে
  return (
    <div>
      <TemperatureInput temp={temp} onUpdate={(val) => setTemp(val)} />
      <BoilingVerdict celsius={parseFloat(temp)} />
    </div>
  );
}

/**
 * ৪. হাসানের সামারি নোট (Basic to Advanced):
 * --------------------------------------
 * - চাইল্ড থেকে প্যারেন্টে ডাটা যাওয়ার সময় চাইল্ড ফাংশন স্ট্যাক থেকে বিদায় নেওয়ার 
 * আগেই ডাটা "পাস" করে দেয়।
 * - রিঅ্যাক্ট ডাটা পাওয়ার পর পুরো প্যারেন্টকে আবার রেন্ডার করে নতুন 'Execution Context' তৈরি করে।
 * - রিঅ্যাক্টের 'One-way data flow' বজায় থাকে কারণ ডাটা সবসময় প্যারেন্ট থেকে 
 * আর্গুমেন্ট হিসেবেই নিচে নামে। চাইল্ড কখনো সরাসরি প্যারেন্টের মেমোরি বদলাতে পারে না, 
 * সে শুধু একটা "অনুরোধ" (Function Call) পাঠাতে পারে।
 */

/**
 * Callback Function & State Lifting:
 * ----------------------------------
 * ১. Role: প্যারেন্ট যখন তার 'State Setter' ফাংশনটি চাইল্ডকে দেয়, 
 * সেটি চাইল্ডের কাছে একটি 'Callback' হিসেবে কাজ করে।
 * * ২. Data Flow: 
 * Parent (Owner of Logic) --> Child (Receiver of Callback)
 * Child (Executes Callback) --> Parent (Updates State)
 * * ৩. Execution Context: কলব্যাক ফাংশনটি যখন চাইল্ডের ভেতর কল হয়, 
 * সে তখনও তার জন্মস্থান (Parent's Scope) মনে রাখে (যাকে JS-এ Closure বলে)। 
 * এই কারণেই সে প্যারেন্টের স্টেট বদলে দিতে পারে।
 */