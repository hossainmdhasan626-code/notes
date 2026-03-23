/**
 *  Performance Optimization (রিঅ্যাক্ট অ্যাপকে ফাস্ট করার কৌশল)
 * ---------------------------------------------------------
 * ফোল্ডার: core-logic
 * ফাইল নাম: performance-optimization-fundamentals.js
 * * মূল লক্ষ্য: অপ্রয়োজনীয় Re-render কমানো এবং মেমোরি বাঁচানো।
 */

import React, { useState, useMemo, useCallback, memo } from 'react';

/**
 * ১. React.memo (কম্পোনেন্ট মেমোরি):
 * -----------------------------
 * রিঅ্যাক্টে প্যারেন্ট রেন্ডার হলে চাইল্ডও রেন্ডার হয়। 
 * 'memo' ব্যবহার করলে চাইল্ড শুধু তখনই রেন্ডার হবে যখন তার 'Props' বদলাবে।
 */
const ExpensiveChild = memo(({ count }) => {
  console.log("চাইল্ড রেন্ডার হচ্ছে...");
  return <p>কাউন্ট: {count}</p>;
});

/**
 * ২. useMemo (ভ্যালু মেমোরি):
 * -----------------------
 * যখন কোনো জটিল ক্যালকুলেশন থাকে যা বারবার করার দরকার নেই, 
 * তখন 'useMemo' সেই রেজাল্টটি মনে রাখে।
 */

export default function OptimizationMaster() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // এই ক্যালকুলেশনটি শুধু তখনই হবে যখন 'count' বদলাবে। 
  // 'text' টাইপ করলে এটি আর রান হবে না।
  const expensiveResult = useMemo(() => {
    console.log("জটিল হিসাব চলছে...");
    return count * 1000;
  }, [count]);

  /**
   * ৩. useCallback (ফাংশন মেমোরি):
   * ---------------------------
   * রিঅ্যাক্টে প্রতি রেন্ডারে নতুন ফাংশন তৈরি হয়। 
   * 'useCallback' ফাংশনটিকে মেমোরিতে ধরে রাখে যাতে চাইল্ড কম্পোনেন্ট 
   * মনে না করে যে এটি একটি নতুন প্রপস।
   */
  const handleReset = useCallback(() => {
    setCount(0);
  }, []); // ডিপেন্ডেন্সি খালি, মানে এটি একবারই তৈরি হবে।

  return (
    <div style={{ padding: '20px' }}>
      <h1>অপ্টিমাইজেশন মাস্টার</h1>
      <p>হিসাব: {expensiveResult}</p>
      
      <button onClick={() => setCount(count + 1)}>কাউন্ট বাড়ান</button>
      
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="এখানে টাইপ করলে চাইল্ড রেন্ডার হবে না"
      />

      <ExpensiveChild count={count} onReset={handleReset} />
    </div>
  );
}

/**
 * ৪. হাসানের ইন্টারভিউ নোট (Short & Sharp):
 * --------------------------------------
 * ১. কখন অপ্টিমাইজ করবে?: সব সময় নয়! যখন দেখবে অ্যাপ স্লো হচ্ছে বা 
 * অপ্রয়োজনীয় বড় বড় কম্পোনেন্ট রেন্ডার হচ্ছে, তখনই এগুলো ব্যবহার করো।
 * ২. Reconciliation: রিঅ্যাক্ট ভার্চুয়াল ডম ব্যবহার করে শুধু সেই অংশটুকুই 
 * আপডেট করে যা বদলেছে। এটিই রিঅ্যাক্টের ডিফল্ট অপ্টিমাইজেশন।
 * ৩. Key Prop: লিস্ট রেন্ডারিং করার সময় সঠিক 'key' দেওয়া সবচেয়ে বড় অপ্টিমাইজেশন। 
 * এতে রিঅ্যাক্ট বোঝে কোন আইটেমটি নতুন আর কোনটি পুরানো।
 */