// Synthetic client-shape fixtures, NOT bank requirements or live API evidence.
export const apiBase = "/__ui-fixtures";
export const updatedAt = "2026-01-15T04:00:00.000Z";
export const klookRoute = "/topics/klook-travel-deals/";
export const milesRoute = "/topics/miles-credit-cards/";
export const detailRoute = `${milesRoute}dbs-altitude/`;
export const dealTitle =
  "Preview fixture: Singapore attractions and experiences";
export const incomeNote =
  "Preview fixture only: additional eligibility conditions apply.";

const deal = {
  title: dealTitle,
  description:
    "Synthetic preview offer with a deliberately long description to inspect wrapping on narrow screens. Not a real promotion.",
  imageUrl: "",
  imageWidth: 0,
  imageHeight: 0,
  link: "https://example.invalid/fixture-klook",
  duration: "15–31 January 2026",
};
const card = {
  id: "dbs-altitude",
  bank: "DBS (synthetic preview data)",
  name: "DBS Altitude Visa Signature Card",
  tier: "entry",
  milesBonus: 25000,
  previousMilesBonus: 20000,
  milesBonusDescription: "Synthetic sign-up offer for visual inspection only.",
  milesPerDollar: { local: 1.3, overseas: 2.2 },
  annualFee: 196.2,
  annualFeeWaiver: "Preview fixture waiver notes",
  promoEndDate: "31 January 2026",
  link: "https://example.invalid/fixture-card",
};
const income = {
  currency: "SGD",
  locals: 30000,
  foreigners: 45000,
  notes: incomeNote,
};
export const scenarios = {
  "klook-results": { group: "klook" },
  "klook-empty": { group: "klook" },
  "klook-last-available": { group: "klook" },
  "klook-failure": { group: "klook", failure: true },
  "miles-income": { group: "miles", income },
  "miles-local-only": {
    group: "miles",
    income: { currency: "SGD", locals: 30000 },
  },
  "miles-foreigner-only": {
    group: "miles",
    income: { currency: "SGD", foreigners: 45000 },
  },
  "miles-notes-only": {
    group: "miles",
    income: { currency: "SGD", notes: incomeNote },
  },
  "miles-missing": { group: "miles" },
  "miles-failure": { group: "miles", failure: true },
};

export function fixtureResponse(scenario, pathname, searchParams) {
  const config = scenarios[scenario];
  if (!config) {
    throw new Error(`Unknown scenario: ${scenario}`);
  }
  if (
    pathname === `${apiBase}/subscriptions/subscribers-count` &&
    !searchParams.size
  ) {
    return { status: 200, body: 12345 };
  }
  if (
    config.group === "klook" &&
    pathname === `${apiBase}/travel-deals-checker/travel-deals-info` &&
    searchParams.get("service") === "klook" &&
    [...searchParams].length === 1
  ) {
    if (config.failure) {
      return { status: 503, body: { error: "Intentional fixture failure" } };
    }
    return {
      status: 200,
      body: {
        items:
          scenario === "klook-results"
            ? [
                deal,
                {
                  ...deal,
                  title:
                    "Preview fixture: optional description and unknown validity",
                  description: "-",
                  duration: "-",
                },
              ]
            : [],
        updatedAt,
        lastAvailableAt: scenario === "klook-last-available" ? updatedAt : "",
      },
    };
  }
  if (
    config.group === "miles" &&
    pathname ===
      `${apiBase}/travel-credit-cards-checker/travel-credit-cards-info` &&
    !searchParams.size
  ) {
    if (config.failure) {
      return { status: 503, body: { error: "Intentional fixture failure" } };
    }
    return {
      status: 200,
      body: {
        updatedAt,
        items: [
          {
            ...card,
            ...(config.income ? { minimumAnnualIncome: config.income } : {}),
          },
          {
            ...card,
            id: "citi-premiermiles",
            name: "Citi PremierMiles Card — synthetic long-name wrapping example",
          },
        ],
      },
    };
  }
  return {
    status: 404,
    body: {
      error: `No fixture for ${pathname}?${searchParams}. Check the client's endpoint and selected scenario (${scenario}).`,
    },
  };
}
