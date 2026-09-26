import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("TripComTravelDeals", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Trip.com Travel Deals",
      }),
    ).toBeInTheDocument();
  });
});
