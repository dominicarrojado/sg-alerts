import { Fragment } from "react";
import { Anchor } from "@/components/ui/anchor";
import { NotificationSettings, TelegramPublicChannels } from "./types";
import { Routes, SubscriptionTopic, TelegramChannel } from "./enums";
import { OWNER_EMAIL } from "./constants";
import Link from "next/link";

export const MAIN_MENU_ITEMS = [
  {
    title: "Home",
    href: Routes.Home,
  },
  {
    title: "About",
    href: Routes.About,
  },
  {
    title: "How It Works",
    href: Routes.HowItWorks,
  },
];

export const TOPICS_MENU_ITEMS = [
  {
    title: (
      <>
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>{" "}
        Practical Lesson Slots
      </>
    ),
    href: Routes.CdcPracticalLessonSlots,
  },
  {
    title: (
      <>
        <abbr title="ComfortDelGro Driving Centre" className="no-underline">
          CDC
        </abbr>{" "}
        Appointment Slots
      </>
    ),
    href: Routes.CdcAppointmentSlots,
  },
  {
    title: (
      <>
        <abbr title="Singapore Safety Driving Centre" className="no-underline">
          SSDC
        </abbr>{" "}
        Appointment Slots
      </>
    ),
    href: Routes.SsdcAppointmentSlots,
  },
  {
    title: (
      <>
        <abbr title="Bukit Batok Driving Centre" className="no-underline">
          BBDC
        </abbr>{" "}
        Appointment Slots
      </>
    ),
    href: Routes.BbdcAppointmentSlots,
  },
  {
    title: (
      <>
        <abbr title="Keretapi Tanah Melayu" className="no-underline">
          KTM
        </abbr>{" "}
        Train Tickets
      </>
    ),
    href: Routes.KtmTrainTickets,
  },
  {
    title: "Japan Visa Appointment Slots",
    href: Routes.JapanVisa,
  },
  {
    title: "Fixed Deposit Rates",
    href: Routes.FixedDepositRates,
  },
  {
    title: "Singapore Airlines Flights",
    href: Routes.SingaporeAirlinesFlights,
  },
  {
    title: "Jetstar Flights",
    href: Routes.JetstarFlights,
  },
  {
    title: (
      <>
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>{" "}
        Bidding Results
      </>
    ),
    href: Routes.CoeBiddingResults,
  },
  {
    title: "and more...",
    href: "",
  },
];

export const FIXED_DEPOSIT_BANKS = [
  {
    title: "Bank of China",
    url: "https://www.bankofchina.com/sg/bocinfo/bi3/bi31/",
  },
  {
    title: "CIMB",
    url: "https://www.cimb.com.sg/en/personal/banking-with-us/accounts/fixed-deposit/cimb-sgd-fixed-deposit-account.html",
  },
  {
    title: "Citibank",
    url: "https://www.citibank.com.sg/personal-banking/deposits/fixed-deposit-account/promotions/",
  },
  {
    title: "DBS",
    url: "https://www.dbs.com.sg/personal/rates-online/fixed-deposit-rate-singapore-dollar.page",
  },
  {
    title: "Hong Leong Finance",
    url: "https://www.hlf.com.sg/personal/promotions/fixed-deposits-promotion-singapore.php",
  },
  {
    title: "HSBC",
    url: "https://www.hsbc.com.sg/accounts/products/time-deposit/",
  },
  {
    title: "ICBC",
    url: "https://singapore.icbc.com.cn/en/column/1438059017468788838.html",
  },
  {
    title: "Maybank",
    url: "https://www.maybank2u.com.sg/en/promotions/deposits/sgd-time-deposit.page",
  },
  {
    title: "OCBC",
    url: "https://www.ocbc.com/personal-banking/deposits/fixed-deposit-account",
  },
  {
    title: "RHB",
    url: "https://rhbgroup.com.sg/rhb/personal/deposits/fixed-deposit-account",
  },
  {
    title: "Sing Investments & Finance",
    shortName: "SIF",
    url: "https://www.sif.com.sg/fixed-deposits/",
  },
  {
    title: "Singapore Savings Bonds*",
    shortName: "SSB*",
    url: "https://www.mas.gov.sg/bonds-and-bills/singapore-savings-bonds",
  },
  {
    title: "Standard Chartered",
    url: "https://www.sc.com/sg/save/time-deposits/singapore-dollar-time-deposit/",
  },
  {
    title: "Treasury Bills (T-Bills)*",
    shortName: "T-Bills*",
    url: "https://www.mas.gov.sg/bonds-and-bills/singapore-savings-bonds",
  },
  {
    title: "UOB",
    url: "https://www.mas.gov.sg/bonds-and-bills/singapore-government-t-bills-information-for-individuals",
  },
];

