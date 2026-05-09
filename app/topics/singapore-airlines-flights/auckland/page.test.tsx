import Page from "./page";

describe("SingaporeAirlinesFlightsAuckland", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
