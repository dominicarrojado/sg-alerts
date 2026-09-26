import Page from "./page";

describe("ScootFlightsOkinawa", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
