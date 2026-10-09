import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("ScootFlightsSapporo", () => {
  it("renders heading and flight content without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Scoot Flights to Sapporo (Hokkaido)",
      }),
    ).toBeInTheDocument();
  });
});
