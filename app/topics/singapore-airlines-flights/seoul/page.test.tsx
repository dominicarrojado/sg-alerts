import Page from "./page";

describe("SingaporeAirlinesFlightsSeoul", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
