import Page from "./page";

describe("ScootFlightsHanoi", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
