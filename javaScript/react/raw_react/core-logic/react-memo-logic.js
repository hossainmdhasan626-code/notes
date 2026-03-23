/**
 *   React.memo: অপ্রয়োজনীয় রেন্ডারিং ঠেকানোর দেয়াল
 * ----------------------------------------------
 * ফোল্ডার: core-logic
 * ফাইল নাম: react-memo-logic.js
 * * লজিক: "যদি প্রপস না বদলায়, তবে চাইল্ড রেন্ডার হবে না।"
 */

import { memo, useState } from 'react';

// ১. এই কম্পোনেন্টটি মেমোরাইজড (Protected)
const CartIcon = memo(({ count }) => {
  console.log("CartIcon রেন্ডার হলো");
  return <div>🛒 {count}</div>;
});

const ProductList = memo(() => {
  console.log("ProductList রেন্ডার হলো");
  return <div>অনেকগুলো প্রোডাক্টের লিস্ট...</div>;
});

export default function AddToCart() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  return (
    <div>
      {/* যদি থিম চেঞ্জ করি, তবে ProductList রেন্ডার হবে না কারণ সেটি memo করা */}
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        থিম বদলান: {theme}
      </button>

      <button onClick={() => setCount(count + 1)}>কার্টে যোগ করুন</button>

      <CartIcon count={count} />
      <ProductList />
    </div>
  );
}

/**
 * হাসান'স গোল্ডেন রুলস:
 * -------------------
 * ১. প্রপস চেক: React.memo একটি 'Shallow Comparison' করে। অর্থাৎ সে দেখে 
 * আগের প্রপস আর বর্তমান প্রপস এক কি না।
 * ২. পারফরম্যান্স: যদি কোনো চাইল্ড কম্পোনেন্ট অনেক বড় হয় বা অনেক ডাটা প্রসেস করে, 
 * তবেই memo ব্যবহার করা বুদ্ধিমানের কাজ। 
 * ৩. সাবধানতা: যদি চাইল্ডের প্রপস হিসেবে কোনো 'Object' বা 'Function' পাঠাও, 
 * তবে শুধু memo দিলেই হবে না, সাথে useMemo বা useCallback ও লাগবে। 
 * (কারণ প্রতি রেন্ডারে অবজেক্ট/ফাংশন নতুন রেফারেন্স পায়)।
 */