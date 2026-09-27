import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("AmericanExpressSingaporeAirlinesKrisFlyerAscendPage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "American Express Singapore Airlines KrisFlyer Ascend Credit Card",
      }),
    ).toBeInTheDocument();
  });
});
