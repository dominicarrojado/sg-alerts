import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("ScootFlightsQingdao", () => {
  it("renders heading and flight content without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Scoot Flights to Qingdao",
      }),
    ).toBeInTheDocument();
  });
});
