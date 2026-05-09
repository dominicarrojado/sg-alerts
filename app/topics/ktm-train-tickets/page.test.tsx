import Page from "./page";

describe("KtmTrainTickets", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
