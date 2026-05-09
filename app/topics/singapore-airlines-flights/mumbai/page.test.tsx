import Page from "./page";

describe("SingaporeAirlinesFlightsMumbai", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
