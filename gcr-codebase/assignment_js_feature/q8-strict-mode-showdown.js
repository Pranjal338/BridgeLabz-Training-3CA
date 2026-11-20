"use strict";

/**
 * Question 8: Strict Mode Showdown
 * 
 * Given snippet:
 * function demo(a, a) {
 *   total = 10;
 *   delete total;
 * }
 * demo(5, 10);
 * 
 * Tasks:
 * 1. Run this with and without "use strict".
 * 2. Record the errors and differences in behavior.
 * 3. Explain why strict mode makes these operations illegal.
 * 4. Show a correct version using ES6 rules.
 */

console.log("================================================================================");
console.log("                     Q8: STRICT MODE SHOWDOWN                                   ");
console.log("================================================================================\n");

// ==============================================================================
// Task 1 & 2: Compare With and Without "use strict"
// ==============================================================================

console.log("--- Task 1 & 2: Testing Behaviors ---");

// Test A: Without "use strict" (Sloppy Mode)
console.log("\n[A] Running Without 'use strict' (Sloppy Mode):");
try {
  const sloppyFunction = new Function(`
    function demoSloppy(a, a) {
      total = 10;      // Implicit global variable creation
      delete total;    // Delete unqualified identifier (returns true in sloppy mode if configurable)
      return { status: "Completed without syntax error", lastParamA: a };
    }
    return demoSloppy(5, 10);
  `);
  const result = sloppyFunction();
  console.log("  Result in Sloppy Mode:", result);
  console.log("  Behavior Analysis:");
  console.log("    - Duplicate parameter 'a' is allowed; the second 'a' shadows the first (a = 10).");
  console.log("    - 'total = 10' created an undeclared property on the global object without warnings.");
  console.log("    - 'delete total' attempts deletion silently without throwing an error.");
} catch (err) {
  console.log("  Sloppy mode error:", err);
}

// Test B: With "use strict"
console.log("\n[B] Running With 'use strict' (Strict Mode):");

// Error 1: Duplicate Parameter Names
try {
  const strictDupParam = new Function(`
    "use strict";
    function demo(a, a) {
      return a;
    }
  `);
  strictDupParam();
} catch (err) {
  console.log(`  1. Duplicate Parameter Check:`);
  console.log(`     Caught: [${err.name}] ${err.message}`);
}

// Error 2: Undeclared Variable Assignment
try {
  const strictUndeclared = new Function(`
    "use strict";
    function demo(a, b) {
      total = 10;
    }
    demo(5, 10);
  `);
  strictUndeclared();
} catch (err) {
  console.log(`  2. Undeclared Variable Assignment Check:`);
  console.log(`     Caught: [${err.name}] ${err.message}`);
}

// Error 3: Deleting an Unqualified Identifier
try {
  const strictDelete = new Function(`
    "use strict";
    let total = 10;
    delete total;
  `);
  strictDelete();
} catch (err) {
  console.log(`  3. Deleting Unqualified Identifier Check:`);
  console.log(`     Caught: [${err.name}] ${err.message}`);
}

// ==============================================================================
// Task 3: Why Strict Mode Makes These Operations Illegal
// ==============================================================================
/*
DETAILED EXPLANATIONS:

1. Duplicate Parameters `function demo(a, a)`:
   - Why illegal in Strict Mode:
     In sloppy mode, duplicate parameters cause parameter shadowing where the later
     argument overwrites previous ones with the same name. Accessing the first `a` (value 5)
     becomes impossible via identifier name (only accessible via `arguments[0]`).
     Strict mode turns this subtle syntax trap into an immediate compile-time SyntaxError.

2. Undeclared Assignment `total = 10`:
   - Why illegal in Strict Mode:
     In sloppy mode, typos in variable assignments silently create global variables
     (e.g., typing `totla = 10` instead of `total = 10`). This pollutes global scope,
     leads to difficult-to-track bugs, collisions between scripts, and memory leaks.
     Strict mode throws a ReferenceError, ensuring all identifiers are declared explicitly.

3. Unqualified Deletion `delete total`:
   - Why illegal in Strict Mode:
     The `delete` operator in JavaScript is designed strictly to delete properties from
     OBJECTS (`delete obj.prop`). Deleting plain variable names or function names makes
     no semantic sense and defeats JS engine optimizations (like static scope optimization
     and V8 hidden classes). Strict mode throws a SyntaxError on unqualified identifier deletion.
*/

console.log("\n================================================================================");
console.log("               TASK 3: WHY STRICT MODE BANS THESE PRACTICES                     ");
console.log("================================================================================");
console.log("1. Duplicate Parameter Names: Causes shadowing; prevents silent logic bugs.");
console.log("2. Undeclared Assignments: Prevents silent global pollution and typo leaks.");
console.log("3. Deleting Identifiers: delete is strictly for object properties; maintains static scope.");

// ==============================================================================
// Task 4: Correct Version Using Modern ES6 Rules
// ==============================================================================
console.log("\n================================================================================");
console.log("                  TASK 4: MODERN ES6 REFACTORED VERSION                         ");
console.log("================================================================================\n");

/**
 * Clean, modern ES6 implementation:
 * - Distinct, meaningful parameter names with default values.
 * - Proper 'const' / 'let' declaration for local variables.
 * - Object property management for dynamic properties.
 */
function modernDemo(firstValue = 0, secondValue = 0) {
  // Use let/const for local variable declaration
  const total = firstValue + secondValue;

  // If dynamic property removal is needed, use an object:
  const state = {
    firstValue,
    secondValue,
    calculatedTotal: total
  };

  console.log(`  Initial State   :`, state);

  // Valid use of delete on an object property:
  delete state.calculatedTotal;
  console.log(`  After Deletion  :`, state);

  return total;
}

const finalTotal = modernDemo(5, 10);
console.log(`  Function returned total: ${finalTotal}`);

console.log("\n========================= End of Q8 Solution ===================================\n");
