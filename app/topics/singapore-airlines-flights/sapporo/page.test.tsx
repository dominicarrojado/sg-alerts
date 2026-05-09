import Page from "./page";

describe("SingaporeAirlinesFlightsSapporo", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
