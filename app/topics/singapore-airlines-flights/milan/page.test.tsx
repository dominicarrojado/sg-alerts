import Page from "./page";

describe("SingaporeAirlinesFlightsMilan", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
