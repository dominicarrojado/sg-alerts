import Page from "./page";

describe("SingaporeAirlinesFlightsAdelaide", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
