import Page from "./page";

describe("SingaporeSafetyDrivingCentre", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
