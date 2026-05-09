import Page from "./page";

describe("ScootFlightsSeoul", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
