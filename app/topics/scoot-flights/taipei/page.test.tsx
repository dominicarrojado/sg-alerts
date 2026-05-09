import Page from "./page";

describe("ScootFlightsTaipei", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
