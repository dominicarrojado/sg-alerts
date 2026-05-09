import Page from "./page";

describe("SingaporeAirlinesFlightsManila", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
