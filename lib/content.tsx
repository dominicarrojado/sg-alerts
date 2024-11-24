import { Anchor } from "@/components/ui/anchor";
import {
  DonationTestimonials,
  NotificationSetting,
  NotificationSettings,
  TelegramPublicChannel,
  TelegramPublicChannels,
} from "./types";
import { Routes, SubscriptionTopic, TelegramChannel } from "./enums";
import { OWNER_EMAIL } from "./constants";

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
  {
    title: "Donate",
    href: Routes.Donate,
  },
];

export const CATEGORY_ITEMS = [
  {
    emoji: "🚘",
    title: "Driving",
    description: (
      <>
        Practical Lessons,{" "}
        <abbr title="Appointment" className="no-underline">
          Appt.
        </abbr>{" "}
        Slots,{" "}
        <abbr title="Certificate of Entitlement" className="no-underline">
          COE
        </abbr>
      </>
    ),
    href: Routes.DrivingCategory,
  },
  {
    emoji: "🇯🇵",
    title: "Japan Visa",
    description: "Tourism, Business, Long-term Stay",
    href: Routes.JapanVisaCategory,
  },
  {
    emoji: "✈️",
    title: "Travel",
    description: <>Train Tickets, Flights Prices, Promotions</>,
    href: Routes.TravelCategory,
  },
  {
    emoji: "💰",
    title: "Money",
    description: "Fixed Deposits, TOTO",
    href: Routes.MoneyCategory,
  },
  {
    emoji: "🍽️",
    title: "Dining",
    description: "Table Reservations",
    href: Routes.DiningCategory,
  },
  {
    emoji: "📅",
    title: "Events",
    description: "Blood Drives",
    href: Routes.EventsCategory,
  },
  {
    emoji: "🎬",
    title: "Entertainment",
    description: "Movies",
    href: Routes.EntertainmentCategory,
  },
  {
    emoji: "🎢",
    title: "Theme Parks",
    description: "Tokyo Disneyland, Tokyo DisneySea",
    href: Routes.ThemeParksCategory,
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
    title: "Scoot Flights",
    href: Routes.ScootFlights,
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
    title: "Tokyo Disneyland",
    href: Routes.TokyoDisneylandAttractionUpdates,
  },
  {
    title: "Tokyo DisneySea",
    href: Routes.TokyoDisneySeaAttractionUpdates,
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

export const NEW_FEATURES_TELEGRAM_CHANNEL: TelegramPublicChannel = {
  id: TelegramChannel.SgAlerts,
  title: "🚀 New Features & Alerts",
  description: (
    <>
      Receive notifications when there are new feature(s) or alert(s) to
      subscribe to at SG Alerts. <br />
      <small>
        Have a suggestion or feedback? Drop me an{" "}
        <Anchor href={`mailto:${OWNER_EMAIL}`}>email</Anchor>.
      </small>
    </>
  ),
};

export const CDC_TELEGRAM_CHANNELS: TelegramPublicChannels = [
  {
    id: TelegramChannel.CdcLessonsAutoCar,
    title: "🚘 CDC Practical Lesson Slots (Class 3A Motorcar)",
    description: (
      <>
        Receive notifications when there are new practical lessons slot(s) for{" "}
        <strong className="font-medium">Class 3A Motorcar</strong> at
        ComfortDelGro Driving Centre.
      </>
    ),
    topicRoute: Routes.CdcPracticalLessonSlots,
  },
  {
    id: TelegramChannel.CdcEyesightTest,
    title: "🚘 CDC Appointment Slots (Eyesight Test)",
    description: (
      <>
        Receive notifications when there are new appointment date(s) for the{" "}
        <strong className="font-medium">eyesight test</strong> at ComfortDelGro
        Driving Centre.
      </>
    ),
    topicRoute: Routes.CdcAppointmentSlots,
  },
  {
    id: TelegramChannel.CdcCounterServices,
    title: "🚘 CDC Appointment Slots (Counter Services)",
    description: (
      <>
        Receive notifications when there are new appointment date(s) for{" "}
        <strong className="font-medium">counter services</strong> at
        ComfortDelGro Driving Centre.
      </>
    ),
    topicRoute: Routes.CdcAppointmentSlots,
  },
  {
    id: TelegramChannel.CdcAnnouncements,
    title: "🚘 CDC Announcements",
    description: (
      <>
        Receive notifications when there are{" "}
        <Anchor href="https://www.cdc.com.sg/news/" isExternal>
          announcements
        </Anchor>{" "}
        from ComfortDelGro Driving Centre.
      </>
    ),
  },
];

export const SSDC_TELEGRAM_CHANNELS: TelegramPublicChannels = [
  {
    id: TelegramChannel.SsdcPracticalLessonBooking,
    title: "🚘 SSDC Appointment Slots (Practical Lesson Booking)",
    description: (
      <>
        Receive notifications when there are new appointment date(s) for the{" "}
        <strong className="font-medium">
          Class 3 / 3A Practical Lesson Booking
        </strong>{" "}
        at Singapore Safety Driving Centre.
      </>
    ),
    topicRoute: Routes.SsdcAppointmentSlots,
  },
  {
    id: TelegramChannel.SsdcPrivateLearners,
    title: "🚘 SSDC Appointment Slots (Private Learners)",
    description: (
      <>
        Receive notifications when there are new appointment date(s) for the{" "}
        <strong className="font-medium">Private Learners</strong> at Singapore
        Safety Driving Centre.
      </>
    ),
    topicRoute: Routes.SsdcAppointmentSlots,
  },
  {
    id: TelegramChannel.SsdcAnnouncements,
    title: "🚘 SSDC Announcements",
    description: (
      <>
        Receive notifications when there are{" "}
        <Anchor href="https://ssdcl.com.sg/category/announcements/" isExternal>
          announcements
        </Anchor>{" "}
        from Singapore Safety Driving Centre.
      </>
    ),
  },
];

export const BBDC_TELEGRAM_CHANNELS: TelegramPublicChannels = [
  {
    id: TelegramChannel.BbdcAppointmentSlots,
    title: "🚘 BBDC Appointment Slots",
    description: (
      <>
        Receive notifications when there are new appointment date(s) for{" "}
        <strong className="font-medium">
          account opening and counter services
        </strong>{" "}
        at Bukit Batok Driving Centre.
      </>
    ),
    topicRoute: Routes.BbdcAppointmentSlots,
  },
  {
    id: TelegramChannel.BbdcAnnouncements,
    title: "🚘 BBDC Announcements",
    description: (
      <>
        Receive notifications when there are{" "}
        <Anchor href="https://info.bbdc.sg/news-announcements-all/" isExternal>
          announcements
        </Anchor>{" "}
        from Bukit Batok Driving Centre.
      </>
    ),
  },
];

export const DRIVING_TELEGRAM_CHANNELS: TelegramPublicChannels = [
  ...CDC_TELEGRAM_CHANNELS,
  ...SSDC_TELEGRAM_CHANNELS,
  ...BBDC_TELEGRAM_CHANNELS,
  NEW_FEATURES_TELEGRAM_CHANNEL,
];

export const JAPAN_VISA_TELEGRAM_CHANNELS: TelegramPublicChannels = [
  {
    id: TelegramChannel.JapanVisaTourism,
    title: "🇯🇵 Japan Visa Appointment Slots (Tourism)",
    description: (
      <>
        Receive notifications when there are new visa appointment date(s) for{" "}
        <strong className="font-medium">Tourism or Sightseeing</strong> at the
        Embassy of Japan in Singapore. <br />
      </>
    ),
    topicRoute: Routes.JapanVisa,
  },
  {
    id: TelegramChannel.JapanVisaOthers,
    title: "🇯🇵 Japan Visa Appointment Slots (Others)",
    description: (
      <>
        Receive notifications when there are new visa appointment date(s) for{" "}
        <strong className="font-medium">
          all other visa applications and services
        </strong>{" "}
        at the Embassy of Japan in Singapore.
      </>
    ),
    topicRoute: Routes.JapanVisa,
  },
  NEW_FEATURES_TELEGRAM_CHANNEL,
];

export const TRAVEL_TELEGRAM_CHANNELS: TelegramPublicChannels = [
  {
    id: TelegramChannel.KtmTrainTickets,
    title: "🚆 KTM Train Tickets",
    description: (
      <>
        Receive notifications when there are{" "}
        <strong className="font-medium">
          <abbr title="Keretapi Tanah Melayu" className="no-underline">
            KTM
          </abbr>{" "}
          train ticket(s)
        </strong>{" "}
        available from Singapore (SG) to Johor Bahru (JB) and vice versa.
      </>
    ),
    topicRoute: Routes.KtmTrainTickets,
  },
  {
    id: TelegramChannel.SingaporeAirlinesFlights,
    title: "✈️ Flight Prices (Singapore Airlines)",
    description: (
      <>
        Receive notifications when the flight prices goes down for{" "}
        <strong className="font-medium">Singapore Airlines flights</strong>{" "}
        departing from Singapore.
      </>
    ),
    topicRoute: Routes.SingaporeAirlinesFlights,
  },
  {
    id: TelegramChannel.ScootFlights,
    title: "✈️ Flight Prices (Scoot)",
    description: (
      <>
        Receive notifications when the flight prices goes down for{" "}
        <strong className="font-medium">Scoot flights</strong> departing from
        Singapore.
      </>
    ),
    topicRoute: Routes.ScootFlights,
  },
  {
    id: TelegramChannel.JetstarFlights,
    title: "✈️ Flight Prices (Jetstar)",
    description: (
      <>
        Receive notifications when the flight prices goes down for{" "}
        <strong className="font-medium">Jetstar flights</strong> departing from
        Singapore.
      </>
    ),
    topicRoute: Routes.JetstarFlights,
  },
  {
    id: TelegramChannel.TripComTravelDeals,
    title: "🌏 Travel Deals (Trip.com)",
    description: (
      <>
        Receive notifications when there are new travel deals from{" "}
        <Anchor href="https://sg.trip.com/sale/deals" isExternal>
          Trip.com
        </Anchor>
        .
      </>
    ),
  },
  {
    id: TelegramChannel.TravelokaTravelDeals,
    title: "🌏 Travel Deals (Traveloka)",
    description: (
      <>
        Receive notifications when there are new travel deals from{" "}
        <Anchor href="https://www.traveloka.com/en-sg/promotion" isExternal>
          Traveloka
        </Anchor>
        .
      </>
    ),
  },
  NEW_FEATURES_TELEGRAM_CHANNEL,
];

export const MONEY_TELEGRAM_CHANNELS: TelegramPublicChannels = [
  {
    id: TelegramChannel.FixedDepositRates,
    title: "💰 Fixed Deposit Rates",
    description: (
      <>
        Receive notifications when the{" "}
        <strong className="font-medium">fixed deposit rates</strong> goes up
        across major banks in Singapore. <br />
        <small>
          (including{" "}
          <abbr title="Singapore Savings Bonds" className="no-underline">
            SSB
          </abbr>{" "}
          and{" "}
          <abbr title="Treasury Bills" className="no-underline">
            T-Bills
          </abbr>{" "}
          for comparison purposes)
        </small>
      </>
    ),
    topicRoute: Routes.FixedDepositRates,
  },
  {
    id: TelegramChannel.TotoSnowballs,
    title: "💰 TOTO Snowballs",
    description: (
      <>
        Receive notifications when the top prize for the next draw has
        snowballed from the{" "}
        <Anchor
          href="https://www.singaporepools.com.sg/en/product/Pages/toto_results.aspx"
          isExternal
        >
          latest TOTO results
        </Anchor>{" "}
        from Singapore Pools.
      </>
    ),
  },
  NEW_FEATURES_TELEGRAM_CHANNEL,
];

export const THEME_PARK_TELEGRAM_CHANNELS: TelegramPublicChannels = [
  {
    id: TelegramChannel.TokyoDisneylandAttractions,
    title: "🏰 Tokyo Disneyland Attraction Updates",
    description: (
      <>
        Receive notifications on Disney Premier Access, Standby Passes or 40th
        Anniversary Priority Passes availability during the day and when
        attractions resume operations.
      </>
    ),
    topicRoute: Routes.TokyoDisneylandAttractionUpdates,
  },
  {
    id: TelegramChannel.TokyoDisneySeaAttractions,
    title: "⛰️ Tokyo DisneySea Attraction Updates",
    description: (
      <>
        Receive notifications on Disney Premier Access, Standby Passes or 40th
        Anniversary Priority Passes availability during the day and when
        attractions resume operations.
      </>
    ),
    topicRoute: Routes.TokyoDisneySeaAttractionUpdates,
  },
  NEW_FEATURES_TELEGRAM_CHANNEL,
];

export const NEW_FEATURES_NOTIFICATION_SETTING: NotificationSetting = {
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
};

export const SSDC_NOTIFICATION_SETTINGS: NotificationSettings = [
  {
    id: SubscriptionTopic.SsdcEnrolmentWeekend,
    title: "🚘 SSDC Appointment Slots (School Enrolment)",
    description: (
      <>
        Receive email notifications when there are new appointment date(s) for
        the{" "}
        <strong className="font-medium">
          Class 3 / 3A School Enrolment (weekend)
        </strong>{" "}
        at Singapore Safety Driving Centre.
      </>
    ),
    topicRoute: Routes.SsdcAppointmentSlots,
  },
  {
    id: SubscriptionTopic.SsdcOtherCoursesEnrolment,
    title: "🚘 SSDC Appointment Slots (Other Courses Enrolment)",
    description: (
      <>
        Receive email notifications when there are new appointment date(s) for
        the{" "}
        <strong className="font-medium">
          Other Courses Enrolment (weekend)
        </strong>{" "}
        at Singapore Safety Driving Centre.
      </>
    ),
    topicRoute: Routes.SsdcAppointmentSlots,
  },
  {
    id: SubscriptionTopic.SsdcForeignLicenceWeekend,
    title: "🚘 SSDC Appointment Slots (Foreign Licence Package)",
    description: (
      <>
        Receive email notifications when there are new appointment date(s) for
        the{" "}
        <strong className="font-medium">
          Foreign Licence Package (weekend)
        </strong>{" "}
        at Singapore Safety Driving Centre.
      </>
    ),
    topicRoute: Routes.SsdcAppointmentSlots,
  },
];

export const DRIVING_NOTIFICATION_SETTINGS: NotificationSettings = [
  ...SSDC_NOTIFICATION_SETTINGS,
  {
    id: SubscriptionTopic.CoeBiddings,
    title: "📄 Certificate of Entitlement (COE) Bidding Results",
    description: (
      <>
        Receive email notifications when the premiums have decreased from the{" "}
        <strong className="font-medium">
          latest{" "}
          <abbr title="Certificate of Entitlement" className="no-underline">
            COE
          </abbr>{" "}
          bidding results
        </strong>{" "}
        from OneMotoring by Land Transport Authority.
      </>
    ),
    topicRoute: Routes.CoeBiddingResults,
  },
];

export const JAPAN_VISA_NOTIFICATION_SETTINGS: NotificationSettings = [
  {
    id: SubscriptionTopic.JapanVisaBusiness,
    title: "🇯🇵 Japan Visa Appointment Slots (Business/COE/Spouse)",
    description: (
      <>
        Receive email notifications when there are new visa appointment date(s)
        for{" "}
        <strong className="font-medium">
          Short-term Business, Long-term stay with{" "}
          <abbr title="Certificate of Eligibility" className="no-underline">
            COE
          </abbr>
          , Spouse or Child of Japanese National
        </strong>{" "}
        at the Embassy of Japan in Singapore.
      </>
    ),
    topicRoute: Routes.JapanVisa,
  },
];

export const DINING_NOTIFICATION_SETTINGS: NotificationSettings = [
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
];

export const EVENTS_NOTIFICATION_SETTINGS: NotificationSettings = [
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
];

export const ENTERTAINMENT_NOTIFICATION_SETTINGS: NotificationSettings = [
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
];

export const NOTIFICATION_SETTINGS: NotificationSettings = [
  ...SSDC_NOTIFICATION_SETTINGS,
  ...JAPAN_VISA_NOTIFICATION_SETTINGS,
  ...DRIVING_NOTIFICATION_SETTINGS,
  ...EVENTS_NOTIFICATION_SETTINGS,
  ...DINING_NOTIFICATION_SETTINGS,
  ...ENTERTAINMENT_NOTIFICATION_SETTINGS,
  NEW_FEATURES_NOTIFICATION_SETTING,
];

export const TRAIN_SCHEDULE_ITEMS = [
  {
    day: "Friday",
    time: "6:45 PM - 10:30 PM",
    to: "JB SENTRAL",
  },
  {
    day: "Saturday",
    time: "Before 3:00 PM",
    to: "JB SENTRAL",
  },
  {
    day: "Sunday",
    time: "12:45 PM onwards",
    to: "WOODLANDS CIQ",
  },
];

export const DONATION_TESTIMONIALS: DonationTestimonials = [
  {
    firstName: "August",
    lastName: "U",
    message: "Thank you so much 😭",
    date: "19 November 2024",
  },
  {
    firstName: "Cedric",
    lastName: "M",
    message: "Go get a beer!",
    date: "16 November 2024",
  },
  {
    firstName: "GG",
    lastName: "G",
    message: "Thanks!",
    date: "6 November 2024",
  },
  {
    firstName: "Celine",
    lastName: "X",
    message: "Thanks!",
    date: "30 October 2024",
  },
  {
    firstName: "KL",
    lastName: "L",
    message: "Thank you Dominic!!",
    date: "28 October 2024",
  },
  {
    firstName: "Kim",
    lastName: "I",
    message: "Thank you for your help!",
    date: "25 October 2024",
  },
  {
    firstName: "Chenyini",
    lastName: "H",
    message: "",
    date: "22 October 2024",
  },
  {
    firstName: "Yyq",
    lastName: "Y",
    message: "Tqvm for Japan visa alert!",
    date: "17 October 2024",
  },
  {
    firstName: "Xinxin",
    lastName: "Z",
    message: "",
    date: "4 October 2024",
  },
  {
    firstName: "Uliana",
    lastName: "S",
    message: "",
    date: "25 September 2024",
  },
  {
    firstName: "Aditya",
    lastName: "D",
    message: "Thanks for the Japanese visa alerts!",
    date: "22 September 2024",
  },
  {
    firstName: "Sai",
    lastName: "A",
    message: "Thank you",
    date: "19 September 2024",
  },
  {
    firstName: "Yihan",
    lastName: "T",
    message: "",
    date: "18 September 2024",
  },
  {
    firstName: "Aqmal",
    lastName: "Q",
    message: "",
    date: "7 September 2024",
  },
  {
    firstName: "Daphne",
    lastName: "N",
    message: "Thank you for the CDC Telegram group chat :)",
    date: "5 September 2024",
  },
  {
    firstName: "Des",
    lastName: "E",
    message: "Thank you for the CDC eye test appointment alerts!",
    date: "28 August 2024",
  },
  {
    firstName: "Kelly",
    lastName: "L",
    message: "Thanks for CDC alert!",
    date: "23 July 2024",
  },
  {
    firstName: "Siya",
    lastName: "I",
    message: "",
    date: "15 July 2024",
  },
  {
    firstName: "Shuanglong",
    lastName: "H",
    message: "",
    date: "21 June 2024",
  },
  {
    firstName: "Sarah",
    lastName: "W",
    message: "Thanks for creating these alerts!",
    date: "8 June 2024",
  },
  {
    firstName: "Zhiyuan",
    lastName: "L",
    message: "Thank you for saving my time!",
    date: "2 June 2024",
  },
  {
    firstName: "Tao",
    lastName: "A",
    message: "",
    date: "27 May 2024",
  },
  {
    firstName: "Lynette",
    lastName: "Y",
    message: "👍🏼",
    date: "27 May 2024",
  },
  {
    firstName: "Sampai",
    lastName: "A",
    message: "Thank you for your service!",
    date: "24 May 2024",
  },
  {
    firstName: "Sania",
    lastName: "A",
    message: "Thank you for this channel OMG!",
    date: "21 May 2024",
  },
  {
    firstName: "Irene",
    lastName: "L",
    message: "Thank you for your good work!",
    date: "20 May 2024",
  },
  {
    firstName: "Xinyi",
    lastName: "I",
    message: "",
    date: "8 May 2024",
  },
  {
    firstName: "Sania",
    lastName: "A",
    message: "Thank you 😭",
    date: "5 May 2024",
  },
  {
    firstName: "Fengyuan",
    lastName: "E",
    message: "Bro!",
    date: "22 April 2024",
  },
  {
    firstName: "Hsiao Shan",
    lastName: "P",
    message: "Thanks for your work! Life-saving!",
    date: "9 April 2024",
  },
  {
    firstName: "RJ",
    lastName: "J",
    message: "",
    date: "8 April 2024",
  },
  {
    firstName: "Junior",
    lastName: "U",
    message: "",
    date: "26 March 2024",
  },
  {
    firstName: "Putri",
    lastName: "W",
    message: "Thanks for the Japan visa alert. Cheers! 😊",
    date: "19 March 2024",
  },
  {
    firstName: "Yinghua",
    lastName: "Y",
    message:
      "You saved my life! I am really grateful. Thanks a million. I'll never forget your kindness.",
    date: "23 February 2024",
  },
  {
    firstName: "Evelyn",
    lastName: "N",
    message:
      "Thank you for the alerts. It has been incredibly convenient and helpful for me.",
    date: "24 January 2024",
  },
  {
    firstName: "Angeline Kate",
    lastName: "Q",
    message:
      "Thank you for making it easy to book an appointment for Japan Visa! Found it very useful.",
    date: "19 December 2023",
  },
  {
    firstName: "Anurag",
    lastName: "A",
    message: "Thank you for the amazing tool!",
    date: "20 November 2023",
  },
  {
    firstName: "Rangana",
    lastName: "C",
    message: "Coffee on me mate! Fan of your work always!!!",
    date: "27 October 2023",
  },
  {
    firstName: "Janella",
    lastName: "O",
    message: "Thank you for your Japan visa slot availability service!",
    date: "23 October 2023",
  },
  {
    firstName: "Jiaying",
    lastName: "O",
    message:
      "Because of you, our trip to Japan won't be cancelled anymore, thanks a lot.",
    date: "16 October 2023",
  },
  {
    firstName: "Kavita",
    lastName: "T",
    message:
      "It's not a lot but still thank you so much, the service is indeed helpful! :)",
    date: "9 June 2023",
  },
];
