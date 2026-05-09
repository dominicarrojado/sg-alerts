import Page from "./page";

describe("SingaporeAirlinesFlightsBarcelona", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
