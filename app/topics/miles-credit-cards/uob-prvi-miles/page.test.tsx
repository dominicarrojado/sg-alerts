import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("UobPrviMilesPage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "UOB PRVI Miles Card",
      }),
    ).toBeInTheDocument();
  });
});
