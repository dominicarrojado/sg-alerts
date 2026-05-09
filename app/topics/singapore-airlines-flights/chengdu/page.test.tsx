import Page from "./page";

describe("SingaporeAirlinesFlightsChengdu", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
