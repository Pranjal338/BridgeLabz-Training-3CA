"use strict";

/**
 * Question 5: Hoisting Lab: The Sequence Trap
 * 
 * Given snippet:
 * console.log(score);
 * announce();
 * var score = 50;
 * function announce() { console.log("Game started"); }
 * let status = "ready";
 * startGame();
 * function startGame() {
 *   console.log(status);
 * }
 * 
 * Tasks:
 * 1. Explain each hoisted element’s memory state.
 * 2. Fix the code to run properly.
 * 3. Rewrite using arrow functions to compare hoisting differences.
 */

console.log("================================================================================");
console.log("                  Q5: HOISTING LAB: THE SEQUENCE TRAP                           ");
console.log("================================================================================\n");

// ==============================================================================
// Task 1: Detailed Memory State & Hoisting Analysis
// ==============================================================================
/*
JavaScript engines execute code in two distinct phases:
1. CREATION PHASE (Memory Allocation / Parsing):
   - 'var score': The identifier 'score' is registered in the Lexical/Variable Environment
     and immediately initialized with the value 'undefined'.
   - 'function announce() { ... }': Function declarations are completely hoisted. Both the
     function name AND its entire body/definition are stored in memory.
   - 'let status': The identifier 'status' is registered in scope, but it is NOT initialized.
     It enters the "Temporal Dead Zone" (TDZ). Any read/write access prior to line execution
     triggers a ReferenceError.
   - 'function startGame() { ... }': Function declaration is completely hoisted with its body.

2. EXECUTION PHASE (Step-by-step evaluation):
   - Line 1: `console.log(score)` -> Reads 'score', which is currently 'undefined'. Output: undefined.
   - Line 2: `announce()` -> Calls 'announce'. Since full function definition was hoisted,
     it executes and logs "Game started".
   - Line 3: `score = 50` -> Assigns value 50 to 'score'.
   - Line 4: announce definition (already hoisted).
   - Line 5: `let status = "ready"` -> The TDZ for 'status' ends; it is initialized to "ready".
   - Line 6: `startGame()` -> Calls 'startGame'. Inside startGame, `console.log(status)` accesses
     'status'. Since status was initialized on line 5, it prints "ready".
     (CRITICAL OBSERVATION: If `startGame()` were called BEFORE `let status = "ready"`, it would
     throw `ReferenceError: Cannot access 'status' before initialization` due to TDZ!).
*/

console.log("--- Task 1: Simulating Original Code Behavior ---");
console.log("Step 1: console.log(score) output:");
// var score hoisted simulation
var score;
console.log("  score =", score); // undefined
announce();
score = 50;
console.log("  score after assignment =", score);

function announce() {
  console.log("  announce() -> Game started");
}

let statusVal = "ready";
startGame();
function startGame() {
  console.log("  startGame() -> status is:", statusVal);
}

// ==============================================================================
// Task 2: Fix the code to run properly and predictably
// ==============================================================================
/*
Best Practice Fix:
1. Always declare and initialize variables before reading them.
2. Maintain a clear, readable linear structure.
3. Use const/let instead of var to eliminate accidental undefined reads.
*/

console.log("\n--- Task 2: Fixed, Predictable Version ---");
{
  const cleanScore = 50;
  const cleanStatus = "ready";

  function cleanAnnounce() {
    console.log("  [Clean] Game started");
  }

  function cleanStartGame() {
    console.log(`  [Clean] Game status: ${cleanStatus}`);
  }

  // Linear, predictable execution order
  cleanAnnounce();
  console.log(`  [Clean] Initial score: ${cleanScore}`);
  cleanStartGame();
}

// ==============================================================================
// Task 3: Rewrite using arrow functions to compare hoisting differences
// ==============================================================================
/*
Arrow Function Hoisting Comparison:
--------------------------------------------------------------------------------
Element Type            | Hoisting Behavior         | Accessing Before Declaration
--------------------------------------------------------------------------------
Function Declaration    | Fully hoisted (name+body) | Works normally (called successfully)
Arrow Function with var | Hoisted as 'undefined'    | TypeError: <name> is not a function
Arrow Function with let | Hoisted into TDZ          | ReferenceError: Cannot access before init
Arrow Function with const| Hoisted into TDZ         | ReferenceError: Cannot access before init
--------------------------------------------------------------------------------
*/

console.log("\n--- Task 3: Arrow Functions Comparison & TDZ Demonstration ---");

// 1. Arrow function with var:
console.log("A. Arrow function assigned to 'var':");
try {
  // Calling before assignment throws TypeError
  varArrow();
} catch (e) {
  console.log(`  Attempted varArrow() before definition => Caught ${e.name}: ${e.message}`);
  console.log("  Reason: 'varArrow' is hoisted as 'undefined', so calling undefined() throws TypeError.");
}
var varArrow = () => {
  console.log("  varArrow executed successfully.");
};
varArrow();

// 2. Arrow function with const/let:
console.log("\nB. Arrow function assigned to 'const':");
try {
  // constArrow(); // This would throw ReferenceError (Cannot access 'constArrow' before initialization)
  // We simulate dynamic invocation to safely demonstrate without breaking execution:
  const tdzTest = new Function('"use strict"; constArrow(); const constArrow = () => {};');
  tdzTest();
} catch (e) {
  console.log(`  Attempted constArrow() before definition => Caught ${e.name}: ${e.message}`);
  console.log("  Reason: 'constArrow' is in the Temporal Dead Zone (TDZ) until evaluation.");
}

const properArrowAnnounce = () => {
  console.log("  [Arrow] Game started");
};

const properArrowStartGame = (status) => {
  console.log(`  [Arrow] Game is ${status}`);
};

// Proper execution
properArrowAnnounce();
properArrowStartGame("ready");

console.log("\n========================= End of Q5 Solution ===================================\n");
