import Page from "./page";

describe("ScootFlightsJeju", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
