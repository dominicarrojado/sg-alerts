import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("StandardCharteredVisaInfinitePage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Standard Chartered Visa Infinite Card",
      }),
    ).toBeInTheDocument();
  });
});
