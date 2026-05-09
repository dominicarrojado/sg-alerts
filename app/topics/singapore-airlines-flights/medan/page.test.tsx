import Page from "./page";

describe("SingaporeAirlinesFlightsMedan", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
