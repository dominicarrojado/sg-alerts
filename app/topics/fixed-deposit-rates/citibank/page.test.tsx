import Page from "./page";

describe("CitibankFixedDepositRates", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
