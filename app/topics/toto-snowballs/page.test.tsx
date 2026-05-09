import Page from "./page";

describe("TotoSnowballs", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
