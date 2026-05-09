import Page from "./page";

describe("ScootFlightsChennai", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
