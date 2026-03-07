/**
 * =========================================================================
 * FILE: compare-loops.js
 * TOPIC: WHILE VS DO-WHILE COMPARISON
 * =========================================================================
 * * MAIN DIFFERENCE (Mukhya Parthokyo):
 * 1. While Loop: Agey check kore, porey kaj kore (Entry Controlled).
 * 2. Do-While: Agey kaj kore, porey check kore (Exit Controlled).
 */

// --- TULONAMULOK UDAHORON ---

let score = 0;

// CASE A: WHILE LOOP
console.log("While Loop Test:");
while (score > 0) {
    console.log("Eti cholbe na."); // Shuru-tei condition false
}

// CASE B: DO-WHILE LOOP
console.log("Do-While Loop Test:");
do {
    console.log("Eti thik-i ekbar cholbe."); // Condition porey check hoy
} while (score > 0);


/**
 * KOKHON KONTA USE KORBEN (Which one to use?):
 * * 1. WHILE: Jokhon apni ekdom sure hote chan je condition thik na thakle 
 * ekbar-o kaj hobe na. (Best for: Database reading, API data processing).
 * * 2. DO-WHILE: Jokhon apni chan condition ja-i houk, prothom bar kajta 
 * hotei hobe. (Best for: User prompt, Login attempts, Game replay).
 */

console.log("Comparison Note Complete.");