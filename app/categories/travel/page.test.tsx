import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Travel", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Travel in Singapore",
      }),
    ).toBeInTheDocument();
  });
});
