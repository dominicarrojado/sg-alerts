import Page from "./page";

describe("SingaporeAirlinesFlightsJakarta", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
