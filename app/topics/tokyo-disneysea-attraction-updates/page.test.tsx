import Page from "./page";

describe("TokyoDisneySeaAttractionUpdates", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
