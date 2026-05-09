import Page from "./page";

describe("MaybankFixedDepositRates", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
