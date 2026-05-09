import Page from "./page";

describe("CdcAppointmentSlots", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
