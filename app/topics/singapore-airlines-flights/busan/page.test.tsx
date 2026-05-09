import Page from "./page";

describe("SingaporeAirlinesFlightsBusan", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
