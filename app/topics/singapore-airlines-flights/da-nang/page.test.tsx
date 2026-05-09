import Page from "./page";

describe("SingaporeAirlinesFlightsDaNang", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
