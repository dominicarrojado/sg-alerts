import Page from "./page";

describe("FixedDepositRates", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
