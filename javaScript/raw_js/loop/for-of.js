/**
 * =========================================================================
 * TOPIC: THE MASTER FOR...OF LOOP GUIDE
 * =========================================================================
 * Definition: 'for...of' loop muloto Iterable objects (Array, String) er 
 * upor chalanor jonno toiri kora hoyeche. Eti sorasori Value (man) dey.
 */

// -------------------------------------------------------------------------
// 1. BASIC STRUCTURE (mul gathon)
// -------------------------------------------------------------------------
const colors = ["Red", "Green", "Blue"];

for (const color of colors) {
    console.log(color); // Output: Red, Green, Blue
}

/** * BEKHA (Explanation):
 * - 'color': Eti ekti variable ja protibar loop ghurar somoy array-r 
 * ek ekta value dharon kore.
 * - Eti Index (0, 1, 2) niye chinta kore na, sorasori data niye kaj kore.
 */



// -------------------------------------------------------------------------
// 2. ADVANTAGES (Subidha)
// -------------------------------------------------------------------------
// ১. Code onek beshi clean ebong readable hoy.
// ২. Array.length ba i++ lakar jhamela nei.
// ৩. String-er upor khub sohoje loop chalano jay.

// Example: String Iteration
const myName = "Hasan";
for (const char of myName) {
    // console.log(char); // H, a, s, a, n
}

// -------------------------------------------------------------------------
// 3. KEY DIFFERENCE (Mukhya Parthokyo)
// -------------------------------------------------------------------------
/**
 * for...of  => Amader kache Value/Data pathay. (Best for Arrays)
 * for...in  => Amader kache Index/Key pathay. (Best for Objects)
 */



// -------------------------------------------------------------------------
// 4. COMMON PRACTICE (Challenge Solutions)
// -------------------------------------------------------------------------

// i. Filtering Data
const prices = [25, 60, 45, 90, 15, 100];
const expensive = [];

for (const price of prices) {
    if (price > 50) {
        expensive.push(price);
    }
}
// console.log(expensive); // [60, 90, 100]

/**
 * =========================================================================
 * SUMMARY:
 * 1. for...of loop-e kono index paowa jay na.
 * 2. Eti Object-er upor sorasori kaj kore na (karon Object iterable noy).
 * 3. Array ba String theke shudhu data lagle eti-i shera choice.
 * =========================================================================
 */