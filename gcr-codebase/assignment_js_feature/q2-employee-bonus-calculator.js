"use strict";

/**
 * Question 2: Employee Bonus Calculator
 * 
 * Objective:
 * Process employee records by converting string values to numbers,
 * calculating performance bonuses based on tenure, using strict mode validation,
 * template strings for formatted output, and try...catch for robust error handling.
 * 
 * Key Concepts:
 * - "use strict": Prevents accidental global variables and enforces explicit declaration.
 * - Number parsing & validation.
 * - Conditional ternary logic for bonus evaluation.
 * - ES6 Template literals for readable formatting.
 * - Defensive programming using try...catch blocks.
 */

// Given employee dataset
const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" }
];

console.log("================================================================================");
console.log("                     Q2: EMPLOYEE BONUS CALCULATOR                              ");
console.log("================================================================================\n");

/**
 * Calculates bonus and total compensation for an employee.
 * Validates inputs and calculates bonus:
 * bonus = salary * 0.10 if years > 3, else salary * 0.05
 * 
 * @param {Object} emp - Employee record
 * @returns {Object} Calculated payroll details
 */
function processEmployee(emp) {
  // Task 5: Validate input structure
  if (!emp || typeof emp !== "object") {
    throw new TypeError("Employee data must be a valid non-null object.");
  }

  if (!emp.name || typeof emp.name !== "string" || emp.name.trim() === "") {
    throw new Error(`Missing or invalid 'name' property on employee: ${JSON.stringify(emp)}`);
  }

  if (emp.salary === undefined || emp.salary === null) {
    throw new Error(`Missing 'salary' property for employee '${emp.name}'.`);
  }

  if (emp.years === undefined || emp.years === null) {
    throw new Error(`Missing 'years' property for employee '${emp.name}'.`);
  }

  // Task 1: Convert salary and years to numbers
  const salaryNum = Number(emp.salary);
  const yearsNum = Number(emp.years);

  if (Number.isNaN(salaryNum) || salaryNum <= 0) {
    throw new Error(`Invalid salary '${emp.salary}' for employee '${emp.name}'. Must be a positive number.`);
  }

  if (Number.isNaN(yearsNum) || yearsNum < 0) {
    throw new Error(`Invalid years '${emp.years}' for employee '${emp.name}'. Must be a non-negative number.`);
  }

  // Task 2: Calculate bonus = (salary * 0.1) if years > 3 else (salary * 0.05)
  const bonusRate = yearsNum > 3 ? 0.10 : 0.05;
  const bonus = salaryNum * bonusRate;
  const totalPay = salaryNum + bonus;

  return {
    name: emp.name,
    salary: salaryNum,
    years: yearsNum,
    bonusRatePercent: bonusRate * 100,
    bonus: bonus,
    totalPay: totalPay
  };
}

console.log("--- Processing Given Employee Records ---");
for (const emp of employees) {
  try {
    const result = processEmployee(emp);
    // Task 4: Template strings to print each employee's formatted details
    console.log(`
Employee Details:
---------------------------------------------
  Name               : ${result.name}
  Base Salary        : $${result.salary.toLocaleString()}
  Years of Service   : ${result.years} year(s)
  Bonus Rate Tier    : ${result.bonusRatePercent}% (${result.years > 3 ? "> 3 years tenure (10%)" : "<= 3 years tenure (5%)"})
  Calculated Bonus   : $${result.bonus.toLocaleString()}
  Total Compensation : $${result.totalPay.toLocaleString()}
---------------------------------------------`);
  } catch (err) {
    console.error(`[ERROR] Failed to process employee: ${err.message}`);
  }
}

// Demonstrating Task 5: Testing try...catch with erroneous data
console.log("\n--- Testing Error Handling with Edge Cases (try...catch demonstration) ---");

const edgeCaseEmployees = [
  { name: "Rohan", salary: "invalid_salary", years: "4" },   // Non-numeric salary
  { name: "Pooja", salary: "60000" },                        // Missing 'years'
  { name: "", salary: "50000", years: "1" },                 // Blank name
  null                                                       // Null entry
];

edgeCaseEmployees.forEach((emp, index) => {
  try {
    console.log(`\nAttempting edge case ${index + 1}...`);
    const res = processEmployee(emp);
    console.log(`Success: ${res.name}`);
  } catch (error) {
    console.log(`[CAUGHT EXPECTED ERROR] ${error.name}: ${error.message}`);
  }
});

console.log("\n========================= End of Q2 Solution ===================================\n");
