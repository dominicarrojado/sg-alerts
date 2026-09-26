import Page from "./page";

describe("ScootFlightsVienna", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
