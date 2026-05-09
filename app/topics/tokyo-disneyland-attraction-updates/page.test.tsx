import Page from "./page";

describe("TokyoDisneylandAttractionUpdates", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
