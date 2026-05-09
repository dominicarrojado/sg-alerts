import Page from "./page";

describe("SingaporeAirlinesFlightsHongKong", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
