import Page from "./page";

describe("ScootFlightsTokyo", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
