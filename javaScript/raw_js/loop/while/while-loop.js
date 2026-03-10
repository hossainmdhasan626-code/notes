/**
 * =========================================================================
 * FILE: while-loop.js
 * TOPIC: THE WHILE LOOP (Entry-Controlled Loop)
 * =========================================================================
 * * BEKHA (Explanation): 
 * 'While' mane holo 'Jotokkhon'. Jotokkhon condition 'true' thakbe, totokkhon 
 * loop-er bhetorer kaj cholte thakbe. Eti kaj shuru korar agey condition check kore.
 */

// 1. BASIC STRUCTURE
let count = 1; // Step 1: Initialization (Kothay shuru)

while (count <= 5) { // Step 2: Condition (Kothay thambe)
    console.log("Counting: " + count); // Step 3: Work (Ki kaj hobe)
    count++; // Step 4: Increment/Update (Dhap poriborton)
}

/**
 * CHOTO DETAILS (Micro Details):
 * - Condition vul hole loop ekbar-o cholbe na.
 * - 'count++' na dile loop kokhono thambe na (Infinite Loop), ja system hang korte pare.
 * - Variable-ti oboshshoi loop-er baire declare korte hoy.
 */

// 2. REAL USE CASE (Bastob udahoron):
// Jokhon amra jani na loop thik koybar cholbe.
// Udahoron: Ekti boro sonkhya-ke jotokkhon 1-er boro thake, totokkhon 2 diye bhag kora.
let val = 100;
while (val > 1) {
    console.log("Current Value:", val);
    val = Math.floor(val / 2); // Sonkhya-ti prothome 100, tarpor 50, 25... ebhabe kombe.
}

console.log("While Loop Note Complete.");