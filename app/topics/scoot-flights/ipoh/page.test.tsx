import Page from "./page";

describe("ScootFlightsIpoh", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
