/**
 * ==========================================================
 * TOPIC: THE SECRETS OF VIRTUAL DOM & RECONCILIATION
 * ==========================================================
 * হাসান, তোমার ৪ পৃষ্ঠার নোটের ওপর ভিত্তি করে এই ডকুমেন্টেশনটি তৈরি।
 * এখানে DOM-এর সীমাবদ্ধতা এবং রিয়্যাক্টের 'স্মার্ট' সলিউশন ব্যাখ্যা করা হয়েছে।
 */

/* ১. মিথ বনাম বাস্তবতা (Myth vs Reality):
  -----------------------------------
  তুমি নোটের শুরুতেই লিখেছো: "DOM আসলে স্লো না"। 
  বাস্তবতা: DOM (Document Object Model) একটি ডাটা স্ট্রাকচার হিসেবে খুব ফাস্ট। 
  আসল সমস্যা হলো 'Rendering Pipeline'। সামান্য এক লাইনের টেক্সট পাল্টালে ব্রাউজারকে 
  পুরো লেআউট মেপে (Reflow) আবার পিক্সেল আঁকতে (Repaint) হয়। এটিই হলো 'Expensive' কাজ।
*/

const theDOMProblem = {
    natureOfDOM: "DOM Operation is not slow, but DOM Painting is extremely expensive.",
    manualMistake: "Raw JS-এ আমরা বারবার DOM অপারেশন করি, যা বারবার Repainting ট্রিগার করে।",
    solution: "Batching - অনেকগুলো কাজ জমিয়ে একবার ব্রাউজারকে জানানো।"
};

/* ২. রিয়্যাক্ট কীভাবে কাজ করে? (How React Works):
  -------------------------------------------
  তোমার নোট অনুযায়ী ৩ নম্বর পৃষ্ঠার ব্যাখ্যা: 
  ইউজার বাটনে ক্লিক করলে রিয়্যাক্ট সরাসরি রিয়েল DOM-এ যায় না।
*/

const reactCompleteWorkflow = {
    // ধাপ ১: ব্লুপ্রিন্ট তৈরি (Creation)
    step1_Element: "React.createElement() ফাংশন কল হয় এবং এটি মেমোরিতে একটি ভ্যানিলা JS Object (React Element) তৈরি করে।",

    // ধাপ ২: ম্যাপ বা ট্রি তৈরি (Virtual DOM)
    step2_VirtualDOM: "এই এলিমেন্ট অবজেক্টগুলো একটার সাথে একটা যুক্ত হয়ে মেমোরিতে একটি পূর্ণাঙ্গ অবজেক্ট ট্রি বা Virtual DOM তৈরি করে।",

    // ধাপ ৩: রেন্ডারিং (Initial Render)
    step3_Rendering: "ReactDOM এই ভার্চুয়াল ডোম অবজেক্টগুলো দেখে দেখে প্রথমবারের মতো আসল HTML (Real DOM) তৈরি করে স্ক্রিনে দেখায়।",

    // ধাপ ৪: পরিবর্তন শনাক্তকরণ (State/Props Change)
    step4_Diffing: "যখনই ডাটা চেঞ্জ হয়, রিয়্যাক্ট নতুন একটি Virtual DOM snap তৈরি করে এবং 'Diffing Algorithm' দিয়ে পুরনো স্ন্যাপের সাথে তুলনা করে দেখে ঠিক কোথায় পরিবর্তন হয়েছে।",

    // ধাপ ৫: ফাইনাল আপডেট (Reconciliation)
    step5_Reconciliation: "পুরনো এবং নতুন ভার্চুয়াল ডোম-এর পার্থক্যের ওপর ভিত্তি করে রিয়্যাক্ট শুধুমাত্র ওই নির্দিষ্ট অংশটুকু আসল ডোম-এ আপডেট করে। এই পুরো প্রসেসটাই হলো Reconciliation।"
};


/* ৩. ডিফিং এবং রিকনসিলিয়েশন (The Big Two Words):
  ---------------------------------------------
  তুমি এই শব্দ দুটি হাইলাইট করতে বলেছ। ইন্টারভিউতে এগুলো গোল্ডেন ওয়ার্ডস।
*/

const technicalKeywords = {
    diffingAlgorithm: "এটি একটি O(n) অ্যালগরিদম যা দুটি ভার্চুয়াল ট্রির মধ্যে পার্থক্য খুঁজে বের করে।",
    reconciliation: "পুরো প্রসেসটি (পার্থক্য খুঁজে বের করা এবং শুধু সেইটুকু রিয়েল DOM-এ আপডেট করা) হলো রিকনসিলিয়েশন।"
};

