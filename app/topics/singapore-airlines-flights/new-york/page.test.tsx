import Page from "./page";

describe("SingaporeAirlinesFlightsNewYork", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
