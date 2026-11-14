import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("KlookTravelDeals", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Klook Travel Deals",
      }),
    ).toBeInTheDocument();
  });
});
