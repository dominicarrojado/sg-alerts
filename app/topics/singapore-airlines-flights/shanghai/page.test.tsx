import Page from "./page";

describe("SingaporeAirlinesFlightsShanghai", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
