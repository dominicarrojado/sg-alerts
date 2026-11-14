import { render, screen } from "@testing-library/react";
import { useGetMilesCreditCardsInfo } from "@/lib/api-hooks";
import { FetchStatus } from "@/lib/enums";
import { MilesCreditCard, MinimumAnnualIncome } from "@/lib/types";
import { MilesCreditCardDetails } from "./miles-credit-card-details";
import { MilesCreditCardsTable } from "./miles-credit-cards-table";

jest.mock("../../../lib/api-hooks", () => ({
  useGetMilesCreditCardsInfo: jest.fn(),
}));

const mockUseGetMilesCreditCardsInfo = jest.mocked(useGetMilesCreditCardsInfo);
const getInfo = jest.fn();
const card: MilesCreditCard = {
  id: "dbs-altitude",
  bank: "DBS",
  name: "DBS Altitude Visa Signature Card",
  tier: "entry",
  milesBonus: 25000,
  milesBonusDescription: "Welcome bonus",
  milesPerDollar: { local: 1.3, overseas: 2.2 },
  annualFee: 196.2,
  promoEndDate: "",
  link: "https://www.dbs.com.sg/",
};

function mockResponse(minimumAnnualIncome?: MinimumAnnualIncome) {
  mockUseGetMilesCreditCardsInfo.mockReturnValue([
    FetchStatus.Success,
    { items: [{ ...card, minimumAnnualIncome }], updatedAt: "14 Nov 2026" },
    getInfo,
  ]);
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("MilesCreditCardDetails minimum income", () => {
  it("renders both applicant amounts, notes, and the eligibility reminder", () => {
    mockResponse({
      currency: "SGD",
      locals: 30000,
      foreigners: 45000,
      notes: "Additional eligibility conditions apply.",
    });
    render(<MilesCreditCardDetails cardId={card.id} />);

    expect(
      screen.getByRole("heading", { name: "Minimum Annual Income", level: 3 }),
    ).toBeInTheDocument();
    expect(screen.getByText("S$30,000 / year")).toBeInTheDocument();
    expect(screen.getByText("S$45,000 / year")).toBeInTheDocument();
    expect(
      screen.getByText("Additional eligibility conditions apply."),
    ).toBeInTheDocument();
  });

  it("shows unavailable amounts when income information is missing", () => {
    mockResponse();
    render(<MilesCreditCardDetails cardId={card.id} />);
    expect(screen.getAllByText("Not available")).toHaveLength(2);
  });

  it("shows eligibility notes when no amounts are published", () => {
    mockResponse({ currency: "SGD", notes: "Subject to internal assessment." });
    render(<MilesCreditCardDetails cardId={card.id} />);
    expect(screen.getAllByText("Not available")).toHaveLength(2);
    expect(
      screen.getByText("Subject to internal assessment."),
    ).toBeInTheDocument();
  });
});

describe("MilesCreditCardsTable minimum income", () => {
  it("shows local income and preserves the internal card link", () => {
    mockResponse({ currency: "SGD", locals: 30000, foreigners: 45000 });
    const path = "/topics/miles-credit-cards/dbs-altitude";
    render(<MilesCreditCardsTable cardLinks={{ [card.id]: path }} />);
    expect(
      screen.getByText("Min. income (SG/PR): S$30,000/year"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/45,000/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: card.name })).toHaveAttribute(
      "href",
      path,
    );
    expect(
      screen.getByText(/Minimum income shown is for Singapore citizens\/PRs/),
    ).toBeInTheDocument();
  });

  it("omits the summary when only foreigner income is available", () => {
    mockResponse({ currency: "SGD", foreigners: 45000 });
    render(<MilesCreditCardsTable />);
    expect(
      screen.queryByText(/Min\. income \(SG\/PR\):/),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: card.name })).toHaveAttribute(
      "href",
      card.link,
    );
  });
});
