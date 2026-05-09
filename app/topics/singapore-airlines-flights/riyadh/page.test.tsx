import Page from "./page";

describe("SingaporeAirlinesFlightsRiyadh", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
