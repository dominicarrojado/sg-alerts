---
name: add-flight-destination
description: Use ONLY when adding or updating flight route pages for Singapore Airlines, Scoot, or Jetstar.
---

# Add Flight Destination Skill

This skill provides step-by-step guidance for adding or modifying an airline flight destination route in `sg-alerts`.

## Required Coordinated Edits

Flight destination pages require synchronized changes across four core locations:

### 1. `lib/enums.ts`

Add the destination route enum under `Routes`:

```typescript
export enum Routes {
  // ...
  SingaporeAirlinesFlightsBangkok = "/topics/singapore-airlines-flights/bangkok/",
}
```

### 2. `lib/constants.ts`

Add the destination mapping and link configuration for the target airline:

```typescript
export const SIA_FLIGHTS_DESTINATION_LINKS = [
  // ...
  {
    name: "Bangkok",
    route: Routes.SingaporeAirlinesFlightsBangkok,
  },
];
```

### 3. App Router Page (`app/topics/<airline>-flights/<destination>/page.tsx`)

Create the destination page using Next.js App Router static export standards:

```tsx
import { Metadata } from "next";
import { Routes } from "@/lib/enums";
// Import shared flight components...

export const metadata: Metadata = {
  title: "...",
  description: "...",
};

export default function FlightDestinationPage() {
  return (
    // Render flight price chart & table with destinationLinks
  );
}
```

### 4. Colocated Render Test (`app/topics/<airline>-flights/<destination>/page.test.tsx`)

Create a render test verifying page layout and component mounting:

```tsx
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Flight Destination Page", () => {
  it("renders heading and flight tables", () => {
    render(<Page />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
```

## Verification Step

Run the targeted test:

```bash
yarn test app/topics/<airline>-flights/<destination>/page.test.tsx
```
