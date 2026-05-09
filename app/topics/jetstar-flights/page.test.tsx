import Page from "./page";

describe("JetstarFlights", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
