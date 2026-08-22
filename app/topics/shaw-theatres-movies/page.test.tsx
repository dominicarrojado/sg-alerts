import Page from "./page";

describe("ShawTheatresMovies", () => {
  it("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
