import Page from "./page";

describe("SingaporeAirlinesFlightsMadrid", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
