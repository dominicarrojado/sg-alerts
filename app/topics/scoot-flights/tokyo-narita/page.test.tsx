import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("ScootFlightsTokyoNarita", () => {
  it("renders heading and flight content without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Scoot Flights to Tokyo (Narita)",
      }),
    ).toBeInTheDocument();
  });
});
