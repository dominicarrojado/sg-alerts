---
name: add-fixed-deposit-bank
description: Use ONLY when adding or updating fixed deposit rate bank comparison pages.
---

# Add Fixed Deposit Bank Skill

This skill provides step-by-step guidance for adding or modifying a fixed deposit bank comparison page in `sg-alerts`.

## Required Coordinated Edits

Fixed deposit bank pages require synchronized edits across five core locations:

### 1. `lib/enums.ts`

1. Add the bank enum to `DepositRateBank`:
   ```typescript
   export enum DepositRateBank {
     // ...
     DBS = "DBS",
   }
   ```
2. Add the route path to `Routes`:
   ```typescript
   export enum Routes {
     // ...
     FixedDepositRatesDbs = "/topics/fixed-deposit-rates/dbs/",
   }
   ```

### 2. `lib/constants.ts`

1. Add the bank's brand primary color to `DEPOSIT_RATES_BANK_PRIMARY_COLORS`.
2. Update deposit rate metadata or bank lists as required.

### 3. `lib/fixed-deposit-rates.ts`

Add or update historical and current interest rate data points for the bank.

### 4. `lib/content.tsx`

Update fixed deposit topic metadata and bank navigation anchors.

### 5. App Router Page & Test

1. Create `app/topics/fixed-deposit-rates/<bank-slug>/page.tsx`.
2. Create colocated test `app/topics/fixed-deposit-rates/<bank-slug>/page.test.tsx`.

## Verification Step

Run the targeted test:

```bash
yarn test app/topics/fixed-deposit-rates/<bank-slug>/page.test.tsx
```
