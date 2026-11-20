"use strict";

/**
 * Question 9: JSON Audit
 * 
 * Given:
 * const rawData = [
 *   '{"user":"Alex","age":25}',
 *   '{"id":2}',
 *   '{invalid}',
 *   '{"user":"Mina","age":"22"}'
 * ];
 * 
 * Tasks:
 * 1. Parse each entry in a loop using try...catch.
 * 2. Detect missing keys (user, age) and invalid JSON.
 * 3. Push valid entries to a clean array; log errors with line numbers.
 * 4. Debug step-by-step to see how control flows on error.
 * 5. Add bonus: convert age to Number and filter under-18 users.
 */

console.log("================================================================================");
console.log("                         Q9: JSON AUDIT                                         ");
console.log("================================================================================\n");

// Given raw dataset (plus an underage record to demonstrate the bonus filter)
const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}',
  '{"user":"Sam","age":16}' // Bonus verification: valid JSON but under 18
];

// Clean storage array for valid records (Task 3)
const cleanValidArray = [];
// Storage array for logged errors with item numbers
const auditErrors = [];

console.log(`--- Processing ${rawData.length} Raw JSON Entries ---\n`);

// Task 1: Parse each entry in a loop using try...catch
for (let index = 0; index < rawData.length; index++) {
  const lineNum = index + 1;
  const rawString = rawData[index];

  console.log(`Processing Record #${lineNum}: ${rawString}`);

  try {
    // Step A: Parse JSON (catches malformed JSON)
    let parsed;
    try {
      parsed = JSON.parse(rawString);
    } catch (parseErr) {
      // Task 2: Detect invalid JSON
      throw new Error(`JSON Syntax Error: Invalid JSON format - ${parseErr.message}`);
    }

    // Step B: Task 2 - Detect missing keys (user, age)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Validation Error: Record must be a non-null JSON object.");
    }

    if (parsed.user === undefined || parsed.user === null || typeof parsed.user !== "string" || parsed.user.trim() === "") {
      throw new Error("Validation Error: Missing or invalid required key 'user'.");
    }

    if (parsed.age === undefined || parsed.age === null) {
      throw new Error("Validation Error: Missing required key 'age'.");
    }

    // Step C: Task 5 (Bonus) - Convert age to Number and validate numeric value
    const numericAge = Number(parsed.age);
    if (isNaN(numericAge) || numericAge < 0) {
      throw new Error(`Validation Error: 'age' must be a valid non-negative number; got '${parsed.age}'.`);
    }

    // Normalizing object
    const cleanRecord = {
      recordId: lineNum,
      user: parsed.user.trim(),
      age: numericAge
    };

    // Task 3: Push valid entries to a clean array
    cleanValidArray.push(cleanRecord);
    console.log(`  -> Status: [VALID] Successfully parsed & validated (User: ${cleanRecord.user}, Age: ${cleanRecord.age})`);

  } catch (error) {
    // Task 3: Log errors with line numbers
    const errDetail = {
      line: lineNum,
      raw: rawString,
      errorMessage: error.message
    };
    auditErrors.push(errDetail);
    console.log(`  -> Status: [ERROR on Line ${lineNum}] ${error.message}`);
    // Task 4: Control flow observation:
    // Once an error is thrown, the try block aborts immediately, jumps straight to this catch block,
    // and loop continues smoothly without crashing the application.
  }
}

// Task 5: Bonus - Filter under-18 users
console.log("\n================================================================================");
console.log("                 TASK 5 (BONUS): FILTER UNDER-18 USERS                          ");
console.log("================================================================================\n");

const adultUsers = cleanValidArray.filter((userRecord) => userRecord.age >= 18);
const under18Users = cleanValidArray.filter((userRecord) => userRecord.age < 18);

console.log("--- All Clean Valid Records (Age Converted to Number) ---");
cleanValidArray.forEach((item) => {
  console.log(`  [Record #${item.recordId}] User: ${item.user.padEnd(10)} | Age: ${item.age} (Type: ${typeof item.age})`);
});

console.log("\n--- Eligible Adult Users (Age >= 18) ---");
adultUsers.forEach((u) => console.log(`  * User: ${u.user.padEnd(10)} | Age: ${u.age}`));

console.log("\n--- Filtered Under-18 Users ---");
if (under18Users.length === 0) {
  console.log("  No users under 18.");
} else {
  under18Users.forEach((u) => console.log(`  * User: ${u.user.padEnd(10)} | Age: ${u.age} (Excluded)`));
}

// Final Error Log Report
console.log("\n================================================================================");
console.log("                           ERROR LOG REPORT                                     ");
console.log("================================================================================");
auditErrors.forEach((err) => {
  console.log(`Line #${err.line} | Input: ${err.raw.padEnd(28)} | Error: ${err.errorMessage}`);
});

console.log("\n========================= End of Q9 Solution ===================================\n");
