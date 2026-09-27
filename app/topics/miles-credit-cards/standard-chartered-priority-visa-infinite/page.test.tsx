import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("StandardCharteredPriorityVisaInfinitePage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Standard Chartered Priority Banking Visa Infinite Credit Card",
      }),
    ).toBeInTheDocument();
  });
});
