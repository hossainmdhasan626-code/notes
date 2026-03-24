/**
 * ৮৪. আধুনিক ব্রাউজার ইঞ্জিনের বিশ্বকোষ (The Browser Engine Encyclopedia)
 * ---------------------------------------------------------------
 * Hasan-er jonno shokol major browser-er internal data.
 */

const browserWorld = {
  google_chrome: {
    release_year: 2008,
    js_engine: "V8 (সরাসরি মেশিন কোড বানায়)",
    render_engine: "Blink (২০০৮ থেকে ২০১৩ পর্যন্ত WebKit ব্যবহার করত)",
    language: "C++ (পাওয়ারফুল মেমোরি কন্ট্রোলের জন্য)",
    specialty: "এটির V8 ইঞ্জিন জাভাস্ক্রিপ্ট দুনিয়ায় বিপ্লব এনেছে।"
  },
  
  apple_safari: {
    release_year: 2003,
    js_engine: "JavaScriptCore (ডাকনাম: Nitro)",
    render_engine: "WebKit (সব আধুনিক ইঞ্জিনের আদি পিতা)",
    language: "C++",
    specialty: "অ্যাপল ডিভাইসে ব্যাটারি এবং র‍্যাম সাশ্রয়ী পারফরম্যান্স।"
  },
  
  mozilla_firefox: {
    release_year: 2004 (ইঞ্জিন ১৯৯৬ থেকে শুরু),
    js_engine: "SpiderMonkey (পৃথিবীর প্রথম JS ইঞ্জিন)",
    render_engine: "Gecko / Quantum (২০১৭ থেকে নতুন ভার্সন)",
    language: "C++ এবং বর্তমানে Rust (নিরাপত্তার জন্য)",
    specialty: "ওপেন সোর্স এবং মেমোরি সেফটির জন্য Rust ল্যাঙ্গুয়েজ ব্যবহার।",
    firefox_truth: {
    status: "Hybrid (C++ + Rust)",
    reason: "পুরাতন কোড C++, কিন্তু নতুন এবং সিকিউর রেন্ডারিং পার্টগুলো Rust-এ লেখা।",
    benefit: "মেমোরি সেফটি এবং ক্রাশ হওয়ার সম্ভাবনা কমানো।"
  },
  },

  microsoft_edge: {
    release_year: 2015 (২০২০-এ Chromium-এ কনভার্ট হয়),
    edge_chromium_truth: {
    meaning: "নিজস্ব ইঞ্জিন (EdgeHTML) বাদ দিয়ে Google-এর V8 এবং Blink ইঞ্জিন গ্রহণ করা।",
    impact: "এখন Chrome আর Edge-এর মেমোরি হিট এবং অ্যাড্রেস প্রটোকল একদম এক।"
  },
    js_engine: "V8",
    render_engine: "Blink",
    language: "C++",
    specialty: "উইন্ডোজের সাথে হাই-অপ্টিমাইজড এবং ক্রোমের মতো ফিচার।"
  },

  engineering_logic: "সবাই আলাদা হলেও সবাই Web IDL এবং C++ আর্গুমেন্ট পাসিং প্রটোকল মেনে চলে।"
};

console.log("হাসান, তোমার ব্রাউজার ডেটাবেস এখন ১০০% কমপ্লিট!");