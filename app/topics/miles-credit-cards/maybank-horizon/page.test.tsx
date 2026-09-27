import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("MaybankHorizonPage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Maybank Horizon Visa Signature Card",
      }),
    ).toBeInTheDocument();
  });
});
