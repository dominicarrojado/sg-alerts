import Page from "./page";

describe("SsdcAppointmentSlots", () => {
  it.only("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });
});
