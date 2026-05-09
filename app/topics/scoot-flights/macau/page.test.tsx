import Page from "./page";

describe("ScootFlightsMacau", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
