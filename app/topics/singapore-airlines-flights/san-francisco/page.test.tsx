import Page from "./page";

describe("SingaporeAirlinesFlightsSanFrancisco", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
