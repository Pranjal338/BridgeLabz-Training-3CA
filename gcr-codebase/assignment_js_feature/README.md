# Assignment 3: JavaScript ES Features (Lec 7-10)

This directory contains solutions for the **Lec 7-10 JS ES Feature Assignment**.

---

## General Instructions Followed
- ✅ Separate `.js` files for each question.
- ✅ `"use strict"` applied across all files.
- ✅ Detailed inline and block comments explaining logic, hoisting effects, memory phases, and debug observations.
- ✅ External libraries avoided (standard ES6+ JavaScript used).
- ✅ All outputs visible via formatted `console.log()` calls.

---

## File Directory & Overview

| File | Question | Key Concepts Covered |
|------|----------|----------------------|
| `q1-dynamic-data-parser.js` | Q1 – Dynamic Data Parser | Type conversions (`Number()`, `Boolean()`, `String()`), invalid number skipping, array categorization. |
| `q2-employee-bonus-calculator.js` | Q2 – Employee Bonus Calculator | Strict mode validation, type casting, ternary bonus calculation, template strings, `try...catch`. |
| `q3-transaction-validator.js` | Q3 – Transaction Validator | Custom error classes (`NegativeAmountError`, `NullTransactionError`, etc.), error categorization, debugger instructions. |
| `q4-debugging-mystery.js` | Q4 – Debugging Mystery | Strict mode undeclared identifier rules, scope declaration differences (`let` vs `var`), watch expressions and call stack analysis. |
| `q5-hoisting-lab.js` | Q5 – Hoisting Lab: The Sequence Trap | Creation phase vs execution phase, variable hoisting (`var` vs `let`), Temporal Dead Zone (TDZ), arrow function differences. |
| `q6-pyramid-pattern-generator.js` | Q6 – Pyramid Pattern Generator | Loop scoping (`let` vs `var`), variable leakage/collision, default parameters, strict mode undeclared counter detection. |
| `q7-smart-calculator.js` | Q7 – Smart Calculator | `switch` control flow, custom error handling (divide by 0, root of negative numbers, `InvalidOperationError`), summary report table. |
| `q8-strict-mode-showdown.js` | Q8 – Strict Mode Showdown | Sloppy mode vs strict mode comparison (duplicate params, undeclared variables, unqualified `delete`), ES6 modern refactor. |
| `q9-json-audit.js` | Q9 – JSON Audit | JSON parsing inside `try...catch`, syntax error catching, key validation (`user`, `age`), bonus age conversion and under-18 filtering. |
| `q10-nested-hoisting-closures.js` | Q10 – Nested Hoisting and Closures | Multi-level execution contexts, variable shadowing, arrow functions vs closures, call stack push/pop lifecycle. |

---

## How to Run

Execute any script using Node.js from this folder:

```bash
node q1-dynamic-data-parser.js
node q2-employee-bonus-calculator.js
node q3-transaction-validator.js
node q4-debugging-mystery.js
node q5-hoisting-lab.js
node q6-pyramid-pattern-generator.js
node q7-smart-calculator.js
node q8-strict-mode-showdown.js
node q9-json-audit.js
node q10-nested-hoisting-closures.js
```
