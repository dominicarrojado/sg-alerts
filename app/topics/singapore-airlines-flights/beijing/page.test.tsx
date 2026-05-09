import Page from "./page";

describe("SingaporeAirlinesFlightsBeijing", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
