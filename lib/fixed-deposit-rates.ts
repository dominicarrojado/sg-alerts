import {
  DEPOSIT_RATES_BANK_PRIMARY_COLORS,
  DEPOSIT_RATES_CHART_COLORS,
} from "./constants";

const normalizeBankColorKey = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();

const DEPOSIT_RATES_BANK_PRIMARY_COLORS_BY_NORMALIZED_KEY: Record<
  string,
  string
> = Object.entries(DEPOSIT_RATES_BANK_PRIMARY_COLORS).reduce(
  (accumulator, [bankName, color]) => {
    accumulator[normalizeBankColorKey(bankName)] = color;
    return accumulator;
  },
  {} as Record<string, string>,
);

export const getDepositRatesChartBankColor = (
  bankKey: string,
  bankLabel: string,
  fallbackIndex: number,
) => {
  const normalizedCandidates = [bankLabel, bankKey]
    .filter(Boolean)
    .map(normalizeBankColorKey);

  for (const candidate of normalizedCandidates) {
    if (DEPOSIT_RATES_BANK_PRIMARY_COLORS_BY_NORMALIZED_KEY[candidate]) {
      return DEPOSIT_RATES_BANK_PRIMARY_COLORS_BY_NORMALIZED_KEY[candidate];
    }

    for (const primaryColorKey of Object.keys(
      DEPOSIT_RATES_BANK_PRIMARY_COLORS_BY_NORMALIZED_KEY,
    )) {
      if (candidate.includes(primaryColorKey)) {
        return DEPOSIT_RATES_BANK_PRIMARY_COLORS_BY_NORMALIZED_KEY[
          primaryColorKey
        ];
      }
    }
  }

  return DEPOSIT_RATES_CHART_COLORS[
    fallbackIndex % DEPOSIT_RATES_CHART_COLORS.length
  ];
};
