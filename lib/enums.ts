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
  ComfortDelGroDrivingCentre = "/categories/driving/comfortdelgro-driving-centre/",
  SingaporeSafetyDrivingCentre = "/categories/driving/singapore-safety-driving-centre/",
  BukitBatokDrivingCentre = "/categories/driving/bukit-batok-driving-centre/",
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
  CdcClass2PracticalLessonSlots = "/topics/cdc-class-2-practical-lesson-slots/",
  CdcClass2APracticalLessonSlots = "/topics/cdc-class-2a-practical-lesson-slots/",
  CdcClass2BPracticalLessonSlots = "/topics/cdc-class-2b-practical-lesson-slots/",
  CdcPracticalTestSlots = "/topics/cdc-practical-test-slots/",
  CdcSimulatorCourseSlots = "/topics/cdc-simulator-course-slots/",
  CdcAppointmentSlots = "/topics/cdc-appointment-slots/",
  FixedDepositRates = "/topics/fixed-deposit-rates/",
  SingaporeAirlinesFlights = "/topics/singapore-airlines-flights/",
  ScootFlights = "/topics/scoot-flights/",
  JetstarFlights = "/topics/jetstar-flights/",
  CebuPacificFlights = "/topics/cebu-pacific-flights/",
  CoeBiddingResults = "/topics/coe-bidding-results/",
  KtmTrainTickets = "/topics/ktm-train-tickets/",
  SsdcAppointmentSlots = "/topics/ssdc-appointment-slots/",
  SsdcPracticalTestSlots = "/topics/ssdc-practical-test-slots/",
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
  CdcLessonLastSlotsInfo = "/cdc-lessons-checker/slots-info",
  FixedDepositRatesInfo = "/deposit-rates-checker/deposit-rates-info",
  FlightsInfo = "/flight-checker/flights-info",
  CoeBiddingsInfo = "/coe-checker/biddings-info",
  TrainTimeSlotsInfo = "/train-tickets-checker/slots-info",
  SsdcSlotsInfo = "/ssdc-checker/slots-last-available-dates",
  SsdcTestSlotsInfo = "/ssdc-tests-checker/slots-last-available-dates",
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
  AUTO_CAR_TAMPINES = "auto-car-tampines",
  MANUAL_CAR = "manual-car",
  CLASS_2_L1 = "class-2-l1",
  CLASS_2_L2 = "class-2-l2",
  CLASS_2_L3 = "class-2-l3",
  CLASS_2A_L1 = "class-2a-l1",
  CLASS_2A_L2 = "class-2a-l2",
  CLASS_2A_L3 = "class-2a-l3",
  CLASS_2B_L1 = "class-2b-l1",
  CLASS_2B_L2 = "class-2b-l2",
  CLASS_2B_L3 = "class-2b-l3",
  CLASS_2B_L4 = "class-2b-l4",
  CLASS_2B_L5 = "class-2b-l5",
  CLASS_2B_L6 = "class-2b-l6",
  CLASS_2B_L7 = "class-2b-l7",
  CLASS_2B_L8 = "class-2b-l8",
}

export enum CdcTestsService {
  PRIVATE_TP_TEST = "private-tp-test",
  AUTO_CAR_TEST = "auto-car-test",
  MANUAL_CAR_TEST = "manual-car-test",
  CLASS_2B_TEST = "class-2b-test",
}

export enum CdcSimulatorService {
  SIMULATOR_BIKE = "simulator-bike",
  SIMULATOR_CAR = "simulator-car",
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

export enum SsdcTestsService {
  PRIVATE_MANUAL_CAR = "private-manual",
  AUTO_CAR = "auto-car",
  MANUAL_CAR = "manual-car",
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
  CdcPracticalLessonSlotsAutoTampines = "🚘 CDC Practical Lesson Slots (Class 3A Motorcar - Tampines)",
  CdcPracticalLessonSlotsManual = "🚘 CDC Practical Lesson Slots (Class 3 Motorcar)",
  CdcPracticalLessonSlotsClass2 = "🚘 CDC Practical Lesson Slots (Class 2 Motorcycle)",
  CdcPracticalLessonSlotsClass2A = "🚘 CDC Practical Lesson Slots (Class 2A Motorcycle)",
  CdcPracticalLessonSlotsClass2B = "🚘 CDC Practical Lesson Slots (Class 2B Motorcycle)",
  CdcPracticalTestSlotsPrivate = "🚘 CDC Practical Test Slots (Private Account)",
  CdcPracticalTestSlotsAuto = "🚘 CDC Practical Test Slots (Class 3A Motorcar)",
  CdcPracticalTestSlotsManual = "🚘 CDC Practical Test Slots (Class 3 Motorcar)",
  CdcPracticalTestSlotsClass2B = "🚘 CDC Practical Test Slots (Class 2B Motorcycle)",
  CdcSimulatorCourseSlotsBike = "🚘 CDC Simulator Course Slots (Bike)",
  CdcSimulatorCourseSlotsCar = "🚘 CDC Simulator Course Slots (Car)",
  SsdcPracticalLessonBooking = "🚘 SSDC Appointment Slots (Practical Lesson Booking)",
  SsdcPrivateLearners = "🚘 SSDC Appointment Slots (Private Learners)",
  SsdcEnrolmentWeekend = "🚘 SSDC Appointment Slots (School Enrolment)",
  SsdcOtherCoursesEnrolment = "🚘 SSDC Appointment Slots (Other Courses Enrolment)",
  SsdcForeignLicenceWeekend = "🚘 SSDC Appointment Slots (Foreign Licence Package)",
  SsdcPracticalTestSlotsPrivate = "🚘 SSDC Practical Test Slots (Private Learners)",
  SsdcPracticalTestSlotsAuto = "🚘 SSDC Practical Test Slots (Class 3A Motorcar)",
  SsdcPracticalTestSlotsManual = "🚘 SSDC Practical Test Slots (Class 3 Motorcar)",
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
  CdcLessonsAutoCarTampines = "SGAlertsCDCLessonsC3ATampines",
  CdcLessonsManualCar = "SGAlertsCDCLessonsManualCar",
  CdcLessonsClass2 = "SGAlertsCDCLessonsClass2",
  CdcLessonsClass2A = "SGAlertsCDCLessonsClass2A",
  CdcLessonsClass2B = "SGAlertsCDCLessonsClass2B",
  CdcTestsPrivate = "SGAlertsCDCTestsPrivate",
  CdcTestsAutoCar = "SGAlertsCDCTestsAutoCar",
  CdcTestsManualCar = "SGAlertsCDCTestsManualCar",
  CdcTestsClass2B = "SGAlertsCDCTestsClass2B",
  CdcSimulatorBike = "SGAlertsCDCSimulatorBike",
  CdcSimulatorCar = "SGAlertsCDCSimulatorCar",
  CdcEyesightTest = "SGAlertsCDCEyesightTest",
  CdcCounterServices = "SGAlertsCDCCounterServices",
  CdcAnnouncements = "SGAlertsCDCAnnouncements",
  SsdcPracticalLessonBooking = "SGAlertsSSDCPracticalLessons",
  SsdcPrivateLearners = "SGAlertsSSDCPrivateLearners",
  SsdcTestsPrivate = "SGAlertsSSDCTestsPrivate",
  SsdcTestsAutoCar = "SGAlertsSSDCTestsAutoCar",
  SsdcTestsManualCar = "SGAlertsSSDCTestsManualCar",
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
