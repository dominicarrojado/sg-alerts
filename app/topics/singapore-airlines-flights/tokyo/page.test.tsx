import Page from "./page";

describe("SingaporeAirlinesFlightsTokyo", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
