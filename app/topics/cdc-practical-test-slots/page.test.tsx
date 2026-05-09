import Page from "./page";

describe("CdcPracticalTestSlots", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
