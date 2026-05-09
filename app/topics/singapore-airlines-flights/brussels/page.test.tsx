import Page from "./page";

describe("SingaporeAirlinesFlightsBrussels", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
