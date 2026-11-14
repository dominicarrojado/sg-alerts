import { render, screen } from "@testing-library/react";
import { TOPICS_MENU_ITEMS, TRAVEL_TELEGRAM_CHANNELS } from "@/lib/content";
import { TELEGRAM_CHANNELS, INACTIVE_TELEGRAM_CHANNELS } from "@/lib/constants";
import { TelegramChannel } from "@/lib/enums";
import Page from "./page";

describe("Travel", () => {
  it("renders without throwing", async () => {
    expect(() => <Page />).not.toThrow();
  });

  it("exposes the active Klook channel and dedicated topic page", () => {
    render(<Page />);

    const channel = screen.getByRole("link", {
      name: "🌏 Travel Deals (Klook)",
    });
    expect(channel).toHaveAttribute(
      "href",
      "https://t.me/SGAlertsKlookTravelDeals",
    );
    expect(
      screen
        .getAllByRole("link", { name: /View Details/ })
        .some(
          (link) => link.getAttribute("href") === "/topics/klook-travel-deals/",
        ),
    ).toBe(true);
    expect(TRAVEL_TELEGRAM_CHANNELS).toContainEqual(
      expect.objectContaining({
        id: TelegramChannel.KlookTravelDeals,
        topicRoute: "/topics/klook-travel-deals/",
      }),
    );
    expect(TOPICS_MENU_ITEMS).toContainEqual({
      title: "Klook Travel Deals",
      href: "/topics/klook-travel-deals/",
    });
    expect(TELEGRAM_CHANNELS).toContain(TelegramChannel.KlookTravelDeals);
    expect(INACTIVE_TELEGRAM_CHANNELS).not.toContain(
      TelegramChannel.KlookTravelDeals,
    );
  });
});
