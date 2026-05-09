import Page from "./page";

describe("SingaporeAirlinesFlightsManchester", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
