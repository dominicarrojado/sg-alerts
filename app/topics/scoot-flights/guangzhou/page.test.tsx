import Page from "./page";

describe("ScootFlightsGuangzhou", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
