import Page from "./page";

describe("SingaporeAirlinesFlightsCebu", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
