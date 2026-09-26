import Page from "./page";

describe("ScootFlightsDaNang", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