export const TELEGRAM_PUBLIC_CHANNELS: TelegramPublicChannels = [
  {
    id: TelegramChannel.CdcLessonsAutoCar,
    title: "🚘 CDC Practical Lesson Slots (Class 3A Motorcar)",
    description: (
      <>
        Receive notifications when there are new practical lessons slot(s) for{" "}
        <Link href={Routes.CdcPracticalLessonSlots} passHref legacyBehavior>
          <Anchor>Class 3A Motorcar</Anchor>
        </Link>{" "}
        at ComfortDelGro Driving Centre.
      </>
    ),
  },
  {
    id: TelegramChannel.CdcEyesightTest,
    title: "🚘 CDC Appointment Slots (Eyesight Test)",
    description: (
      <>
        Receive notifications when there are new appointment date(s) for the{" "}
        <Link href={Routes.CdcAppointmentSlots} passHref legacyBehavior>
          <Anchor>eyesight test</Anchor>
        </Link>{" "}
        at ComfortDelGro Driving Centre.
      </>
    ),
  },
  {
    id: TelegramChannel.CdcCounterServices,
    title: "🚘 CDC Appointment Slots (Counter Services)",
    description: (
      <>
        Receive notifications when there are new appointment date(s) for{" "}
        <Link href={Routes.CdcAppointmentSlots} passHref legacyBehavior>
          <Anchor>counter services</Anchor>
        </Link>{" "}
        at ComfortDelGro Driving Centre.
      </>
    ),
  },
  {
    id: TelegramChannel.SsdcPracticalLessonBooking,
    title: "🚘 SSDC Appointment Slots (Practical Lesson Booking)",
    description: (
      <>
        Receive notifications when there are new appointment date(s) for the{" "}
        <Link href={Routes.SsdcAppointmentSlots} passHref legacyBehavior>
          <Anchor>Class 3 / 3A Practical Lesson Booking</Anchor>
        </Link>{" "}
        at Singapore Safety Driving Centre.
      </>
    ),
  },
  {
    id: TelegramChannel.JapanVisaTourism,
    title: "🇯🇵 Japan Visa Appointment Slots (Tourism)",
    description: (
      <>
        Receive notifications when there are new visa appointment date(s) for{" "}
        <Link href={Routes.JapanVisa} passHref legacyBehavior>
          <Anchor>Tourism or Sightseeing</Anchor>
        </Link>{" "}
        at the Embassy of Japan in Singapore. <br />
        <small>(for foreigners who require a visa to visit Japan)</small>
      </>
    ),
  },
  {
    id: TelegramChannel.KtmTrainTickets,
    title: "🚆 KTM Train Tickets",
    description: (
      <>
        Receive notifications when there are{" "}
        <Link href={Routes.KtmTrainTickets} passHref legacyBehavior>
          <Anchor>
            <abbr title="Keretapi Tanah Melayu" className="no-underline">
              KTM
            </abbr>{" "}
            train ticket(s)
          </Anchor>
        </Link>{" "}
        available from Singapore (SG) to Johor Bahru (JB) and vice versa. <br />
        <small>
          (for SG -&gt; JB: Fridays 5:00 PM onwards, Saturdays before 3:00 PM
          only)
        </small>{" "}
        <br />
        <small>(for JB -&gt; SG: Sundays 11:30 AM onwards only)</small>
      </>
    ),
  },
];

