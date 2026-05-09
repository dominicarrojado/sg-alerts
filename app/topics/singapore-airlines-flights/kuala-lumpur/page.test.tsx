import Page from "./page";

describe("SingaporeAirlinesFlightsKualaLumpur", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
