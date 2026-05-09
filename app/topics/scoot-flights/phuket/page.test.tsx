import Page from "./page";

describe("ScootFlightsPhuket", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
