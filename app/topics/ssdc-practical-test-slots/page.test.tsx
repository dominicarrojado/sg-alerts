import Page from "./page";

describe("SsdcPracticalTestSlots", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
