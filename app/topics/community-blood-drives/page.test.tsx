import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("CommunityBloodDrives", () => {
  it("renders without throwing", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Community Blood Drives" }),
    ).toBeInTheDocument();
  });
});
