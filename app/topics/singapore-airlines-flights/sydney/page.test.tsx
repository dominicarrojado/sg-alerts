import Page from "./page";

describe("SingaporeAirlinesFlightsSydney", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
