import Page from "./page";

describe("SingaporeAirlinesFlightsFrankfurt", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
