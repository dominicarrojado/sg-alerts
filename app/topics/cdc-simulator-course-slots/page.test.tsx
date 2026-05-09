import Page from "./page";

describe("CdcSimulatorCourseSlots", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
