import Page from "./page";

describe("CdcPracticalLessonSlots", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
