import Page from "./page";

describe("ScootFlightsClark", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
