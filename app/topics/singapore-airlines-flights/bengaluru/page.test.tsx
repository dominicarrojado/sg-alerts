import Page from "./page";

describe("SingaporeAirlinesFlightsBengaluru", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
