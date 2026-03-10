/**
 * =========================================================================
 * FILE: do-while-loop.js
 * TOPIC: THE DO...WHILE LOOP (Exit-Controlled Loop)
 * =========================================================================
 * * BEKHA (Explanation): 
 * Eti prothome 'do' block-er kajti kore fele, tarpor 'while' er condition check kore.
 * Tai condition 'false' holeo eti ontoto EKBAR cholbei.
 */

// 1. BASIC STRUCTURE
let i = 10;

do {
    console.log("Eti ontoto ekbar cholbe, i er man:", i);
    i++;
} while (i < 5); 

// Output: Eti ontoto ekbar cholbe, i er man: 10
// Dekhun, i er man 10 kintu condition 5 er niche. Tobuo agey kaj hoyeche tai output esheche.

/**
 * CHOTO DETAILS (Micro Details):
 * - While-er por oboshshoi semicolon (;) dite hoy.
 * - Agey action, porey condition - eta-i holo do-while er mukhya bishoy.
 */

// 2. REAL USE CASE (Bastob udahoron):
// Udahoron: User-ke menu dekhano. Prothome menu dekhatei hobe, tarpor user 'Exit' dile loop thambe.
let userInput = "No";
do {
    console.log("Loading Game Menu...");
    // Jodi user 'Yes' na bole, tobe loop cholte thakbe.
} while (userInput === "Yes");

console.log("Do-While Loop Note Complete.");