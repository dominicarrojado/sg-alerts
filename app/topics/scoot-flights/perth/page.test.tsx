import Page from "./page";

describe("ScootFlightsPerth", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
