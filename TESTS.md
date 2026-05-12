# TESTS.md

# Automated Testing Documentation

This document lists all automated tests written for the AI Spend Audit Platform, what each test covers, and how to run them locally.

The primary goal of the tests is to validate the audit engine calculations and ensure that optimization logic behaves correctly under different scenarios.

---

# Testing Stack

## Framework
- Vitest

## Why Vitest?

Vitest was selected because:
- Fast execution speed
- Native Vite/Next.js compatibility
- Simple configuration
- Lightweight setup
- Excellent developer experience

---

# How to Run Tests

## Install Dependencies

```bash
npm install
```

---

## Run All Tests

```bash
npm run test
```

---

## Run Tests in Watch Mode

```bash
npm run test:watch
```

---

# Test File Structure

```txt
tests/
 ├── auditEngine.test.js
 ├── savingsCalculation.test.js
 ├── annualSavings.test.js
 ├── invalidInput.test.js
 ├── fallbackSummary.test.js
```

---

# Test Coverage Overview

The tests focus primarily on:
- Audit calculations
- Savings estimation
- Edge-case handling
- Error fallback behavior
- Data validation

---

# Test 1 — Audit Engine Calculation Test

## File

```txt
tests/auditEngine.test.js
```

## What It Covers

- Validates current spend calculations
- Verifies optimized spend calculations
- Confirms audit result structure
- Ensures optimization recommendations are generated

## Example Scenario

Input:
- Multiple AI tools
- Different subscription costs
- Different usage levels

Expected:
- Correct savings calculation
- Proper result formatting

---

# Test 2 — Savings Calculation Test

## File

```txt
tests/savingsCalculation.test.js
```

## What It Covers

- Ensures total savings are calculated correctly
- Verifies subtraction logic
- Prevents negative savings outputs

## Example Scenario

```txt
Current Spend: $20,000
Optimized Spend: $14,000
```

Expected:

```txt
Total Savings: $6,000
```

---

# Test 3 — Annual Savings Calculation Test

## File

```txt
tests/annualSavings.test.js
```

## What It Covers

- Verifies annual savings multiplier logic
- Ensures monthly savings convert correctly to yearly projections

## Example Scenario

```txt
Monthly Savings: $500
```

Expected:

```txt
Annual Savings: $6,000
```

---

# Test 4 — Invalid Input Handling Test

## File

```txt
tests/invalidInput.test.js
```

## What It Covers

- Handles empty audit rows
- Prevents application crashes
- Validates missing fields
- Ensures invalid pricing inputs do not break calculations

## Example Cases

- Empty tool names
- Undefined pricing
- Null values
- Missing team size

---

# Test 5 — AI Summary Fallback Test

## File

```txt
tests/fallbackSummary.test.js
```

## What It Covers

- Verifies fallback summary generation
- Handles AI API failures
- Prevents blank summary outputs

## Example Scenario

If:
- OpenRouter API fails
- Rate limit occurs
- Network request fails

Expected:
- A default business summary is returned

---

# Example Test Command Output

```txt
✓ auditEngine.test.js
✓ savingsCalculation.test.js
✓ annualSavings.test.js
✓ invalidInput.test.js
✓ fallbackSummary.test.js

Test Files  5 passed
Tests       14 passed
```

---

# Continuous Integration

Tests automatically run through GitHub Actions on every push to the `main` branch.

The CI pipeline includes:
- Dependency installation
- Lint checks
- Automated test execution

Workflow file:

```txt
.github/workflows/ci.yml
```

---

# Why These Tests Matter

The audit engine is the core business logic of the platform.

Incorrect calculations could:
- Produce misleading savings estimates
- Reduce trust in the audit results
- Break downstream AI summaries

The tests ensure:
- Reliable calculations
- Stable outputs
- Better maintainability
- Safer future feature additions

---

# Future Testing Improvements

Future versions of the project would include:

## 1. API Route Testing

Coverage for:
- `/api/generate-summary`
- Database insertions
- Error responses

---

## 2. End-to-End Testing

Using:
- Playwright
- Cypress

to test:
- Full audit workflows
- Form interactions
- Results pages

---

## 3. UI Component Testing

Testing:
- Loading states
- Error states
- Button interactions
- Responsive rendering

---

## 4. Database Integration Tests

Future tests would validate:
- Supabase inserts
- Query performance
- Data consistency

---

# Conclusion

The current testing setup focuses on validating the most critical part of the platform: the audit engine and savings calculations.

The tests provide confidence that:
- Audit outputs are accurate
- Savings calculations remain stable
- AI summary failures are handled gracefully

while maintaining a lightweight and developer-friendly workflow.