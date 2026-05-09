import Page from "./page";

describe("ScootFlightsHongKong", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
