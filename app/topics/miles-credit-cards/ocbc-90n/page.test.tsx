import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Ocbc90NPage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "OCBC 90°N Card",
      }),
    ).toBeInTheDocument();
  });
});
