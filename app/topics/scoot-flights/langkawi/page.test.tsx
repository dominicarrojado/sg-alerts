import Page from "./page";

describe("ScootFlightsLangkawi", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
