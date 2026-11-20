"use strict";

/**
 * Question 6: Pyramid Pattern Generator
 * 
 * Objective:
 * Generate the pattern:
 * *
 * * *
 * * * *
 * * * * *
 * 
 * Tasks:
 * 1. Replace let with var and observe changes in output / variable leakage.
 * 2. Debug step-by-step to track variable re-use and scoping issues.
 * 3. Add an outer loop limit controlled by user input (default = 5).
 * 4. Use "use strict" to catch undeclared loop variables.
 */

console.log("================================================================================");
console.log("                   Q6: PYRAMID PATTERN GENERATOR                                ");
console.log("================================================================================\n");

// ==============================================================================
// Task 3: Pattern Generator with Default Parameter (User Input Control)
// ==============================================================================
/**
 * Generates and prints a pyramid pattern.
 * @param {number} totalRows - Number of rows to generate (default: 5)
 */
function generatePyramid(totalRows = 5) {
  // Validate totalRows
  const rows = Number(totalRows);
  if (isNaN(rows) || rows <= 0) {
    console.log(`Invalid row limit '${totalRows}'. Defaulting to 5.`);
    return generatePyramid(5);
  }

  console.log(`--- Generating Pyramid (Limit: ${rows} rows) [Using let - Block Scoped] ---`);
  
  for (let i = 1; i <= rows; i++) {
    let rowString = "";
    for (let j = 1; j <= i; j++) {
      rowString += "* ";
    }
    console.log(rowString.trimEnd());
  }
}

// Generate with default parameter = 5
generatePyramid();

console.log("\nGenerating Pyramid with custom parameter = 4:");
generatePyramid(4);

// ==============================================================================
// Task 1 & 2: Replace 'let' with 'var' - Scope Leaks and Variable Re-use
// ==============================================================================
/*
Observation & Analysis:
When using 'let':
- 'let i' and 'let j' are strictly block-scoped to the loop body.
- Outside the loop, 'i' and 'j' do not exist in memory.
- In nested loops or callbacks, each iteration receives a fresh binding.

When using 'var':
- 'var i' and 'var j' are hoisted to the enclosing function or global scope.
- They LEAK outside the loop blocks.
- If an inner loop or asynchronous callback inadvertently re-uses 'i', the outer
  loop counter is mutated, causing premature termination or infinite loops!
*/

console.log("\n--- Task 1: Observing 'var' Variable Leakage ---");
function demonstrateVarLeakage() {
  for (var i = 1; i <= 3; i++) {
    var line = "";
    for (var j = 1; j <= i; j++) {
      line += "* ";
    }
  }

  // Both 'i', 'j', and 'line' leak out to the function scope!
  console.log("Value of leaked 'i' outside loop:", i); // 4
  console.log("Value of leaked 'j' outside loop:", j); // 4
  console.log("Value of leaked 'line' outside loop:", `"${line}"`);
  console.log("Danger: In larger codebases, reusing 'i' across functions/loops causes subtle bugs.");
}
demonstrateVarLeakage();

// Demonstrating catastrophic bug when inner loop re-uses outer loop's 'var i':
console.log("\n--- Task 2: Tracking Variable Collision/Re-use Bug with 'var' ---");
function demonstrateVarCollision() {
  console.log("Demonstrating what happens when inner loop accidentally re-uses 'i' declared with 'var':");
  let iterations = 0;
  for (var k = 0; k < 3; k++) {
    // Suppose an inner operation accidentally uses the same 'var k'
    for (var k = 0; k < 2; k++) {
      // inner loop overrides outer 'k'
    }
    iterations++;
    if (iterations > 10) {
      console.log("  [Infinite Loop Avoided]: 'k' was reset by inner loop!");
      break;
    }
  }
  console.log(`  Outer loop terminated unexpectedly after ${iterations} iterations because of 'var' collision.`);
}
demonstrateVarCollision();

// ==============================================================================
// Task 4: Use "use strict" to catch undeclared loop variables
// ==============================================================================
/*
In non-strict mode:
  for (count = 0; count < 3; count++) { ... }
quietly creates 'global.count', polluting the global environment.

In strict mode:
  Attempting to omit 'let'/'const'/'var' throws ReferenceError: count is not defined.
*/

console.log("\n--- Task 4: Catching Undeclared Loop Variables under Strict Mode ---");
try {
  const strictLoopTest = new Function('"use strict"; for (undeclaredCounter = 0; undeclaredCounter < 3; undeclaredCounter++) {}');
  strictLoopTest();
} catch (err) {
  console.log(`Caught Error: ${err.name} - ${err.message}`);
  console.log("Strict mode successfully caught undeclared loop counter 'undeclaredCounter'.");
}

console.log("\n========================= End of Q6 Solution ===================================\n");
