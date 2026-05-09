import Page from "./page";

describe("ScootFlightsChiangMai", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
