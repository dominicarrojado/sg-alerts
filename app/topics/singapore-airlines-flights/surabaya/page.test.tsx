import Page from "./page";

describe("SingaporeAirlinesFlightsSurabaya", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
