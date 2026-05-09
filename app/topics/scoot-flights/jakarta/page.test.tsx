import Page from "./page";

describe("ScootFlightsJakarta", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
