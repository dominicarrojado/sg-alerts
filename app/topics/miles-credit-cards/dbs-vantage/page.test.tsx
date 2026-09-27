import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("DbsVantagePage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "DBS Vantage Visa Infinite Card",
      }),
    ).toBeInTheDocument();
  });
});
