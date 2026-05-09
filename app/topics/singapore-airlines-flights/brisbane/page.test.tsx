import Page from "./page";

describe("SingaporeAirlinesFlightsBrisbane", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
