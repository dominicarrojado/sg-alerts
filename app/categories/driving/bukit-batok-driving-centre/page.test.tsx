import Page from "./page";

describe("BukitBatokDrivingCentre", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
