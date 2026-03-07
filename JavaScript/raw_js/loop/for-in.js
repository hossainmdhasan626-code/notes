/**
 * =========================================================================
 * TOPIC: THE MASTER FOR...IN LOOP GUIDE
 * =========================================================================
 * Definition: 'for...in' loop muloto Object-er upor chalanor jonno toiri kora hoyeche. 
 * Eti ekti Object-er protiti 'Key' ba 'Property' khuje ber kore.
 */

// -------------------------------------------------------------------------
// 1. BASIC STRUCTURE (mul gathon)
// -------------------------------------------------------------------------
const user = { name: "Hasan", age: 25, city: "Dhaka" };

for (const key in user) {
    console.log(key); // Output: name, age, city (shudhu key gulo paben)
    console.log(user[key]); // Output: Hasan, 25, Dhaka (value gulo paben)
}

/** * BEKHA (Explanation):
 * - 'key': Eti ekti variable ja protibar loop ghurar somoy nuton property-r nam dharon kore.
 * - 'user[key]': Dynamic bhabe value ber korar jonno Bracket Notation use kora hoy.
 */

// -------------------------------------------------------------------------
// 2. WHY NOT FOR ARRAYS? (Array-te keno use korbo na?)
// -------------------------------------------------------------------------
/**
 * ১. Index gulo 'String' hishebe ashe, tai math-er kaj kora jay na ("0" + 1 = "01").
 * ২. Data-r serial ba order thik thakar kono guarantee nei.
 * ৩. Array-r jonno 'for...of' ba 'for' loop-i shera.
 */

// -------------------------------------------------------------------------
// 3. IMPORTANT CHALLENGES & SOLUTIONS (Protisthito Challenge-gulo)
// -------------------------------------------------------------------------

/**
 * Challenge 01: Shopping Cart-er total khoroch ber kora.
 * Logic: += operator diye value gulo jog kora.
 */
const shopCart = { apple: 120, orange: 200, banana: 40 };
let sum = 0;

for (const item in shopCart) {
    sum += shopCart[item]; // Shorthand style (Best Practice)
}
console.log("Total Cost:", sum); // Output: 360


/**
 * Challenge 02: Data Filtering (Shudhu String ber kora).
 * Logic: typeof operator use kore check kora.
 */
const student = { name: "Abir", age: 22, dept: "CSE" };
const stringsOnly = [];

for (const property in student) {
    if (typeof student[property] === "string") {
        stringsOnly.push(student[property]);
    }
}
console.log("String Values:", stringsOnly); // Output: ["Abir", "CSE"]


/**
 * Challenge 03: Property Count (Object-e koyti tothyo ache).
 * Logic: Counter variable++.
 */
const laptop = { brand: "HP", ram: "8GB", ssd: "256GB" };
let count = 0;

for (const key in laptop) {
    count++;
}
console.log(`Ekhane total ${count} ti tothyo ache.`); // Output: 3

// -------------------------------------------------------------------------
// 4. COMMON MISTAKES (Sadharn bhul)
// -------------------------------------------------------------------------
// - Object.key bhabe dot(.) use kora: Loop-er bhitor user.key kaj korbe na, user[key] lagbe.
// - Const vs Let: Loop-er bhitor 'key' protibar nuton kore toiri hoy, tai 'const' use kora jay.

/**
 * =========================================================================
 * QUICK SUMMARY FOR INTERVIEW:
 * 1. 'for...in' use kora hoy Object-er property iterate korar jonno.
 * 2. Eti property-r nam (Key) return kore.
 * 3. Array-r length thake kintu Object-er thake na, tai 'for...in' ekhane dorkari.
 * =========================================================================
 */