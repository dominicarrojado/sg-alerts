import Page from "./page";

describe("SingaporeAirlinesFlightsParis", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
