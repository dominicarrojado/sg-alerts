export enum Routes {
  Home = "/",
  Subscribe = "/subscribe/",
  Settings = "/settings/",
  About = "/about/",
  HowItWorks = "/how-it-works/",
  JapanVisa = "/topics/japan-visa-appointment-slots/",
  CdcPracticalLessonSlots = "/topics/cdc-practical-lesson-slots/",
  FixedDepositRates = "/topics/fixed-deposit-rates/",
  SingaporeAirlinesFlights = "/topics/singapore-airlines-flights/",
  JetstarFlights = "/topics/jetstar-flights/",
  CebuPacificFlights = "/topics/cebu-pacific-flights/",
  CoeBiddingResults = "/topics/coe-bidding-results/",
}

export enum FetchStatus {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  NotFound = "not-found",
  Failure = "failure",
}

export enum ApiEndpoint {
  SubscriptionRequests = "/subscription-requests",
  SubscriptionRequestVerify = "/subscription-requests/:id/verify",
  SubscriptionLinkEmail = "/subscriptions/link-email",
  SubscriptionTopics = "/subscriptions/:id/topics",
  JapanVisaLastSlotsInfo = "/japan-visa-checker/last-available-slots-info",
  CdcLessonLastSlotsInfo = "/cdc-lessons-checker/slots-last-available-dates",
  FixedDepositRatesInfo = "/deposit-rates-checker/deposit-rates-info",
  FlightsInfo = "/flight-checker/flights-info",
  CoeBiddingsInfo = "/coe-checker/biddings-info",
}

export enum SubscriptionTopic {
  JapanVisa = "japan-visa",
  CdcLessonsAutoCar = "cdc-lessons-auto-car",
  CdcEyesightTest = "cdc-eyesight-test",
  CdcCounterServices = "cdc-counter-services",
  SsdcEnrolmentWeekend = "ssdc-enrolment-weekend",
  SsdcSelfStudyWeekend = "ssdc-self-study-weekend",
  SsdcOtherPurposes = "ssdc-other-purposes",
  BbdcCounterServices = "bbdc-counter-services",
  DepositRates = "deposit-rates",
  EventsBloodDrive = "events-blood-drive",
  FlightsSingaporeAirlines = "flights-singapore-airlines",
  FlightsJetstar = "flights-jetstar",
  FlightsCebuPacific = "flights-cebu-pacific",
  MoviesGv = "movies-gv",
  MoviesShaw = "movies-shaw",
  MoviesCathayCineplexes = "movies-cathay-cineplexes",
  MoviesTheProjector = "movies-the-projector",
  RestaurantsBurntEnds = "restaurants-burnt-ends",
  TravelDealsTripCom = "travel-deals-trip.com",
  TravelDealsTraveloka = "travel-deals-traveloka",
  TravelDealsPhilippineAirlines = "travel-deals-philippine-airlines",
  CoeBiddings = "coe-biddings",
  FeaturesSgAlerts = "features-sg-alerts",
}

export enum ExternalUrl {
  JapanVisa = "https://www.sg.emb-japan.go.jp/itpr_en/visit.html",
  Cdc = "https://www.cdc.com.sg/",
  OneMotoring = "https://onemotoring.lta.gov.sg/content/onemotoring/home/buying/coe-open-bidding.html",
}

export enum GoogleAnalyticsEvent {
  SUBSCRIBE_FORM_SUBMIT = "subscribe_form_submit",
  UNSUBSCRIBE_FORM_SUBMIT = "unsubscribe_form_submit",
}

export enum FlightAirline {
  SINGAPORE_AIRLINES = "singapore-airlines",
  JETSTAR = "jetstar",
  CEBU_PACIFIC = "cebu-pacific",
}

export enum Currency {
  SGD = "SGD",
  PHP = "PHP",
}

export enum CdcLessonsService {
  AUTO_CAR = "auto-car",
}
