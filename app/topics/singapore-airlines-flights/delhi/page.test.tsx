import Page from "./page";

describe("SingaporeAirlinesFlightsDelhi", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
