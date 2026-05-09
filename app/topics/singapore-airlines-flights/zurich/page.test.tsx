import Page from "./page";

describe("SingaporeAirlinesFlightsZurich", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
