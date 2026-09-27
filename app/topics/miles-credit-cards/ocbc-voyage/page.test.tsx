import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("OcbcVoyagePage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "OCBC VOYAGE Card",
      }),
    ).toBeInTheDocument();
  });
});
