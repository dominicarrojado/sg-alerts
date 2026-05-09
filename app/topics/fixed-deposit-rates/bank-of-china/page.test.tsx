import Page from "./page";

describe("BankOfChinaFixedDepositRates", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
