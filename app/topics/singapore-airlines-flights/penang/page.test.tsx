import Page from "./page";

describe("SingaporeAirlinesFlightsPenang", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
