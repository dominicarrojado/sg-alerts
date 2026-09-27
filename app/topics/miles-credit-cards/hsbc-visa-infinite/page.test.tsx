import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("HsbcVisaInfinitePage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "HSBC Visa Infinite Credit Card",
      }),
    ).toBeInTheDocument();
  });
});
