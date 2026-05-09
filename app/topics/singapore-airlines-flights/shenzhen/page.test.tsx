import Page from "./page";

describe("SingaporeAirlinesFlightsShenzhen", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
