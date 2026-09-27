import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("DbsAltitudePage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "DBS Altitude Visa Signature Card",
      }),
    ).toBeInTheDocument();
  });
});
