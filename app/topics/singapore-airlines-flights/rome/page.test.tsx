import Page from "./page";

describe("SingaporeAirlinesFlightsRome", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
