import Page from "./page";

describe("ScootFlightsSydney", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
