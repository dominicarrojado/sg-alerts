import Page from "./page";

describe("SingaporeAirlinesFlightsLosAngeles", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
