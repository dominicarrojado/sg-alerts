import Page from "./page";

describe("TreasuryBillsRates", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
