export enum Routes {
  Home = "/",
  Subscribe = "/subscribe/",
  Settings = "/settings/",
  About = "/about/",
  HowItWorks = "/how-it-works/",
  Donate = "/donate/",
  DrivingCategory = "/categories/driving/",
  JapanVisaCategory = "/categories/japan-visa/",
  TravelCategory = "/categories/travel/",
  MoneyCategory = "/categories/money/",
  DiningCategory = "/categories/dining/",
  EventsCategory = "/categories/events/",
  EntertainmentCategory = "/categories/entertainment/",
  JapanVisa = "/topics/japan-visa-appointment-slots/",
  CdcPracticalLessonSlots = "/topics/cdc-practical-lesson-slots/",
  CdcAppointmentSlots = "/topics/cdc-appointment-slots/",
  FixedDepositRates = "/topics/fixed-deposit-rates/",
  SingaporeAirlinesFlights = "/topics/singapore-airlines-flights/",
  ScootFlights = "/topics/scoot-flights/",
  JetstarFlights = "/topics/jetstar-flights/",
  CebuPacificFlights = "/topics/cebu-pacific-flights/",
  CoeBiddingResults = "/topics/coe-bidding-results/",
  KtmTrainTickets = "/topics/ktm-train-tickets/",
  SsdcAppointmentSlots = "/topics/ssdc-appointment-slots/",
  BbdcAppointmentSlots = "/topics/bbdc-appointment-slots/",
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
  JapanVisaLastSlotsInfo = "/japan-visa-checker/slots-last-available-dates",
  CdcSlotsInfo = "/cdc-checker/slots-last-available-dates",
  CdcLessonLastSlotsInfo = "/cdc-lessons-checker/slots-last-available-dates",
  FixedDepositRatesInfo = "/deposit-rates-checker/deposit-rates-info",
  FlightsInfo = "/flight-checker/flights-info",
  CoeBiddingsInfo = "/coe-checker/biddings-info",
  TrainTimeSlotsInfo = "/train-tickets-checker/slots-info",
  SsdcSlotsInfo = "/ssdc-checker/slots-last-available-dates",
  BbdcSlotsInfo = "/bbdc-checker/slots-last-available-dates",
}

export enum SubscriptionTopic {
  JapanVisaTourism = "japan-visa",
  JapanVisaBusiness = "japan-visa-business",
  JapanVisaOthers = "japan-visa-others",
  CdcLessonsAutoCar = "cdc-lessons-auto-car",
  CdcEyesightTest = "cdc-eyesight-test",
  CdcCounterServices = "cdc-counter-services",
  SsdcOtherCoursesEnrolment = "ssdc-other-courses-enrolment",
  SsdcPrivateLearners = "ssdc-private-learners",
  SsdcPracticalLessonBooking = "ssdc-practical-lesson-booking",
  SsdcForeignLicenceWeekend = "ssdc-foreign-licence-weekend",
  SsdcEnrolmentWeekend = "ssdc-enrolment-weekend",
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
  TrainTicketsKtm = "train-tickets-ktm",
  FeaturesSgAlerts = "features-sg-alerts",
}

export enum GoogleAnalyticsEvent {
  SUBSCRIBE_FORM_SUBMIT = "subscribe_form_submit",
  UNSUBSCRIBE_FORM_SUBMIT = "unsubscribe_form_submit",
}

export enum FlightAirline {
  SINGAPORE_AIRLINES = "singapore-airlines",
  SCOOT = "scoot",
  JETSTAR = "jetstar",
  CEBU_PACIFIC = "cebu-pacific",
}

export enum Currency {
  SGD = "SGD",
  PHP = "PHP",
}

export enum CdcService {
  EYESIGHT_TEST = "eyesight-test",
  COUNTER_SERVICES = "counter-services",
}

export enum CdcLessonsService {
  AUTO_CAR = "auto-car",
}

export enum TrainService {
  KTMB = "ktmb",
}

export enum JapanVisaType {
  TOURISM = "tourism",
  BUSINESS = "business",
  OTHERS = "others",
}

export enum SsdcService {
  OTHER_COURSES_ENROLMENT = "other-courses-enrolment",
  PRIVATE_LEARNERS = "private-learners",
  PRACTICAL_LESSON_BOOKING = "practical-lesson-booking",
  FOREIGN_LICENCE_WEEKEND = "foreign-licence-weekend",
  ENROLMENT_WEEKEND = "enrolment-weekend",
}

export enum BbdcService {
  COUNTER_SERVICES = "counter-services",
}

export enum TelegramChannel {
  CdcLessonsAutoCar = "SGAlertsCDCLessonsAutoCar",
  CdcEyesightTest = "SGAlertsCDCEyesightTest",
  CdcCounterServices = "SGAlertsCDCCounterServices",
  CdcAnnouncements = "SGAlertsCDCAnnouncements",
  SsdcPracticalLessonBooking = "SGAlertsSSDCPracticalLessons",
  SsdcPrivateLearners = "SGAlertsSSDCPrivateLearners",
  SsdcAnnouncements = "SGAlertsSSDCAnnouncements",
  BbdcAppointmentSlots = "SGAlertsBBDCAppointmentSlots",
  BbdcAnnouncements = "SGAlertsBBDCAnnouncements",
  JapanVisaTourism = "SGAlertsJapanVisaTourism",
  KtmTrainTickets = "SGAlertsKTMTrainTickets",
  SingaporeAirlinesFlights = "SGAlertsSingaporeAirlinesFlights",
  ScootFlights = "SGAlertsScootFlights",
  JetstarFlights = "SGAlertsJetstarFlights",
  FixedDepositRates = "SGAlertsFixedDepositRates",
  TripComTravelDeals = "SGAlertsTripComTravelDeals",
  TravelokaTravelDeals = "SGAlertsTravelokaTravelDeals",
  TotoSnowballs = "SGAlertsTOTOSnowballs",
}

export enum TelegramChannelLink {
  CdcLessonsAutoCar = `https://t.me/${TelegramChannel.CdcLessonsAutoCar}`,
  CdcEyesightTest = `https://t.me/${TelegramChannel.CdcEyesightTest}`,
  CdcCounterServices = `https://t.me/${TelegramChannel.CdcCounterServices}`,
  SsdcPracticalLessonBooking = `https://t.me/${TelegramChannel.SsdcPracticalLessonBooking}`,
  JapanVisaTourism = `https://t.me/${TelegramChannel.JapanVisaTourism}`,
}
