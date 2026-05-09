import Page from "./page";

describe("ScootFlightsKotaKinabalu", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