export const NOTIFICATION_SETTINGS: NotificationSettings = [
  {
    id: SubscriptionTopic.SsdcEnrolmentWeekend,
    title: "🚘 SSDC Appointment Slots (School Enrolment)",
    description: (
      <>
        Receive email notifications when there are new appointment date(s) for
        the{" "}
        <Link href={Routes.SsdcAppointmentSlots} passHref legacyBehavior>
          <Anchor>Class 3 / 3A School Enrolment (weekend)</Anchor>
        </Link>{" "}
        at Singapore Safety Driving Centre.
      </>
    ),
  },
  {
    id: SubscriptionTopic.SsdcPrivateLearners,
    title: "🚘 SSDC Appointment Slots (Private Learners)",
    description: (
      <>
        Receive email notifications when there are new appointment date(s) for
        the{" "}
        <Link href={Routes.SsdcAppointmentSlots} passHref legacyBehavior>
          <Anchor>Private Learners</Anchor>
        </Link>{" "}
        at Singapore Safety Driving Centre.
      </>
    ),
  },
  {
    id: SubscriptionTopic.SsdcOtherCoursesEnrolment,
    title: "🚘 SSDC Appointment Slots (Other Courses Enrolment)",
    description: (
      <>
        Receive email notifications when there are new appointment date(s) for
        the{" "}
        <Link href={Routes.SsdcAppointmentSlots} passHref legacyBehavior>
          <Anchor>Other Courses Enrolment (weekend)</Anchor>
        </Link>{" "}
        at Singapore Safety Driving Centre.
      </>
    ),
  },
  {
    id: SubscriptionTopic.SsdcForeignLicenceWeekend,
    title: "🚘 SSDC Appointment Slots (Foreign Licence Package)",
    description: (
      <>
        Receive email notifications when there are new appointment date(s) for
        the{" "}
        <Link href={Routes.SsdcAppointmentSlots} passHref legacyBehavior>
          <Anchor>Foreign Licence Package (weekend)</Anchor>
        </Link>{" "}
        at Singapore Safety Driving Centre.
      </>
    ),
  },
  {
    id: SubscriptionTopic.BbdcCounterServices,
    title: "🚘 BBDC Appointment Slots",
    description: (
      <>
        Receive email notifications when there are new appointment date(s) for{" "}
        <Link href={Routes.BbdcAppointmentSlots} passHref legacyBehavior>
          <Anchor>account opening and counter services</Anchor>
        </Link>{" "}
        at Bukit Batok Driving Centre.
      </>
    ),
  },
  {
    id: SubscriptionTopic.TrainTicketsKtm,
    title: "🚆 KTM Train Tickets",
    description: (
      <>
        Receive email notifications when there are{" "}
        <Link href={Routes.KtmTrainTickets} passHref legacyBehavior>
          <Anchor>
            <abbr title="Keretapi Tanah Melayu" className="no-underline">
              KTM
            </abbr>{" "}
            train ticket(s)
          </Anchor>
        </Link>{" "}
        available from Singapore (SG) to Johor Bahru (JB) and vice versa. <br />
        <small>
          (for SG -&gt; JB: Fridays 5:00 PM onwards, Saturdays before 3:00 PM
          only)
        </small>{" "}
        <br />
        <small>(for JB -&gt; SG: Sundays 11:30 AM onwards only)</small>
      </>
    ),
    hasTelegramChannel: true,
  },
  {
    id: SubscriptionTopic.JapanVisaBusiness,
    title: "🇯🇵 Japan Visa Appointment Slots (Business/COE/Spouse)",
    description: (
      <>
        Receive email notifications when there are new visa appointment date(s)
        for{" "}
        <Link href={Routes.JapanVisa} passHref legacyBehavior>
          <Anchor>
            Short-term Business, Long-term stay with{" "}
            <abbr title="Certificate of Eligibility" className="no-underline">
              COE
            </abbr>
            , Spouse or Child of Japanese National
          </Anchor>
        </Link>{" "}
        at the Embassy of Japan in Singapore. <br />
        <small>(for foreigners who require a visa to visit Japan)</small>
      </>
    ),
  },
  {
    id: SubscriptionTopic.DepositRates,
    title: "💰 Fixed Deposit Rates",
    description: (
      <>
        Receive email notifications when the{" "}
        <Link href={Routes.FixedDepositRates} passHref legacyBehavior>
          <Anchor>fixed deposit rates</Anchor>
        </Link>{" "}
        goes up across major banks in Singapore. <br />
        <small>
          (
          {FIXED_DEPOSIT_BANKS.map(({ title, shortName, url }, index) => (
            <Fragment key={title}>
              {index !== 0 &&
                (index === FIXED_DEPOSIT_BANKS.length - 1 ? " and " : ", ")}
              {shortName || title}
            </Fragment>
          ))}
          )
        </small>
      </>
    ),
  },
  {
    id: SubscriptionTopic.FlightsSingaporeAirlines,
    title: "✈️ Flight Prices (Singapore Airlines)",
    description: (
      <>
        Receive email notifications when the flight prices goes down for{" "}
        <Link href={Routes.SingaporeAirlinesFlights} passHref legacyBehavior>
          <Anchor>Singapore Airlines flights</Anchor>
        </Link>{" "}
        departing from Singapore.
      </>
    ),
  },
  {
    id: SubscriptionTopic.FlightsJetstar,
    title: "✈️ Flight Prices (Jetstar)",
    description: (
      <>
        Receive email notifications when the flight prices goes down for{" "}
        <Link href={Routes.JetstarFlights} passHref legacyBehavior>
          <Anchor>Jetstar flights</Anchor>
        </Link>{" "}
        departing from Singapore.
      </>
    ),
  },
  {
    id: SubscriptionTopic.TravelDealsTripCom,
    title: "🌏 Travel Deals (Trip.com)",
    description: (
      <>
        Receive email notifications when there are new travel deals from{" "}
        <Anchor href="https://sg.trip.com/sale/deals" isExternal>
          Trip.com
        </Anchor>
        .
      </>
    ),
  },
  {
    id: SubscriptionTopic.TravelDealsTraveloka,
    title: "🌏 Travel Deals (Traveloka)",
    description: (
      <>
        Receive email notifications when there are new travel deals from{" "}
        <Anchor href="https://www.traveloka.com/en-sg/promotion" isExternal>
          Traveloka
        </Anchor>
        .
      </>
    ),
  },
  {
    id: SubscriptionTopic.CoeBiddings,
    title: "📄 Certificate of Entitlement (COE) Bidding Results",
    description: (
      <>
        Receive email notifications when the{" "}
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>{" "}
        premiums have decreased from the{" "}
        <Link href={Routes.CoeBiddingResults} passHref legacyBehavior>
          <Anchor>latest bidding results</Anchor>
        </Link>{" "}
        from OneMotoring by Land Transport Authority.
      </>
    ),
  },
  {
    id: SubscriptionTopic.EventsBloodDrive,
    title: "🏥 Community Blood Drives",
    description: (
      <>
        Receive email notifications when there are new{" "}
        <Anchor href="https://giveblood.sg/#blood-drive" isExternal>
          community blood drives
        </Anchor>{" "}
        organised by the Singapore Red Cross.
      </>
    ),
  },
  {
    id: SubscriptionTopic.RestaurantsBurntEnds,
    title: "🍽️ Table Reservation Slots (Burnt Ends)",
    description: (
      <>
        Receive email notifications when there are new table reservation date(s)
        at{" "}
        <Anchor href="https://burntends.com.sg/reservation/" isExternal>
          Burnt Ends
        </Anchor>
        . <br />
        <small>
          (for main dining area & chefs counter seating - dinner time only)
        </small>
      </>
    ),
  },
  {
    id: SubscriptionTopic.MoviesGv,
    title: "🎬 Movies with English Subtitles (GV)",
    description: (
      <>
        Receive email notifications when there are new movies with English
        subtitles at{" "}
        <Anchor href="https://www.gv.com.sg/" isExternal>
          Golden Village.
        </Anchor>{" "}
        <br />
        <small>(supported languages: English, Chinese, Korean, Japanese)</small>
      </>
    ),
  },
  {
    id: SubscriptionTopic.MoviesShaw,
    title: "🎬 Movies with English Subtitles (Shaw)",
    description: (
      <>
        Receive email notifications when there are new movies with English
        subtitles at{" "}
        <Anchor href="https://shaw.sg/" isExternal>
          Shaw Theatres
        </Anchor>
        . <br />
        <small>(supported languages: English, Chinese, Korean, Japanese)</small>
      </>
    ),
  },
  {
    id: SubscriptionTopic.MoviesCathayCineplexes,
    title: "🎬 Movies with English Subtitles (Cathay Cineplexes)",
    description: (
      <>
        Receive email notifications when there are new movies with English
        subtitles at{" "}
        <Anchor href="https://www.cathaycineplexes.com.sg/" isExternal>
          Cathay Cineplexes
        </Anchor>
        . <br />
        <small>(supported languages: English, Chinese, Korean, Japanese)</small>
      </>
    ),
  },
  {
    id: SubscriptionTopic.MoviesTheProjector,
    title: "🎬 Movies with English Subtitles (The Projector)",
    description: (
      <>
        Receive email notifications when there are new movies with English
        subtitles at{" "}
        <Anchor href="https://theprojector.sg/">The Projector</Anchor>. <br />
        <small>(supported languages: English, Chinese, Korean, Japanese)</small>
      </>
    ),
  },
  {
    id: SubscriptionTopic.FeaturesSgAlerts,
    title: "🚀 New Features & Alerts",
    description: (
      <>
        Receive email notifications when there are new feature(s) or alert(s) to
        subscribe to at SG Alerts. <br />
        <small>
          Have a suggestion or feedback? Drop me an{" "}
          <Anchor href={`mailto:${OWNER_EMAIL}`}>email</Anchor>.
        </small>
      </>
    ),
  },
];

export const TRAIN_SCHEDULE_ITEMS = [
  {
    day: "Friday",
    time: "5:00 PM onwards",
    to: "JB SENTRAL",
  },
  {
    day: "Saturday",
    time: "Before 3:00 PM",
    to: "JB SENTRAL",
  },
  {
    day: "Sunday",
    time: "11:30 AM onwards",
    to: "WOODLANDS CIQ",
  },
];
