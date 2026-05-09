import Page from "./page";

describe("SingaporeAirlinesFlightsBangkok", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
