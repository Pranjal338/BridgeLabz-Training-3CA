"use strict";

/**
 * Question 7: Smart Calculator
 * 
 * Given:
 * const operations = ["add", "divide", "power", "root", "subtract"];
 * const num1 = 25, num2 = 0;
 * 
 * Tasks:
 * 1. Use a switch statement to handle each operation.
 * 2. Add custom error handling for:
 *    - Division by zero
 *    - Root of negative number
 * 3. If operation not recognized, throw InvalidOperationError.
 * 4. Wrap in try...catch and print results in a formatted summary.
 */

console.log("================================================================================");
console.log("                        Q7: SMART CALCULATOR                                    ");
console.log("================================================================================\n");

// Custom Error Classes
class InvalidOperationError extends Error {
  constructor(operation) {
    super(`InvalidOperationError: Operation '${operation}' is not recognized. Valid options: add, divide, power, root, subtract.`);
    this.name = "InvalidOperationError";
    this.operation = operation;
  }
}

class DivisionByZeroError extends Error {
  constructor() {
    super("DivisionByZeroError: Cannot divide by zero. Denominator must be non-zero.");
    this.name = "DivisionByZeroError";
  }
}

class NegativeRootError extends Error {
  constructor(number) {
    super(`NegativeRootError: Cannot calculate real square root of negative number: ${number}.`);
    this.name = "NegativeRootError";
    this.number = number;
  }
}

/**
 * Calculates result based on operation and operands using switch.
 * @param {string} op - Operation name
 * @param {number} a - First operand
 * @param {number} b - Second operand (optional for root)
 * @returns {number} Result of operation
 */
function calculate(op, a, b) {
  switch (op.toLowerCase()) {
    case "add":
      return a + b;

    case "subtract":
      return a - b;

    case "divide":
      // Task 2: Custom error handling for divide by 0
      if (b === 0) {
        throw new DivisionByZeroError();
      }
      return a / b;

    case "power":
      return Math.pow(a, b);

    case "root":
      // Task 2: Custom error handling for root of negative number
      if (a < 0) {
        throw new NegativeRootError(a);
      }
      return Math.sqrt(a);

    default:
      // Task 3: Throw InvalidOperationError if operation not recognized
      throw new InvalidOperationError(op);
  }
}

// Given inputs
const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

console.log(`Primary Test Case Inputs: num1 = ${num1}, num2 = ${num2}\n`);

// Task 4: Wrap in try...catch and print results in a formatted summary
const testResults = [];

console.log("--- Executing Given Operations List ---");
for (const op of operations) {
  try {
    const result = calculate(op, num1, num2);
    testResults.push({ operation: op, input: `(${num1}, ${num2})`, status: "SUCCESS", result: result });
    console.log(`[SUCCESS] ${op.padEnd(10)} : calculate(${num1}, ${num2}) = ${result}`);
  } catch (err) {
    testResults.push({ operation: op, input: `(${num1}, ${num2})`, status: `ERROR: ${err.name}`, result: err.message });
    console.log(`[FAILED]  ${op.padEnd(10)} : [${err.name}] ${err.message}`);
  }
}

// Additional test cases to verify root of negative number and unknown operation:
console.log("\n--- Additional Edge Case Verifications ---");
const additionalTests = [
  { op: "root", a: -16, b: 0, label: "Root of negative number" },
  { op: "divide", a: 50, b: 5, label: "Valid division" },
  { op: "modulo", a: 25, b: 4, label: "Unrecognized operation" }
];

for (const test of additionalTests) {
  try {
    const res = calculate(test.op, test.a, test.b);
    testResults.push({ operation: test.op, input: `(${test.a}, ${test.b})`, status: "SUCCESS", result: res });
    console.log(`[SUCCESS] ${test.label.padEnd(28)} : ${test.op}(${test.a}, ${test.b}) = ${res}`);
  } catch (err) {
    testResults.push({ operation: test.op, input: `(${test.a}, ${test.b})`, status: `ERROR: ${err.name}`, result: err.message });
    console.log(`[FAILED]  ${test.label.padEnd(28)} : [${err.name}] ${err.message}`);
  }
}

// Formatted Summary Table
console.log("\n================================================================================");
console.log("                        CALCULATOR EXECUTION SUMMARY                            ");
console.log("================================================================================");
console.log(`| ${"Operation".padEnd(12)} | ${"Operands".padEnd(12)} | ${"Status".padEnd(26)} | ${"Output / Error Details".padEnd(35)} |`);
console.log(`|${"-".repeat(14)}|${"-".repeat(14)}|${"-".repeat(28)}|${"-".repeat(37)}|`);

for (const item of testResults) {
  const shortResult = typeof item.result === "string" && item.result.length > 35 
    ? item.result.substring(0, 32) + "..." 
    : String(item.result);
  console.log(`| ${item.operation.padEnd(12)} | ${item.input.padEnd(12)} | ${item.status.padEnd(26)} | ${shortResult.padEnd(35)} |`);
}

console.log("\n========================= End of Q7 Solution ===================================\n");
