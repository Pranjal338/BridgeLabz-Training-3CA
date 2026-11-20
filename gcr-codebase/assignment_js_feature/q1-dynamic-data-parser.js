"use strict";

/**
 * Question 1: Dynamic Data Parser
 * 
 * Objective:
 * Process mixed API data by converting types, validating numeric values,
 * separating valid vs invalid numbers, and generating a detailed summary report.
 * 
 * Key Concepts:
 * - "use strict" execution mode
 * - Type coercion & explicit conversion (Number(), Boolean(), String())
 * - Edge cases in Number conversion (NaN, whitespace strings, null, undefined)
 * - Array classification and conditional reporting
 */

// Given mixed API data
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

console.log("================================================================================");
console.log("                       Q1: DYNAMIC DATA PARSER REPORT                           ");
console.log("================================================================================\n");

// Arrays to store categorized records (Task 3)
const validNumericData = [];
const invalidNumericData = [];

/**
 * Helper function to determine whether a value represents a valid number.
 * Note on JS behavior:
 * - Number(" ") returns 0, but is considered an invalid number per requirements.
 * - Number(null) returns 0, but null represents missing/empty object reference.
 * - Number(undefined) returns NaN.
 * - Number("100px") returns NaN (unlike parseInt which parses leading digits).
 * - Number("NaN") returns NaN.
 */
function checkNumericValidity(val) {
  // Check for null or undefined
  if (val === null) {
    return { isValid: false, reason: "Primitive null (coerces to 0, but represents missing value)" };
  }
  if (val === undefined) {
    return { isValid: false, reason: "Primitive undefined (coerces to NaN)" };
  }

  // Check for empty or whitespace-only string
  if (typeof val === "string" && val.trim() === "") {
    return { isValid: false, reason: "Whitespace / empty string (coerces to 0 in JS, invalid numeric data)" };
  }

  // Check if string contains "NaN" literally
  if (val === "NaN") {
    return { isValid: false, reason: "Explicit 'NaN' string representation" };
  }

  // Explicit number conversion
  const numValue = Number(val);

  if (Number.isNaN(numValue)) {
    return { isValid: false, reason: "Non-numeric characters / failed conversion resulting in NaN" };
  }

  return { isValid: true, parsedNumber: numValue };
}

console.log("--- Task 1 & 2: Parsing & Type Conversions ---");

for (let i = 0; i < apiData.length; i++) {
  const rawValue = apiData[i];
  
  // Task 1: Convert each value into Number, Boolean, and String forms
  const numberForm = Number(rawValue);
  const booleanForm = Boolean(rawValue);
  const stringForm = String(rawValue);

  const displayRaw = rawValue === null ? "null" : (rawValue === undefined ? "undefined" : `"${rawValue}"`);
  
  console.log(`\n[Item ${i + 1}] Raw: ${displayRaw} (Type: ${typeof rawValue})`);
  console.log(`  -> Number Form : ${numberForm}`);
  console.log(`  -> Boolean Form: ${booleanForm} (Note: Non-empty strings like "false" are truthy in JS)`);
  console.log(`  -> String Form : "${stringForm}"`);

  // Task 2 & 3: Skip invalid numbers and categorize into arrays
  const validity = checkNumericValidity(rawValue);

  if (validity.isValid) {
    validNumericData.push({
      original: rawValue,
      numericValue: validity.parsedNumber,
      booleanForm: booleanForm,
      stringForm: stringForm
    });
    console.log(`  -> Status      : [VALID NUMBER] => Stored as ${validity.parsedNumber}`);
  } else {
    invalidNumericData.push({
      original: rawValue,
      reason: validity.reason,
      numberForm: numberForm,
      booleanForm: booleanForm,
      stringForm: stringForm
    });
    console.log(`  -> Status      : [SKIPPED / INVALID] => Reason: ${validity.reason}`);
  }
}

// Task 4: Print a detailed report using loops and conditional formatting
console.log("\n================================================================================");
console.log("                           DETAILED AUDIT SUMMARY                               ");
console.log("================================================================================");

console.log(`\nTotal Inputs Processed : ${apiData.length}`);
console.log(`Valid Numeric Records  : ${validNumericData.length}`);
console.log(`Invalid Records Skipped: ${invalidNumericData.length}\n`);

console.log("--- Valid Numeric Data ---");
if (validNumericData.length === 0) {
  console.log("  No valid numeric data found.");
} else {
  for (let i = 0; i < validNumericData.length; i++) {
    const item = validNumericData[i];
    const origStr = item.original === undefined ? "undefined" : JSON.stringify(item.original);
    console.log(`  [${i + 1}] Original: ${origStr.padEnd(10)} | Parsed Number: ${String(item.numericValue).padEnd(8)} | Type: ${typeof item.numericValue}`);
  }
}

console.log("\n--- Invalid / Skipped Data (Logged Separately) ---");
for (let i = 0; i < invalidNumericData.length; i++) {
  const item = invalidNumericData[i];
  const origStr = item.original === undefined ? "undefined" : JSON.stringify(item.original);
  console.log(`  [${i + 1}] Original: ${origStr.padEnd(14)} | Number(): ${String(item.numberForm).padEnd(6)} | Reason: ${item.reason}`);
}

console.log("\n========================= End of Q1 Solution ===================================\n");
