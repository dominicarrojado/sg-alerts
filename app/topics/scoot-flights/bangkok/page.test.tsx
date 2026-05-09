import Page from "./page";

describe("ScootFlightsBangkok", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
