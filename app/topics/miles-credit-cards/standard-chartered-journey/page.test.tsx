import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("StandardCharteredJourneyPage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Standard Chartered Journey Credit Card",
      }),
    ).toBeInTheDocument();
  });
});
