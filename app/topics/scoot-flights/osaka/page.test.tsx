import Page from "./page";

describe("ScootFlightsOsaka", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
