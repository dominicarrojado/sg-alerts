import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { DISCLAIMER_EMAIL } from "@/lib/constants";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "../shared-metadata";

const title = "Disclaimer";
const description =
  "Important information about data accuracy, financial terms and our notification service.";
const url = Routes.Disclaimer;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    ...META_OPEN_GRAPH,
    title,
    description,
    url,
  },
  twitter: {
    ...META_TWITTER,
    title,
    description,
  },
};

export default function Disclaimer() {
  return (
    <Container>
      <div className="space-y-2">
        <Heading>{title}</Heading>
        <Subheading>{description}</Subheading>
      </div>

      <div className="space-y-6 pt-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            1. Best-Effort Information
          </h2>
          <Paragraph>
            <span className="font-medium">SG Alerts</span> is an independent,
            automated tracking tool. All data (including fixed deposit rates,
            credit card promotions, flight prices and appointment slots) is
            collected from public sources on a best-effort basis. Rates, terms
            and promotions change frequently and may be inaccurate, outdated or
            delayed.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            2. Not Financial Advice
          </h2>
          <Paragraph>
            <span className="font-medium">SG Alerts</span> is not a bank, credit
            card issuer, lender or financial adviser. Nothing on this website
            constitutes financial, investment, credit, legal or tax advice. We
            do not hold, manage or accept funds. Any financial decision you make
            is solely at your own discretion and risk.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            3. Verify Before You Act
          </h2>
          <Paragraph>
            Always check the official website of the respective bank, card
            issuer or service provider before depositing money, applying for a
            product or booking a slot. Promotional eligibility, bonus miles,
            interest rates and fees are determined solely by the provider.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            4. No Affiliation &amp; Limitation of Liability
          </h2>
          <Paragraph>
            <span className="font-medium">SG Alerts</span> is not affiliated
            with or endorsed by any bank, airline or organization featured on
            this site. Product names and trademarks belong to their respective
            owners.
          </Paragraph>
          <Paragraph>
            All content is provided strictly on an &ldquo;AS IS&rdquo; basis
            without warranty of any kind. To the fullest extent permitted by
            Singapore law, SG Alerts and its creator accept no liability for any
            loss, damage or financial decision resulting from the use of this
            website.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">5. Contact</h2>
          <Paragraph>
            If you have questions, corrections or feedback, please reach out via{" "}
            <Anchor href={`mailto:${DISCLAIMER_EMAIL}`}>email</Anchor>.
          </Paragraph>
        </div>
      </div>
    </Container>
  );
}
