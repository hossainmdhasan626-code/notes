/**
 * =========================================================================
 * JAVASCRIPT OPERATORS MASTER NOTE (Basic to Advanced)
 * =========================================================================
 * Author: Hasan Notes
 * Topics: Arithmetic, Logical, Comparison, & Assignment Operators
 */

// -------------------------------------------------------------------------
// 1. ARITHMETIC OPERATORS (গাণিতিক কাজ)
// -------------------------------------------------------------------------
let a = 10;
let b = 3;

console.log(a + b);  // Addition: 13
console.log(a - b);  // Subtraction: 7
console.log(a * b);  // Multiplication: 30
console.log(a / b);  // Division: 3.333...
console.log(a % b);  // Remainder/Modulus: 1 (ভাগশেষ)
console.log(a ** b); // Exponentiation: 1000 (10 এর পাওয়ার 3)

// Increment & Decrement (++ , --)
let x = 5;
x++; // Post-increment: x hobe 6
++x; // Pre-increment: x hobe 7
console.log(x); // 7

// -------------------------------------------------------------------------
// 2. ASSIGNMENT OPERATORS (মান সেট করা)
// -------------------------------------------------------------------------
let score = 100; // Standard Assignment (=)

score += 10; // score = score + 10 (Result: 110)
score -= 5;  // score = score - 5  (Result: 105)
score *= 2;  // score = score * 2  (Result: 210)
score /= 10; // score = score / 10 (Result: 21)
score %= 2;  // score = score % 2  (Result: 1)

// -------------------------------------------------------------------------
// 3. COMPARISON OPERATORS (তুলনা করা - Result: true/false)
// -------------------------------------------------------------------------
let p = 5;
let q = "5";

// Loose Equality (==): Sudhu value dekhe
console.log(p == q);  // true

// Strict Equality (===): Value + Type dutoi dekhe (Always use this!)
console.log(p === q); // false (Karon ekta number, ekta string)

// Inequalities
console.log(10 != 5);   // true (Not equal)
console.log(10 !== "10"); // true (Strictly not equal)
console.log(10 > 5);    // true (Greater than)
console.log(10 < 20);   // true (Less than)
console.log(10 >= 10);  // true (Greater or equal)

// -------------------------------------------------------------------------
// 4. LOGICAL OPERATORS (একাধিক শর্ত চেক করা)
// -------------------------------------------------------------------------
let hasMoney = true;
let isHungry = true;
let isRainy = false;

// AND (&&): Shob gulo true hote hobe
console.log(hasMoney && isHungry); // true

// OR (||): Je kono ekta true holei hobe
console.log(hasMoney || isRainy);  // true

// NOT (!): True-ke False banay, False-ke True banay
console.log(!hasMoney); // false

// -------------------------------------------------------------------------
// 5. TRICKY INTERVIEW QUESTIONS (Common Concepts)
// -------------------------------------------------------------------------

// i. String Concatenation vs Addition (+)
console.log(2 + 2 + "5"); // "45" (Pehle addition, then string join)
console.log("5" + 2 + 2); // "522" (Pehle string, so shob string hoye geche)

// ii. Coercion in Comparison
console.log(null == undefined); // true (Value same dhora hoy)
console.log(null === undefined); // false (Type alada)

// iii. Logical Assignment (Modern JS - ES2021)
let name = "";
name ||= "Guest"; // name jodi empty/falsy hoy, tobe "Guest" hobe.
console.log(name); // "Guest"

/**
 * =========================================================================
 * SUMMARY ONE-LINER:
 * = (Assign): Man dey.
 * == (Loose): Man check kore.
 * === (Strict): Man + Type check kore.
 * && (AND): Shob true holei true.
 * || (OR): Ekta true holei true.
 * =========================================================================
 */