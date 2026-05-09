import Page from "./page";

describe("ScootFlightsKualaLumpur", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
