import Page from "./page";

describe("SingaporeAirlinesFlights", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
