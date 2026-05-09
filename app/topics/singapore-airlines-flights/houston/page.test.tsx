import Page from "./page";

describe("SingaporeAirlinesFlightsHouston", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
