import Page from "./page";

describe("SingaporeAirlinesFlightsChennai", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
