import Page from "./page";

describe("SingaporeAirlinesFlightsMunich", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
