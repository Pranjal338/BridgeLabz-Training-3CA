"use strict";

/**
 * Question 3: Transaction Validator
 * 
 * Objective:
 * Validate a sequence of financial transaction records.
 * Detect and throw custom errors for:
 *   1. Negative amounts
 *   2. Missing amount or ID
 *   3. Null entries
 * Catch and categorize each transaction into valid or invalid arrays.
 * Print final reports with counts.
 * 
 * Debugger Instructions:
 * - Insert 'debugger;' statement to pause execution in DevTools or VS Code.
 * - Set watch expressions for 'tx', 'validTransactions.length', and 'err.message'.
 */

// Given transaction dataset
const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

console.log("================================================================================");
console.log("                      Q3: TRANSACTION VALIDATOR                                 ");
console.log("================================================================================\n");

// Custom Error Classes
class TransactionError extends Error {
  constructor(message, errorType, txRecord) {
    super(message);
    this.name = "TransactionError";
    this.errorType = errorType;
    this.txRecord = txRecord;
  }
}

class NullTransactionError extends TransactionError {
  constructor(txRecord) {
    super("Null transaction entry encountered.", "NULL_TRANSACTION", txRecord);
    this.name = "NullTransactionError";
  }
}

class MissingPropertyError extends TransactionError {
  constructor(missingProp, txRecord) {
    super(`Missing required property: '${missingProp}'.`, "MISSING_PROPERTY", txRecord);
    this.name = "MissingPropertyError";
  }
}

class NegativeAmountError extends TransactionError {
  constructor(amount, txRecord) {
    super(`Transaction amount cannot be negative: received ${amount}.`, "NEGATIVE_AMOUNT", txRecord);
    this.name = "NegativeAmountError";
  }
}

// Arrays for categorization (Task 3)
const validTransactions = [];
const invalidTransactions = [];

/**
 * Validates a single transaction record according to business rules.
 * Throws specific errors on failure.
 */
function validateTransaction(tx) {
  // Task 2: Throw custom error for null entries
  if (tx === null || tx === undefined) {
    throw new NullTransactionError(tx);
  }

  // Task 2: Throw custom error for missing id
  if (tx.id === undefined || tx.id === null) {
    throw new MissingPropertyError("id", tx);
  }

  // Task 2: Throw custom error for missing amount
  if (tx.amount === undefined || tx.amount === null) {
    throw new MissingPropertyError("amount", tx);
  }

  // Task 2: Throw custom error for negative amount
  if (typeof tx.amount !== "number" || isNaN(tx.amount)) {
    throw new TransactionError(`Invalid amount data type: ${typeof tx.amount}`, "INVALID_AMOUNT_TYPE", tx);
  }

  if (tx.amount < 0) {
    throw new NegativeAmountError(tx.amount, tx);
  }

  return true;
}

// Task 1: Loop through each transaction
console.log("--- Validating Transactions ---");

for (let i = 0; i < transactions.length; i++) {
  const tx = transactions[i];

  // Task 5: Debugger breakpoint demonstration
  // In VS Code or Chrome DevTools, execution pauses here when debugging.
  // Watch variables to inspect: 'tx', 'validTransactions', 'invalidTransactions'
  // debugger;

  try {
    validateTransaction(tx);
    // If validation succeeds, record as valid
    validTransactions.push(tx);
    console.log(`[PASS] Transaction #${tx.id}: Amount = $${tx.amount} (Status: Valid)`);
  } catch (err) {
    // Task 3: Catch and categorize each error type
    const failureRecord = {
      index: i,
      rawRecord: tx,
      errorName: err.name,
      errorType: err.errorType || "UNKNOWN_ERROR",
      errorMessage: err.message
    };
    invalidTransactions.push(failureRecord);
    console.log(`[FAIL] Index ${i}: [${err.name}] ${err.message}`);
  }
}

// Task 4: Print final reports with counts of successful and failed transactions
console.log("\n================================================================================");
console.log("                         TRANSACTION AUDIT REPORT                               ");
console.log("================================================================================");
console.log(`Total Transactions Evaluated : ${transactions.length}`);
console.log(`Successful / Valid Count     : ${validTransactions.length}`);
console.log(`Failed / Invalid Count       : ${invalidTransactions.length}\n`);

console.log("--- Valid Transactions ---");
validTransactions.forEach((tx) => {
  console.log(`  [ID: ${tx.id}] Amount: $${tx.amount.toFixed(2)}`);
});

console.log("\n--- Failed Transactions Categorization ---");
invalidTransactions.forEach((item) => {
  console.log(`  [Index ${item.index}] Error Type: ${item.errorType.padEnd(20)} | Details: ${item.errorMessage}`);
});

console.log("\n--- Debugger & Breakpoint Observation Guide ---");
console.log("1. Open VS Code Debug tab (Ctrl+Shift+D).");
console.log("2. Set a breakpoint on the `validateTransaction(tx)` call.");
console.log("3. Add expressions to WATCH panel:");
console.log("   - `tx`");
console.log("   - `validTransactions.length`");
console.log("   - `invalidTransactions.length`");
console.log("4. Step Over (F10) to observe how invalid objects divert directly to the catch block.");

console.log("\n========================= End of Q3 Solution ===================================\n");
