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

function mockResponse(
  minimumAnnualIncome?: MinimumAnnualIncome,
  status = FetchStatus.Success,
  items: Array<MilesCreditCard> = [{ ...card, minimumAnnualIncome }],
) {
  mockUseGetMilesCreditCardsInfo.mockReturnValue([
    status,
    { items, updatedAt: "14 Nov 2026" },
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
    expect(screen.getByText("Singapore Citizens / PRs")).toBeInTheDocument();
    expect(screen.getByText("Foreigners")).toBeInTheDocument();
    expect(screen.getByText("S$30,000 / year")).toBeInTheDocument();
    expect(screen.getByText("S$45,000 / year")).toBeInTheDocument();
    expect(
      screen.getByText("Additional eligibility conditions apply."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Income requirements are subject to bank eligibility criteria and approval.",
      ),
    ).toBeInTheDocument();
    expect(getInfo).toHaveBeenCalledTimes(1);
  });

  it.each([
    { currency: "SGD", locals: 30000 },
    { currency: "SGD", foreigners: 30000 },
  ] satisfies Array<MinimumAnnualIncome>)(
    "keeps a missing applicant amount unavailable: %j",
    (income) => {
      mockResponse(income);
      render(<MilesCreditCardDetails cardId={card.id} />);
      expect(screen.getByText("S$30,000 / year")).toBeInTheDocument();
      expect(screen.getAllByText("Not available")).toHaveLength(1);
    },
  );

  it.each([
    undefined,
    { currency: "SGD" },
    { currency: "SGD", notes: "Subject to internal assessment." },
  ] satisfies Array<MinimumAnnualIncome | undefined>)(
    "does not infer absent amounts: %j",
    (income) => {
      mockResponse(income);
      render(<MilesCreditCardDetails cardId={card.id} />);
      expect(screen.getAllByText("Not available")).toHaveLength(2);
      expect(screen.queryByText(/S\$0 \/ year/)).not.toBeInTheDocument();
      if (income?.notes) {
        expect(screen.getByText(income.notes)).toBeInTheDocument();
      }
    },
  );

  it("preserves the missing-card message and disclaimer", () => {
    mockResponse(undefined, FetchStatus.Success, []);
    render(<MilesCreditCardDetails cardId={card.id} />);
    expect(
      screen.getByText(/Card details are currently not available/),
    ).toBeInTheDocument();
    expect(screen.getByRole("note")).toBeInTheDocument();
  });

  it.each([FetchStatus.Loading, FetchStatus.Failure])(
    "does not display income before a successful response: %s",
    (status) => {
      mockResponse({ currency: "SGD", locals: 30000 }, status);
      render(<MilesCreditCardDetails cardId={card.id} />);
      expect(screen.queryByText("S$30,000 / year")).not.toBeInTheDocument();
      expect(screen.getByRole("note")).toBeInTheDocument();
    },
  );
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

  it.each([
    undefined,
    { currency: "SGD" },
    { currency: "SGD", foreigners: 45000 },
    { currency: "SGD", notes: "Subject to internal assessment." },
  ] satisfies Array<MinimumAnnualIncome | undefined>)(
    "omits unavailable local income and preserves the external link: %j",
    (income) => {
      mockResponse(income);
      render(<MilesCreditCardsTable />);
      expect(
        screen.queryByText(/Min\. income \(SG\/PR\):/),
      ).not.toBeInTheDocument();
      expect(screen.getByRole("link", { name: card.name })).toHaveAttribute(
        "href",
        card.link,
      );
    },
  );

  it("preserves the empty result message", () => {
    mockResponse(undefined, FetchStatus.Success, []);
    render(<MilesCreditCardsTable />);
    expect(
      screen.getByText(/No miles credit cards currently available/),
    ).toBeInTheDocument();
  });

  it.each([FetchStatus.Loading, FetchStatus.Failure])(
    "does not show income before a successful response: %s",
    (status) => {
      mockResponse({ currency: "SGD", locals: 30000 }, status);
      render(<MilesCreditCardsTable />);
      expect(
        screen.queryByText(/Min\. income \(SG\/PR\):/),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: card.name }),
      ).not.toBeInTheDocument();
    },
  );
});
