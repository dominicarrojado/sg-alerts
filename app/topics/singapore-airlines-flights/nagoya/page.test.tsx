import Page from "./page";

describe("SingaporeAirlinesFlightsNagoya", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
