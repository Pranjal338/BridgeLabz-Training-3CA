"use strict";

/**
 * Question 4: Debugging Mystery
 * 
 * Given snippet:
 * "use strict";
 * function showMessage() {
 *   greeting = "Welcome"; // undeclared
 *   console.log(greeting);
 * }
 * showMessage();
 * 
 * Tasks:
 * 1. Identify why this throws an error under strict mode.
 * 2. Fix it and explain how scope declaration rules changed behavior.
 * 3. Add a watch variable and observe the call stack in VS Code's debugger.
 */

console.log("================================================================================");
console.log("                       Q4: DEBUGGING MYSTERY                                    ");
console.log("================================================================================\n");

// ==============================================================================
// Task 1: Why does this throw an error under strict mode?
// ==============================================================================
/*
Explanation:
In non-strict mode (sloppy mode), when an assignment is made to an undeclared 
variable name like `greeting = "Welcome"`, the JavaScript engine navigates up 
the scope chain. Failing to locate any declaration in local or parent scopes, 
it automatically creates a new property on the global object (window in browsers, 
global/globalThis in Node.js). This is called "implicit global variable creation" 
or global scope pollution.

Under strict mode ("use strict"):
Implicit global variables are strictly prohibited. The engine will not create 
an undeclared variable on the global object. Instead, attempting to assign to an 
undeclared variable throws a runtime:
    ReferenceError: greeting is not defined
*/

console.log("--- Task 1: Demonstrating Strict Mode Error Catch ---");
function runOriginalBuggyCode() {
  try {
    // We execute the assignment dynamically inside a strict function to catch the error
    // and demonstrate its runtime behavior cleanly.
    const buggyFn = new Function('"use strict"; greeting = "Welcome"; return greeting;');
    buggyFn();
  } catch (error) {
    console.log(`Observed Error in Strict Mode:`);
    console.log(`  Error Name    : ${error.name}`);
    console.log(`  Error Message : ${error.message}`);
    console.log(`  Root Cause    : Undeclared assignment violates strict mode restrictions.`);
  }
}
runOriginalBuggyCode();

// ==============================================================================
// Task 2: Fix it and explain how scope declaration rules changed behavior
// ==============================================================================
/*
How scope declaration rules change behavior:
1. 'let': Block-scoped, mutable. It exists only within the enclosing block/function {}.
   It is hoisted to the top of its block, but stays in the Temporal Dead Zone (TDZ) 
   until the declaration is evaluated. No global pollution occurs.
2. 'const': Block-scoped, immutable binding. Ideal when the reference will not be reassigned.
3. 'var': Function-scoped. Hoisted to the top of the function with 'undefined'.

Fixed version using 'let':
*/

console.log("\n--- Task 2: Fixed Code Execution & Scope Analysis ---");
function showMessageFixed() {
  // Properly declared using 'let' (scoped locally to showMessageFixed)
  let greeting = "Welcome";
  console.log(`[showMessageFixed Output]: ${greeting}`);
  return greeting;
}

const message = showMessageFixed();

// Checking if 'greeting' leaked to global scope:
console.log(`Is 'greeting' accessible outside the function? typeof greeting === '${typeof greeting}'`);
console.log("Result: Scoped safely inside the function, zero global pollution.");

// ==============================================================================
// Task 3: VS Code Debugger, Watch Variables, and Call Stack Analysis
// ==============================================================================
/*
================================================================================
STEP-BY-STEP VS CODE DEBUGGER GUIDE:
================================================================================
1. Setting Breakpoints:
   - Click to the left of line numbers in VS Code (e.g., at `let greeting = "Welcome";`).
   - A red dot appears indicating the active breakpoint.

2. Launching Debugger:
   - Press F5 or go to Run -> Start Debugging -> Select "Node.js".
   - Execution pauses automatically at the breakpoint before the line executes.

3. Watching Variables:
   - Expand the "WATCH" panel on the left sidebar.
   - Click the '+' icon and enter expressions to monitor:
       * `greeting`        -> Initially undefined / TDZ, then becomes "Welcome".
       * `this`            -> In strict mode within functions, `this` evaluates to `undefined`.
       * `typeof greeting` -> Evaluates dynamically as execution advances.

4. Observing Call Stack:
   - Expand the "CALL STACK" panel.
   - You will see the activation frames:
       [Top of Stack] showMessageFixed()   (Local Execution Context)
       [Bottom of Stack] (anonymous)       (Global Execution Context)
   - When showMessageFixed() finishes, its stack frame is popped off memory,
     cleaning up local variables.
================================================================================
*/

console.log("\n--- Task 3: Debugger Summary & Observations Recorded ---");
console.log("Call Stack when paused inside showMessageFixed():");
console.log("  1. showMessageFixed (Local Execution Context - Local scope contains 'greeting')");
console.log("  2. <global> (Global Execution Context - Script entry point)");
console.log("\nWatch Expressions:");
console.log("  - greeting: 'Welcome'");
console.log("  - this: undefined (under 'use strict', non-method functions do not bind global)");

console.log("\n========================= End of Q4 Solution ===================================\n");
