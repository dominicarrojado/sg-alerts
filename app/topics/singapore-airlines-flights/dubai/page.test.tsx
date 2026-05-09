import Page from "./page";

describe("SingaporeAirlinesFlightsDubai", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
