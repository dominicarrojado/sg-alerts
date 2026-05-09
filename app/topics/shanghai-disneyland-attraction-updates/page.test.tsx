import Page from "./page";

describe("ShanghaiDisneylandAttractionUpdates", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
