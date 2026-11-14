import { render, screen } from "@testing-library/react";
import { useGetTravelDealsInfo } from "@/lib/api-hooks";
import { FetchStatus, TravelDealsService } from "@/lib/enums";
import type { TravelDealInfo } from "@/lib/types";
import Page, { metadata } from "./page";

jest.mock("../../../lib/api-hooks", () => ({
  useGetTravelDealsInfo: jest.fn(),
}));

const mockUseGetTravelDealsInfo = jest.mocked(useGetTravelDealsInfo);
const getTravelDealsInfo = jest.fn();
const emptyInfo: TravelDealInfo = {
  items: [],
  updatedAt: "14 Nov 2026, 10:00 AM",
  lastAvailableAt: "",
};

describe("KlookTravelDeals", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseGetTravelDealsInfo.mockReturnValue([
      FetchStatus.Loading,
      emptyInfo,
      getTravelDealsInfo,
    ]);
  });

  it("renders the heading, loads Klook deals and links to its channel", () => {
    render(<Page />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Klook Travel Deals" }),
    ).toBeInTheDocument();
    expect(mockUseGetTravelDealsInfo).toHaveBeenCalledWith(
      TravelDealsService.KLOOK,
    );
    expect(getTravelDealsInfo).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Subscribe Now/ })).toHaveAttribute(
      "href",
      "https://t.me/SGAlertsKlookTravelDeals",
    );
  });

  it("uses the dedicated canonical and social metadata", () => {
    expect(metadata.alternates?.canonical).toBe("/topics/klook-travel-deals/");
    expect(metadata.openGraph).toMatchObject({
      title: "Klook Travel Deals",
      url: "/topics/klook-travel-deals/",
    });
    expect(metadata.twitter).toMatchObject({ title: "Klook Travel Deals" });
  });

  it("renders Klook product links and plain-text promotions with unknown validity", () => {
    mockUseGetTravelDealsInfo.mockReturnValue([
      FetchStatus.Success,
      {
        ...emptyInfo,
        items: [
          {
            title: "Singapore attraction and experience combo",
            description: "3% off, 15% off (combo offer)\nPrice: S$ 353.09",
            link: "https://www.klook.com/en-SG/activity/123-example/",
            imageUrl: "https://res.klook.com/image/upload/example.jpg",
            imageWidth: 600,
            imageHeight: 375,
            duration: "-",
          },
        ],
      },
      getTravelDealsInfo,
    ]);

    render(<Page />);

    expect(
      screen.getByRole("link", {
        name: "Singapore attraction and experience combo",
      }),
    ).toHaveAttribute(
      "href",
      "https://www.klook.com/en-SG/activity/123-example/",
    );
    expect(
      screen.getByText("3% off, 15% off (combo offer) Price: S$ 353.09"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Last updated on ${emptyInfo.updatedAt}.`),
    ).toBeInTheDocument();
    expect(screen.getAllByText("-")).toHaveLength(2);
  });

  it.each([
    ["", "No travel deals currently available."],
    ["13 Nov 2026", "Last travel deal was spotted on 13 Nov 2026."],
  ])(
    "renders the empty state with lastAvailableAt=%s",
    (lastAvailableAt, message) => {
      mockUseGetTravelDealsInfo.mockReturnValue([
        FetchStatus.Success,
        { ...emptyInfo, lastAvailableAt },
        getTravelDealsInfo,
      ]);

      render(<Page />);

      expect(screen.getByText(message)).toBeInTheDocument();
      expect(screen.queryByRole("table")).not.toBeInTheDocument();
    },
  );

  it("keeps subscription available when the deal request fails", () => {
    mockUseGetTravelDealsInfo.mockReturnValue([
      FetchStatus.Failure,
      emptyInfo,
      getTravelDealsInfo,
    ]);

    render(<Page />);

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Subscribe Now/ }),
    ).toBeInTheDocument();
  });
});
