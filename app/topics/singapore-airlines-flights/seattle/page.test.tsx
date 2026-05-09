import Page from "./page";

describe("SingaporeAirlinesFlightsSeattle", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
