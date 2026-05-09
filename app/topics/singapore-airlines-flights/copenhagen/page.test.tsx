import Page from "./page";

describe("SingaporeAirlinesFlightsCopenhagen", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
