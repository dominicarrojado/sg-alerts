import Page from "./page";

describe("SingaporeAirlinesFlightsColombo", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
