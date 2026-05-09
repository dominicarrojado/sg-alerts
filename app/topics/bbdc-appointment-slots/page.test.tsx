import Page from "./page";

describe("BBDCAppointmentSlots", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
