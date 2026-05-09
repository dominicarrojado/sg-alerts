import Page from "./page";

describe("SingaporeAirlinesFlightsIstanbul", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
