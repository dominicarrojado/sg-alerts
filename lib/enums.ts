export enum Environment {
  Production = "production",
}

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
  ThemeParksCategory = "/categories/theme-parks/",
  Topics = "/topics/",
  JapanVisa = "/topics/japan-visa-appointment-slots/",
  CdcPracticalLessonSlots = "/topics/cdc-practical-lesson-slots/",
  CdcPracticalTestSlots = "/topics/cdc-practical-test-slots/",
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
  TokyoDisneylandAttractionUpdates = "/topics/tokyo-disneyland-attraction-updates/",
  TokyoDisneySeaAttractionUpdates = "/topics/tokyo-disneysea-attraction-updates/",
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
  SubscribersCount = "/subscriptions/subscribers-count",
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
  TravelDealsInfo = "/travel-deals-checker/travel-deals-info",
  ThemeParkInfo = "/theme-park-checker/theme-park-info",
}

export enum SubscriptionTopic {
  JapanVisaBusiness = "japan-visa-business",
  SsdcOtherCoursesEnrolment = "ssdc-other-courses-enrolment",
  SsdcForeignLicenceWeekend = "ssdc-foreign-licence-weekend",
  SsdcEnrolmentWeekend = "ssdc-enrolment-weekend",
  EventsBloodDrive = "events-blood-drive",
  MoviesGv = "movies-gv",
  MoviesShaw = "movies-shaw",
  MoviesCathayCineplexes = "movies-cathay-cineplexes",
  MoviesTheProjector = "movies-the-projector",
  RestaurantsBurntEnds = "restaurants-burnt-ends",
  TravelDealsPhilippineAirlines = "travel-deals-philippine-airlines",
  CoeBiddings = "coe-biddings",
  FeaturesSgAlerts = "features-sg-alerts",
}

export enum GoogleAnalyticsEvent {
  SUBSCRIBE_FORM_SUBMIT = "subscribe_form_submit",
  UNSUBSCRIBE_FORM_SUBMIT = "unsubscribe_form_submit",
  TOPIC_CLICK = "topic_click",
  TOPIC_PAGE_CLICK = "topic_page_click",
  TOAST_OPEN = "toast_open",
  TOAST_CLOSE = "toast_close",
  TOAST_CLICK = "toast_click",
  SCROLL_CLICK = "scroll_click",
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
  MANUAL_CAR = "manual-car",
}

export enum CdcTestsService {
  PRIVATE_TP_TEST = "private-tp-test",
  AUTO_CAR_TEST = "auto-car-test",
  MANUAL_CAR_TEST = "manual-car-test",
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

export enum TravelDealsService {
  SCOOT = "scoot",
}

export enum ThemeParkService {
  TokyoDisneylandAttractions = "tokyo-disneyland-attractions",
  TokyoDisneySeaAttractions = "tokyo-disneysea-attractions",
}

export enum TopicTitle {
  BbdcAppointmentSlots = "🚘 BBDC Appointment Slots",
  CdcEyesightTest = "🚘 CDC Appointment Slots (Eyesight Test)",
  CdcCounterServices = "🚘 CDC Appointment Slots (Counter Services)",
  CdcPracticalLessonSlotsAuto = "🚘 CDC Practical Lesson Slots (Class 3A Motorcar)",
  CdcPracticalLessonSlotsManual = "🚘 CDC Practical Lesson Slots (Class 3 Motorcar)",
  CdcPracticalTestSlotsPrivate = "🚘 CDC Practical Test Slots (Private Account)",
  CdcPracticalTestSlotsAuto = "🚘 CDC Practical Test Slots (Class 3A Motorcar)",
  CdcPracticalTestSlotsManual = "🚘 CDC Practical Test Slots  (Class 3 Motorcar)",
  SsdcPracticalLessonBooking = "🚘 SSDC Appointment Slots (Practical Lesson Booking)",
  SsdcPrivateLearners = "🚘 SSDC Appointment Slots (Private Learners)",
  SsdcEnrolmentWeekend = "🚘 SSDC Appointment Slots (School Enrolment)",
  SsdcOtherCoursesEnrolment = "🚘 SSDC Appointment Slots (Other Courses Enrolment)",
  SsdcForeignLicenceWeekend = "🚘 SSDC Appointment Slots (Foreign Licence Package)",
  FixedDepositRates = "💰 Fixed Deposit Rates",
  JapanVisaTourism = "🇯🇵 Japan Visa Appointment Slots (Tourism)",
  JapanVisaOthers = "🇯🇵 Japan Visa Appointment Slots (Others)",
  JapanVisaBusiness = "🇯🇵 Japan Visa Appointment Slots (Business/COE/Spouse)",
  TokyoDisneylandAttractions = "🏰 Tokyo Disneyland Attraction Updates",
  TokyoDisneySeaAttractions = "⛰️ Tokyo DisneySea Attraction Updates",
  KtmTrainTickets = "🚆 KTM Train Tickets",
  SingaporeAirlinesFlights = "✈️ Flight Prices (Singapore Airlines)",
  ScootFlights = "✈️ Flight Prices (Scoot)",
  JetstarFlights = "✈️ Flight Prices (Jetstar)",
}

export enum TelegramChannel {
  SgAlerts = "SGAlertsOfficial",
  CdcLessonsAutoCar = "SGAlertsCDCLessonsAutoCar",
  CdcLessonsManualCar = "SGAlertsCDCLessonsManualCar",
  CdcTestsPrivate = "SGAlertsCDCTestsPrivate",
  CdcTestsAutoCar = "SGAlertsCDCTestsAutoCar",
  CdcTestsManualCar = "SGAlertsCDCTestsManualCar",
  CdcEyesightTest = "SGAlertsCDCEyesightTest",
  CdcCounterServices = "SGAlertsCDCCounterServices",
  CdcAnnouncements = "SGAlertsCDCAnnouncements",
  SsdcPracticalLessonBooking = "SGAlertsSSDCPracticalLessons",
  SsdcPrivateLearners = "SGAlertsSSDCPrivateLearners",
  SsdcAnnouncements = "SGAlertsSSDCAnnouncements",
  BbdcAppointmentSlots = "SGAlertsBBDCAppointmentSlots",
  BbdcAnnouncements = "SGAlertsBBDCAnnouncements",
  JapanVisaTourism = "SGAlertsJapanVisaTourism",
  JapanVisaOthers = "SGAlertsJapanVisaOthers",
  TokyoDisneylandAttractions = "SGAlertsTokyoDisneyland",
  TokyoDisneySeaAttractions = "SGAlertsTokyoDisneySea",
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

export enum GoogleAdSenseUnit {
  TOPIC_BODY = "9536070128",
}

export enum GoogleAdSenseUnitLayout {
  IN_ARTICLE = "in-article",
}

export enum GoogleAdSenseUnitFormat {
  FLUID = "fluid",
}
