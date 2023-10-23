export enum Routes {
  Home = "/",
  Subscribe = "/subscribe/",
  Settings = "/settings/",
  About = "/about/",
  JapanVisa = "/topics/japan-visa-appointment-slots-tourism/",
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
}

export enum SubscriptionTopic {
  NewPost = "new-post",
  NewVideo = "new-video",
  JapanVisa = "japan-visa",
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
  MoviesYts = "movies-yts",
  MoviesGv = "movies-gv",
  MoviesShaw = "movies-shaw",
  MoviesCathayCineplexes = "movies-cathay-cineplexes",
  MoviesTheProjector = "movies-the-projector",
  RestaurantsBurntEnds = "restaurants-burnt-ends",
  TravelDealsTripCom = "travel-deals-trip.com",
  TravelDealsTraveloka = "travel-deals-traveloka",
  TravelDealsPhilippineAirlines = "travel-deals-philippine-airlines",
  FeaturesSgAlerts = "features-sg-alerts",
}

export enum ExternalUrl {
  JapanVisa = "https://www.sg.emb-japan.go.jp/itpr_en/visit.html",
}
