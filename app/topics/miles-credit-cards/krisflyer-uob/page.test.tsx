import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("KrisFlyerUobPage", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "KrisFlyer UOB Credit Card",
      }),
    ).toBeInTheDocument();
  });
});
