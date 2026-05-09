import Page from "./page";

describe("SingaporeAirlinesFlightsAmsterdam", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
