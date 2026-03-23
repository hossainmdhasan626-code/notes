/**
 *   e.target এর ক্ষমতা (The Power of Event Object)
 * -----------------------------------------------
 * ফোল্ডার: core-logic
 * ফাইল নাম: event-target-deep-dive.js
 * * মূল কথা: 'e.target' হলো সেই চাবিকাঠি যা দিয়ে আমরা ইনপুট ফিল্ডের 
 * ভেতরকার সব তথ্য (Attributes) বের করে আনতে পারি।
 */

import { useState } from 'react';

export default function EventTargetExample() {
  const [info, setInfo] = useState("");

  /**
   * হাসান, খেয়াল করো: 'e' হলো একটি অবজেক্ট (Synthetic Event)।
   * আর 'e.target' হলো সেই নির্দিষ্ট HTML এলিমেন্টটি যেটির ওপর ঘটনাটি (Event) ঘটেছে।
   */
  const handleEverything = (e) => {
    // ১. অবজেক্ট ডিস্ট্রাকচারিং (Object Destructuring)
    // আমরা সরাসরি e.target থেকে যা যা দরকার বের করে নিচ্ছি
    const { name, value, type, placeholder, id } = e.target;

    console.log("Input Name:", name);        // আউটপুট: "username"
    console.log("Input Value:", value);      // আউটপুট: যা টাইপ করেছ
    console.log("Input Type:", type);        // আউটপুট: "text"
    console.log("Placeholder:", placeholder);// আউটপুট: "আপনার নাম লিখুন"
    console.log("Element ID:", id);          // আউটপুট: "unique_id_101"

    setInfo(value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>ইভেন্ট টার্গেট ডীপ ডাইভ</h2>
      
      <input 
        name="username" 
        type="text" 
        id="unique_id_101" 
        placeholder="আপনার নাম লিখুন"
        onChange={handleEverything} 
      />

      <div style={{ marginTop: '20px', color: 'blue' }}>
        <strong>লাইভ রেজাল্ট:</strong> {info}
      </div>

      {/* নোট: e.target ব্যবহার করে আমরা ইনপুটের স্টাইলও পেতে পারি! */}
      <button onClick={(e) => console.log(e.target.tagName)}>
        আমার ট্যাগ নেম দেখো (কনসোলে)
      </button>
    </div>
  );
}

/**
 * হাসান'স ইনসাইট (কেন এটি ইম্পর্ট্যান্ট?):
 * -----------------------------------
 * ১. Access to Attributes: e.target শুধু ভ্যালুই দেয় না, এটি ইনপুটের 
 * 'name', 'id', 'type', 'placeholder' —সবকিছুর এক্সেস দেয়।
 * ২. Dynamic State Update: e.target.name ব্যবহার করেই আমরা ডাইনামিকভাবে 
 * স্টেট আপডেট করতে পারি: setFormData({...prev, [e.target.name]: e.target.value})।
 * ৩. Single Handler: এই একটা লজিক জানলে তোমার ফর্মে ১০টা ইনপুট থাকলেও 
 * তোমাকে ১০টা আলাদা ফাংশন লিখতে হবে না।
 */