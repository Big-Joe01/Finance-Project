# Finance App - Screens Documentation

> **Version:** 1.0.0  
> **Last Updated:** 2024  
> **Framework:** React Native with Expo SDK 57  
> **Navigation:** React Navigation (Native Stack + Bottom Tabs)

---

## Table of Contents

1. [Withdrawal Screen](#1-withdrawal-screen)
2. [Withdrawal Successful Screen](#2-withdrawal-successful-screen)
3. [Mobile Recharge Screen](#3-mobile-recharge-screen)
4. [Mobile Confirm Screen](#4-mobile-confirm-screen)
5. [Mobile Successful Screen](#5-mobile-successful-screen)

---

## 1. Withdrawal Screen

### File
```
src/screens/WithdrawalScreen.js
```

### Purpose
Allows users to initiate a withdrawal from their account/card to a phone number.

### User Flow
```
[Select Account] → [Enter Phone Number] → [Choose Amount] → [Verify] → [Success Screen]
```

### State Management

| State Variable | Type | Description |
|---------------|------|-------------|
| `account` | `string` | Selected account/card number |
| `phone` | `string` | Recipient phone number |
| `amount` | `string` | Withdrawal amount (e.g., "$100") |
| `selectedAmount` | `number \| string` | Quick amount selection (10, 50, 100, etc.) or "other" |
| `modalVisible` | `boolean` | Controls account selection modal visibility |

### UI Components

| Component | Type | Description |
|-----------|------|-------------|
| Header | `View + TouchableOpacity` | Back button + "Withdraw" title |
| Illustration | `Image` | SVG illustration (exchange.svg) |
| Account Selector | `TouchableOpacity` | Dropdown to select account/card |
| Balance Display | `Text` | Shows available balance (conditional) |
| Phone Input | `TextInput` | Phone number entry field |
| Amount Grid | `TouchableOpacity[]` | Quick amount selection buttons |
| Custom Amount | `TextInput` | Manual amount entry |
| Verify Button | `TouchableOpacity` | Submit button (disabled when invalid) |
| Account Modal | `Modal` | Bottom sheet for account selection |

### Form Validation

```javascript
const isFormValid = 
  account.trim() !== "" &&   // Account must be selected
  phone.trim() !== "" &&     // Phone number required
  amount.trim() !== "";       // Amount must be entered
```

### Backend Placeholders (TODOs)

```javascript
// TODO: Fetch user accounts from backend
// Expected: GET /api/accounts
// Returns: Array of account objects with id, type, number, balance

// TODO: Fetch wallet/card balance from backend
// Expected: GET /api/accounts/{id}/balance
// Returns: { balance: number, currency: string }

// TODO: Validate withdrawal request
// Expected: POST /api/withdraw/validate
// Body: { accountId, phone, amount }
// Returns: { valid: boolean, message?: string }

// TODO: Submit withdrawal request
// Expected: POST /api/withdraw
// Body: { accountId, phone, amount }
// Returns: { transactionId, status, timestamp }
```

### Navigation
- **Go Back:** `navigation.goBack()`
- **On Success:** `navigation.navigate("WithdrawalSuccessful")`

### Styling Theme
| Element | Color | Notes |
|---------|-------|-------|
| Primary | `#5C4CF6` | Buttons, selected states |
| Background | `#F8F8FB` | Screen background |
| Text Primary | `#333` | Titles, main text |
| Text Secondary | `#888` | Labels, placeholders |
| Disabled | `#E4E4EC` | Disabled buttons |

### Quick Amounts
```javascript
const quickAmounts = [10, 50, 100, 150, 200];
```

---

## 2. Withdrawal Successful Screen

### File
```
src/screens/WithdrawalSuccessfulScreen.js
```

### Purpose
Displays confirmation of a successful withdrawal transaction.

### User Flow
```
[Withdrawal Screen] → [Verify] → [Success Screen] → [Confirm] → [Home/Tabs]
```

### UI Components

| Component | Type | Description |
|-----------|------|-------------|
| Container | `SafeAreaView` | Safe area wrapper |
| Success Illustration | `Image` | SVG illustration (exchange.svg) |
| Title | `Text` | "Successful withdrawal!" |
| Description | `Text[]` | Three lines of instruction text |
| Confirm Button | `TouchableOpacity` | Returns to home |

### Screen Layout
```
┌─────────────────────────────┐
│                             │
│      [Illustration]        │
│          (220px)            │
│                             │
│    Successful withdrawal!   │
│         (28px, bold)        │
│                             │
│  You have successfully      │
│  withdrawn money!           │
│                             │
│  Please check the balance   │
│  in the card management     │
│  section.                   │
│                             │
│  ┌─────────────────────┐   │
│  │       Confirm       │   │
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

### Backend Placeholders (TODOs)

```javascript
// TODO: Refresh user's wallet/card balance
// Expected: GET /api/accounts/{id}/balance
// Purpose: Update balance display on home screen

// TODO: Refresh transaction history
// Expected: GET /api/transactions?type=withdrawal
// Purpose: Update transaction list with new entry

// TODO: Fetch latest account details
// Expected: GET /api/accounts/{id}
// Purpose: Get updated account information
```

### Navigation
- **Confirm:** `navigation.navigate("Tabs")` - Returns to main tab navigation

### Styling Theme
| Element | Color | Notes |
|---------|-------|-------|
| Primary Button | `#5B5FEF` | Confirm button |
| Title | `#4338CA` | Success title |
| Background | `#F8F8FB` | Screen background |
| Description | `#3F3F46` | Body text |

### Key Features
- ✅ Single confirmation action
- ✅ Clear success messaging
- ✅ Instructions for next steps
- ✅ Visual feedback with illustration

---

## 3. Mobile Recharge Screen

### File
```
src/screens/MobileRechargeScreen.js
```

### Purpose
Allows users to recharge a mobile phone number with predefined or custom amounts.

### User Flow
```
[Select Account] → [Choose Beneficiary] → [Enter Phone] → [Select Amount] → [Confirm]
```

### State Management

| State Variable | Type | Description |
|---------------|------|-------------|
| `account` | `string` | Selected payment method (default: "VISA **** **** **** 1234") |
| `phone` | `string` | Phone number to recharge |
| `selectedAmount` | `number \| string` | Chosen recharge amount |
| `beneficiary` | `number` | Selected beneficiary ID (from directory) |

### UI Components

| Component | Type | Description |
|-----------|------|-------------|
| Header | `View` | Back button + "Mobile prepaid" title |
| Account Selector | `TouchableOpacity` | Payment method selector |
| Balance Display | `Text` | Available balance |
| Directory Section | `View` | Beneficiary selection area |
| Beneficiary Cards | `TouchableOpacity[]` | Avatar cards for quick selection |
| Add Beneficiary | `TouchableOpacity` | "+" button to add new |
| Phone Input | `TextInput` | Phone number entry |
| Amount Grid | `TouchableOpacity[]` | Quick amount buttons ($10, $20, $30) |
| Other Amount | `TouchableOpacity` | Custom amount option |
| Selected Amount | `View` | Shows current selection |
| Confirm Button | `TouchableOpacity` | Submit button |

### Form Validation

```javascript
const isValid = 
  account &&                              // Account selected
  phone.trim() !== "" &&                  // Phone number entered
  selectedAmount !== null;                 // Amount selected
```

### Backend Placeholders (TODOs)

```javascript
// TODO: Fetch linked cards/accounts
// Expected: GET /api/accounts
// Returns: [{ id, type, number, balance, currency }]

// TODO: Fetch user's wallet balance
// Expected: GET /api/wallet/balance
// Returns: { balance: number, currency: string }

// TODO: Fetch beneficiary list
// Expected: GET /api/beneficiaries?type=mobile
// Returns: [{ id, name, phone, avatar }]

// TODO: Validate recharge
// Expected: POST /api/recharge/validate
// Body: { accountId, phone, amount, beneficiaryId? }
// Returns: { valid: boolean, fee?: number, total?: number }

// TODO: Submit recharge request
// Expected: POST /api/recharge
// Body: { accountId, phone, amount, beneficiaryId? }
// Returns: { transactionId, status, timestamp }
```

### Beneficiary Data Structure
```javascript
const beneficiaries = [
  { id: 1, name: "Emma", image: require("...") },
  { id: 2, name: "Justin", image: require("...") }
];
```

### Quick Amounts
```javascript
const quickAmounts = [10, 20, 30];
```

### Navigation
- **Go Back:** `navigation.goBack()`
- **On Confirm:** `navigation.navigate("MobileConfirm", { account, phone, amount, beneficiary })`

### Styling Theme
| Element | Color | Notes |
|---------|-------|-------|
| Primary | `#5B5FEF` | Buttons, selected states |
| Background | `#F8F8FB` | Screen background |
| Card | `#FFFFFF` | Input fields, cards |
| Text Primary | `#333` | Titles |
| Text Secondary | `#666` | Labels |

### Key Features
- ✅ Quick beneficiary selection
- ✅ Add new beneficiary option
- ✅ Preset amount options
- ✅ Custom amount entry
- ✅ Visual feedback on selection

---

## 4. Mobile Confirm Screen

### File
```
src/screens/MobileConfirmScreen.js
```

### Purpose
Displays recharge details for final confirmation before processing.

### Route Parameters
```javascript
route.params = {
  phone: string,     // Phone number to recharge
  amount: string,    // Recharge amount (e.g., "$10")
  account: string    // Payment account (optional, can be undefined)
}
```

### User Flow
```
[Mobile Recharge] → [Confirm] → [Success/Error]
```

### UI Components

| Component | Type | Description |
|-----------|------|-------------|
| Header | `View` | Back button + "Mobile prepaid" title |
| Illustration | `Image` | SVG illustration |
| Heading | `Text` | "Confirm Recharge" |
| Subtext | `Text` | Instruction text |
| Details Card | `View` | Transaction summary |
| Phone Row | `View` | Phone number display |
| Amount Row | `View` | Recharge amount display |
| Confirm Button | `TouchableOpacity` | Process transaction |

### Screen Layout
```
┌─────────────────────────────┐
│ ← Mobile prepaid            │
│                             │
│      [Illustration]         │
│         (220px)             │
│                             │
│     Confirm Recharge        │
│      (28px, bold)           │
│                             │
│  Please confirm the         │
│  recharge details before    │
│  proceeding.                │
│                             │
│  ┌─────────────────────┐   │
│  │ Phone Number    XXX │   │
│  ├─────────────────────┤   │
│  │ Recharge       $10  │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │      Confirm        │   │
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

### Backend Placeholders (TODOs)

```javascript
// TODO: Validate recharge request
// Expected: POST /api/recharge/validate
// Body: { phone, amount, accountId }
// Returns: { valid: boolean, fee: number, total: number, message?: string }

// TODO: Verify account balance
// Expected: GET /api/accounts/{id}/balance
// Returns: { balance: number, sufficient: boolean }

// TODO: Calculate charges
// Expected: Calculated client-side or from validate endpoint
// Returns: { amount, fee, total }

// TODO: Submit recharge transaction
// Expected: POST /api/recharge
// Body: { phone, amount, accountId }
// Returns: { transactionId, status, timestamp, newBalance }
```

### Navigation
- **Go Back:** `navigation.goBack()`
- **On Confirm:** `navigation.navigate("MobileSuccessful", { phone, amount })`

### Styling Theme
| Element | Color | Notes |
|---------|-------|-------|
| Primary Button | `#5B5FEF` | Confirm button |
| Title | `#4F46E5` | "Confirm Recharge" |
| Amount | `#4F46E5` | Highlighted amount |
| Card | `#FFFFFF` | Details card with shadow |
| Background | `#F8F8FB` | Screen background |

### Key Features
- ✅ Summary display of transaction
- ✅ Clear confirmation step
- ✅ Professional layout
- ✅ Easy to review before committing

---

## 5. Mobile Successful Screen

### File
```
src/screens/MobileSuccessfulScreen.js
```

### Purpose
Displays confirmation of a successful mobile recharge transaction.

### Route Parameters
```javascript
route.params = {
  phone: string,     // Recharged phone number
  amount: string     // Recharge amount (e.g., "$10")
}
```

### User Flow
```
[Mobile Confirm] → [Confirm] → [Success Screen] → [Done] → [Home/Tabs]
```

### UI Components

| Component | Type | Description |
|-----------|------|-------------|
| Header | `View` | Back button + "Mobile prepaid" title |
| Illustration | `Image` | SVG illustration |
| Success Title | `Text` | "Recharge Successful!" |
| Message | `Text[]` | Two lines of success message |
| Receipt | `View` | Transaction receipt card |
| Phone Row | `View` | Phone number in receipt |
| Amount Row | `View` | Recharge amount in receipt |
| Done Button | `TouchableOpacity` | Return to home |

### Screen Layout
```
┌─────────────────────────────┐
│ ← Mobile prepaid            │
│                             │
│      [Illustration]         │
│         (220px)             │
│                             │
│   Recharge Successful!     │
│       (28px, bold)          │
│                             │
│   Your mobile recharge      │
│   has been completed        │
│   successfully.             │
│                             │
│  ┌─────────────────────┐   │
│  │ Phone Number    XXX │   │
│  ├─────────────────────┤   │
│  │ Recharge       $10  │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │        Done         │   │
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

### Backend Placeholders (TODOs)

```javascript
// TODO: Refresh wallet balance
// Expected: GET /api/wallet/balance
// Purpose: Update displayed balance on home screen

// TODO: Refresh transaction history
// Expected: GET /api/transactions?type=recharge
// Purpose: Add new transaction to history

// TODO: Update recent transactions
// Expected: GET /api/transactions/recent
// Purpose: Update "Recent" section on home/dashboard
```

### Receipt Data Structure
```javascript
const receipt = {
  phoneNumber: route.params.phone,
  rechargeAmount: route.params.amount,
  timestamp: new Date().toISOString()  // Would come from backend
};
```

### Navigation
- **Done:** `navigation.navigate("Tabs")` - Returns to main tab navigation

### Styling Theme
| Element | Color | Notes |
|---------|-------|-------|
| Primary Button | `#5B5FEF` | Done button |
| Success Title | `#4F46E5` | "Recharge Successful!" |
| Amount | `#4F46E5` | Highlighted amount in receipt |
| Receipt Card | `#FFFFFF` | Card with subtle shadow |
| Background | `#F8F8FB` | Screen background |

### Key Features
- ✅ Clear success indication
- ✅ Transaction receipt
- ✅ Detailed breakdown
- ✅ Easy return to home

---

## Common Patterns

### Button States
```javascript
// Disabled state (form not valid)
<TouchableOpacity
  disabled={!isFormValid}
  style={[styles.button, !isFormValid && styles.disabledButton]}
>
```

### Navigation Pattern
```javascript
// Go back
navigation.goBack();

// Navigate to screen with params
navigation.navigate("ScreenName", { key: value });

// Navigate to tab navigator
navigation.navigate("Tabs");
```

### Backend Integration Pattern
```javascript
// State for loading
const [loading, setLoading] = useState(false);

// API call pattern
const handleSubmit = async () => {
  setLoading(true);
  try {
    const response = await api.post('/endpoint', data);
    navigation.navigate("Success");
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};
```

### Form Validation Pattern
```javascript
const isValid = 
  account && phone.trim() !== "" && selectedAmount !== null;

// Disabled button when invalid
<TouchableOpacity disabled={!isValid} ...>
```

---

## API Endpoints Summary

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/accounts` | GET | Fetch user accounts |
| `/api/accounts/{id}/balance` | GET | Get account balance |
| `/api/beneficiaries` | GET | Fetch beneficiary list |
| `/api/withdraw` | POST | Submit withdrawal |
| `/api/withdraw/validate` | POST | Validate withdrawal |
| `/api/recharge` | POST | Submit recharge |
| `/api/recharge/validate` | POST | Validate recharge |
| `/api/transactions` | GET | Fetch transactions |

---

## Color Palette

| Name | Hex Code | Usage |
|------|----------|-------|
| Primary | `#5C4CF6` | Buttons, selected states (Withdrawal) |
| Primary Alt | `#5B5FEF` | Buttons, selected states (Mobile) |
| Primary Dark | `#4F46E5` | Titles, amounts |
| Indigo | `#4338CA` | Success titles |
| Background | `#F8F8FB` | Screen backgrounds |
| Card | `#FFFFFF` | Cards, inputs |
| Text Primary | `#333` | Main text |
| Text Secondary | `#666` | Labels |
| Text Muted | `#888` | Placeholders |
| Border | `#D8D8D8` | Input borders |
| Disabled | `#E4E4EC` | Disabled buttons |
| Disabled Alt | `#CFCFD4` | Disabled alt |

---

## Notes

1. **Static Data**: Currently uses hardcoded data for accounts and beneficiaries
2. **Mock Navigation**: All screens use placeholder navigation
3. **API Placeholders**: Backend integration marked with TODO comments
4. **Error Handling**: Basic error handling structure in place
5. **Loading States**: UI ready for loading indicators

---

*Document generated for Finance App project*
