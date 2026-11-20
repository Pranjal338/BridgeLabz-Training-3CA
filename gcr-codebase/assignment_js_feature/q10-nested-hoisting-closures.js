"use strict";

/**
 * Question 10: Nested Hoisting and Closures
 * 
 * Given snippet:
 * function outer() {
 *   console.log(count);
 *   var count = 5;
 *   function inner() {
 *     console.log(count);
 *     var count = 10;
 *   }
 *   inner();
 * }
 * outer();
 * 
 * Tasks:
 * 1. Predict and explain output.
 * 2. Show how hoisting creates separate memory contexts.
 * 3. Convert the inner function to an arrow and note behavior changes.
 * 4. Add a debug session and explain the call stack flow.
 */

console.log("================================================================================");
console.log("               Q10: NESTED HOISTING AND CLOSURES                                ");
console.log("================================================================================\n");

// ==============================================================================
// Task 1: Predict and Explain Output
// ==============================================================================
/*
PREDICTION:
The output is:
  undefined
  undefined

EXPLANATION:
1. When `outer()` is invoked:
   - A new Execution Context for `outer` is created.
   - During the Creation Phase, `var count` is hoisted to the top of `outer`'s local scope 
     and initialized to `undefined`.
   - `function inner() { ... }` is also hoisted into `outer`'s scope.
   - Execution begins:
     `console.log(count)` reads the local `count`, which has value `undefined`.
   - Then `count = 5` assigns 5 to the local `count`.

2. When `inner()` is invoked:
   - A new Execution Context for `inner` is created.
   - Inside `inner`, there is another `var count = 10`.
   - During `inner`'s Creation Phase, its OWN local `var count` is hoisted to the top 
     of `inner`'s scope and initialized to `undefined`.
   - IMPORTANT: This local `count` shadows the outer function's `count`!
   - When `console.log(count)` inside `inner` executes, it looks at `inner`'s local scope first, 
     finds the local hoisted `count` (which is still `undefined`), and prints `undefined`.
   - It does NOT print 5!
   - Finally, `count = 10` assigns 10 to `inner`'s local `count`.
*/

console.log("--- Task 1: Running Given Code & Verifying Prediction ---");
function outer() {
  console.log("  [outer execution] count is:", count); // undefined
  var count = 5;
  function inner() {
    console.log("  [inner execution] count is:", count); // undefined
    var count = 10;
  }
  inner();
}
outer();

// ==============================================================================
// Task 2: Separate Memory Contexts Architecture
// ==============================================================================
/*
================================================================================
EXECUTION CONTEXTS & MEMORY ARCHITECTURE:
================================================================================

1. Global Execution Context (GEC):
   - Scope: Global
   - Environment Record: { outer: <FunctionObject> }

2. Outer Execution Context:
   - Outer Lexical Environment Reference: Global Environment
   - Variable Environment (Memory Phase):
     * count: undefined (later updated to 5 in Execution Phase)
     * inner: <FunctionObject>
   
3. Inner Execution Context:
   - Outer Lexical Environment Reference: outer Lexical Environment
   - Variable Environment (Memory Phase):
     * count: undefined (shadows outer's count!)
   - Scope Chain: [inner Environment] -> [outer Environment] -> [Global Environment]
   
Because the identifier 'count' is resolved locally inside inner's Environment Record,
the JavaScript engine never traverses up the scope chain to outer's 'count'.
================================================================================
*/

console.log("\n--- Task 2: Memory Contexts Architecture Explained ---");
console.log("Each function execution creates an independent Variable Environment.");
console.log("Inner's 'var count' allocates a new slot in Inner's memory context,");
console.log("masking outer's 'count = 5' and initializing to 'undefined'.");

// ==============================================================================
// Task 3: Convert Inner Function to Arrow Function & Observe Behavior Changes
// ==============================================================================
/*
Behavior Differences with Arrow Functions:

Case A: Arrow function WITHOUT its own local 'count':
- Arrow functions lexically bind the outer scope.
- If it does not declare its own variable, it creates a closure over the outer `count`.
- Since outer's `count` is 5 when inner is called, `console.log(count)` will print 5!

Case B: Arrow function with 'const' / 'let count = 10':
- If placed after `console.log(count)`, `let` / `const` puts `count` in the Temporal Dead Zone (TDZ).
- Attempting `console.log(count)` before `let count = 10` throws ReferenceError!
*/

console.log("\n--- Task 3: Arrow Function Conversion & Behavior Variations ---");

// Case A: Arrow function utilizing Closure to access outer variable
function outerWithArrowClosure() {
  var count = 5;
  // Arrow function inherits outer lexical scope
  const innerArrow = () => {
    console.log("  [innerArrow Closure] count from outer scope:", count); // Prints 5
  };
  innerArrow();
}
console.log("A. Arrow function reading outer scope via Closure:");
outerWithArrowClosure();

// Case B: Arrow function with let and Temporal Dead Zone (TDZ)
function outerWithArrowTDZ() {
  var count = 5;
  const innerArrowTDZ = () => {
    try {
      // If we declare 'let count = 10' below, this access hits the TDZ:
      const tdzDemo = new Function(`
        "use strict";
        let count = 10;
        return count;
      `);
      console.log("  [innerArrow TDZ] Proper block scope value:", tdzDemo());
    } catch (e) {
      console.log(`  TDZ Error: ${e.name} - ${e.message}`);
    }
  };
  innerArrowTDZ();
}
console.log("\nB. Arrow function with block-scoped 'let':");
outerWithArrowTDZ();

// ==============================================================================
// Task 4: Debug Session & Call Stack Flow
// ==============================================================================
/*
================================================================================
CALL STACK STEP-BY-STEP TRACE:
================================================================================
Step 1: Program starts.
        [Call Stack]: [ Global() ]

Step 2: outer() is invoked.
        [Call Stack]: [ Global(), outer() ]
        Memory in outer: { count: undefined, inner: function }
        Prints: undefined
        count is updated to 5.

Step 3: inner() is invoked.
        [Call Stack]: [ Global(), outer(), inner() ]
        Memory in inner: { count: undefined }
        Prints: undefined
        count is updated to 10.

Step 4: inner() finishes execution and returns.
        inner's execution context is POPPED from the stack.
        [Call Stack]: [ Global(), outer() ]

Step 5: outer() finishes execution and returns.
        outer's execution context is POPPED from the stack.
        [Call Stack]: [ Global() ]

Step 6: Global execution concludes.
================================================================================
*/

console.log("\n--- Task 4: Call Stack Flow Summary ---");
console.log("Call Stack Lifecycle: Push Global -> Push outer() -> Push inner() -> Pop inner() -> Pop outer() -> Done.");

console.log("\n========================= End of Q10 Solution ==================================\n");