/* ৪. ভার্চুয়াল ডোম কি স্লো? (Is Virtual DOM Slow?):
  ---------------------------------------------
  তোমার ৪ নম্বর পৃষ্ঠার দারুণ এক যুক্তি: "Virtual DOM কি রিয়েল DOM থেকে ফাস্ট?"
  উত্তর: না, ভার্চুয়াল ডোম টেকনিক্যালি রিয়েল ডোম থেকে ফাস্ট না, বরং এটি 'Fast Enough'।
*/

const performanceLogic = {
    overhead: "ভার্চুয়াল ডোম নিজে মেমোরি এবং ক্যালকুলেশন ব্যবহার করে, যা কিছুটা সময় নেয়।",
    victory: "কিন্তু রিয়েল ডোম যে পরিমাণ 'Repainting' করে সময় নষ্ট করতো, তার তুলনায় রিয়্যাক্টের ক্যালকুলেশন অনেক কম সময় নেয়।",
    summary: "It’s not about being faster than DOM; it’s about doing less work on the Real DOM."
};

/* হাসান, তোমার জন্য প্রফেশনাল টেকওয়ে (Summary for Interview):
  -------------------------------------------------------
  প্রশ্ন: কেন রিয়্যাক্ট ফাস্ট?
  উত্তর: রিয়্যাক্ট ফাস্ট কারণ সে **Batching** করে এবং **Virtual DOM** ব্যবহার করে 
  অপ্রয়োজনীয় **DOM Painting** কমিয়ে দেয়। সে **Diffing Algorithm** এর মাধ্যমে 
  শুধু সুনির্দিষ্ট পরিবর্তনটুকু (Patching) রিয়েল ডোমকে জানায়। 
*/

/**
 * HOW OBJECTS BECOME VIRTUAL DOM
 * ------------------------------
 */

const mechanism = {
    step_1: "React.createElement() একটি ভ্যানিলা জেএস অবজেক্ট (React Element) রিটার্ন করে।",
    
    step_2: "কম্পোনেন্ট নেস্টিং এর ফলে, একটি এলিমেন্টের 'props' এর ভেতরে 'children' নামক প্রপার্টিতে অন্য এলিমেন্ট অবজেক্টগুলো রেফারেন্স হিসেবে জমা হয়।",
    
    step_3: "এই নেস্টেড অবজেক্টগুলো একে অপরের সাথে যুক্ত হয়ে মেমোরিতে একটি হাইয়ারার্কিক্যাল (Hierarchical) 'Tree' গঠন করে।",
    
    result: "এই বিশাল এবং নেস্টেড ভ্যানিলা জেএস অবজেক্ট ট্রি-টিই হলো Virtual DOM।"
};

/* হাসান, এক কথায়: 
   React Element হলো ইটের মতো, আর ভার্চুয়াল ডোম হলো সেই ইট দিয়ে বানানো একটা দালানের নকশা (Blueprint)।
*/

/**
 * WHAT IS THE REAL DOM MADE OF?
 * ----------------------------
 */

const realDOMReality = {
    composition: "ব্রাউজারের ইন্টারনাল ইঞ্জিন দ্বারা তৈরি C++ Nodes (HTML এর রিপ্রেজেন্টেশন)।",
    creation: "React এর Virtual DOM থেকে নির্দেশ পেয়ে ব্রাউজার API এর মাধ্যমে এটি তৈরি হয়।",
    bottleneck: "এর মূল সমস্যা এটি তৈরির পর 'Layout' এবং 'Painting' প্রসেস ট্রিগার করে, যা সময় নেয়।"
};

/* হাসান, তোমার জন্য সারসংক্ষেপ:
   ভার্চুয়াল ডোম হলো 'প্ল্যান' (JS Object)।
   রিয়েল ডোম হলো 'আসল বিল্ডিং' (C++ Nodes)।
*/

console.log("Virtual DOM (Plan) builds the Real DOM (Final Structure).");

/**
 * QUICK FLOW: VIRTUAL DOM
 * -----------------------
 * JSX -> Babel -> React Element (JS Object) -> Virtual DOM (Snapshot)
 * * Update Triggered -> New Snapshot -> Diffing (Old vs New) 
 * -> Reconciliation -> Real DOM (UI Update)
 */

const flowSecret = "Virtual DOM is JS's way to minimize the heavy work of Browser's C++ engine.";

console.log("Hasan, your notes are successfully converted to a Professional JS Guide!");