import Page from "./page";

describe("SingaporeAirlinesFlightsMale", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
