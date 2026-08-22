import Page from "./page";

describe("GoldenVillageMovies", () => {
  it("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
