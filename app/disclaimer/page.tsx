import { Metadata } from "next";
import React from "react";
import { Container } from "@/components/ui/container";
import { Anchor } from "@/components/ui/anchor";
import Heading from "@/components/ui/heading";
import Subheading from "@/components/ui/subheading";
import Paragraph from "@/components/ui/paragraph";
import { OWNER_EMAIL } from "@/lib/constants";
import { Routes } from "@/lib/enums";
import { META_OPEN_GRAPH, META_TWITTER } from "../shared-metadata";

const title = "Disclaimer";
const description =
  "Read the SG Alerts legal disclaimer, data accuracy policy, and terms of use.";
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
            1. General Overview
          </h2>
          <Paragraph>
            <span className="font-medium">SG Alerts</span> is a free,
            independent notification and tracking tool designed to help
            Singapore residents stay updated on publicly available information,
            including fixed deposit rates, credit card promotions, flight
            prices, and appointment slots. It is a personal project intended
            strictly for informational and reference purposes.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            2. Automated Web Scraping &amp; Best-Effort Data Accuracy
          </h2>
          <Paragraph>
            Information displayed on this website is aggregated via automated
            web scraping from publicly accessible third-party websites on a
            best-effort basis. While reasonable efforts are made to ensure data
            is up to date, scraping mechanisms are subject to external website
            structure changes, network delays, cache latency, and bank or issuer
            modifications.
          </Paragraph>
          <Paragraph>
            We do not warrant, represent, or guarantee that any information
            presented—including but not limited to interest rates, tenures,
            bonus miles, earn rates (mpd), annual fees, promotional eligibility,
            or seat availability—is accurate, complete, current, or free from
            errors or omissions at any given time.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            3. No Financial, Investment, or Legal Advice
          </h2>
          <Paragraph>
            <span className="font-medium">SG Alerts</span> is not a bank, credit
            broker, financial institution, or licensed financial adviser under
            the Financial Advisers Act (Cap. 110) or any regulatory framework
            administered by the Monetary Authority of Singapore (MAS).
          </Paragraph>
          <Paragraph>
            None of the content, tables, charts, calculations, or notifications
            provided on this site constitute financial, investment, credit, tax,
            or legal advice. Information is not tailored to your specific
            financial circumstances, investment objectives, or personal needs.
            Any decision to deposit funds, apply for credit facilities, or enter
            into financial agreements is made solely at your own risk and
            discretion.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            4. User Duty of Independent Verification
          </h2>
          <Paragraph>
            Promotional terms, interest rates, sign-up bonus caps, qualifying
            spend requirements, and fee waiver policies change frequently and
            without prior notice. You are strongly advised to independently
            verify all rates, terms, and conditions directly on the official
            websites of the respective banks, card issuers, airlines, or service
            providers before taking any action or committing financial
            resources.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            5. Non-Affiliation &amp; Intellectual Property
          </h2>
          <Paragraph>
            <span className="font-medium">SG Alerts</span> is independent and is
            not affiliated with, endorsed by, sponsored by, or an agent of any
            bank (including DBS, OCBC, UOB, Citibank, HSBC, Standard Chartered,
            Maybank, CIMB, RHB, Bank of China, ICBC, GXS, MariBank, or Syfe),
            airline, driving centre, or government agency mentioned on this
            site.
          </Paragraph>
          <Paragraph>
            All product names, logos, bank trademarks, service marks, and
            registered trademarks are the property of their respective owners.
            Their reference on this site is purely for identification and
            comparative purposes.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            6. Limitation of Liability &amp; Warranty Disclaimer
          </h2>
          <Paragraph>
            The website and its contents are provided strictly on an &ldquo;AS
            IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of
            any kind, whether express, implied, or statutory.
          </Paragraph>
          <Paragraph>
            To the fullest extent permitted by applicable Singapore law, SG
            Alerts and its creator shall not be liable for any direct, indirect,
            incidental, consequential, special, or exemplary damages, or any
            financial loss, lost profits, or lost opportunity arising out of or
            in connection with your access to, reliance on, or inability to use
            this website, its data, or its notification services.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            7. Third-Party External Links
          </h2>
          <Paragraph>
            This website contains outbound links to third-party bank, airline,
            and booking websites. These links are provided solely for your
            convenience. SG Alerts exercises no editorial control over
            third-party sites and accepts no responsibility for their content,
            accuracy, privacy practices, or terms of service.
          </Paragraph>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">8. Contact</h2>
          <Paragraph>
            If you have questions, corrections, or feedback regarding the
            information on this website, please reach out via{" "}
            <Anchor href={`mailto:${OWNER_EMAIL}`}>email</Anchor>.
          </Paragraph>
        </div>
      </div>
    </Container>
  );
}
