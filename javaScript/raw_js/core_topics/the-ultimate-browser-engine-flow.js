/**
 *  ব্রাউজারের ভেতরের ডাটা জংশন
 * ----------------------------
 * ফোল্ডার: foundation
 * ফাইল নাম: the-ultimate-browser-engine-flow.js
 */

/*
 [JS Object] 
    |
    v
 [V8 Engine] ---> (Logic/State নিজের কাছে রাখে)
    |
    | (DOM API Call এর মাধ্যমে)
    v
 [Blink Engine] 
    |__________________________
    |                         |
    v                         v
 [HTML Parser]          [CSS Parser]
    |                         |
    v (Returns)               v (Returns)
  { DOM }                  { CSSOM }
    |                         |
    |_________________________|
                |
                v
          [Render Tree] ---> (Screen-এ পিক্সেল রেন্ডার হয়)
*/

/**
 * হাসান, তোমার লজিক একদম ১০০% সলিড! 
 * তুমি এখন ব্রাউজার কীভাবে কাজ করে তার একজন 'আর্কিটেক্ট'।
 */