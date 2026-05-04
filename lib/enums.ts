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
  FixedDepositRatesDbs = "/topics/fixed-deposit-rates/dbs/",
  FixedDepositRatesMaybank = "/topics/fixed-deposit-rates/maybank/",
  FixedDepositRatesRhb = "/topics/fixed-deposit-rates/rhb/",
  FixedDepositRatesBankOfChina = "/topics/fixed-deposit-rates/bank-of-china/",
  FixedDepositRatesIcbc = "/topics/fixed-deposit-rates/icbc/",
  FixedDepositRatesCimb = "/topics/fixed-deposit-rates/cimb/",
  FixedDepositRatesSif = "/topics/fixed-deposit-rates/sing-investments-and-finance/",
  FixedDepositRatesHongLeongFinance = "/topics/fixed-deposit-rates/hong-leong-finance/",
  FixedDepositRatesUob = "/topics/fixed-deposit-rates/uob/",
  FixedDepositRatesStandardChartered = "/topics/fixed-deposit-rates/standard-chartered/",
  FixedDepositRatesOcbc = "/topics/fixed-deposit-rates/ocbc/",
  FixedDepositRatesHsbc = "/topics/fixed-deposit-rates/hsbc/",
  FixedDepositRatesCitibank = "/topics/fixed-deposit-rates/citibank/",
  SingaporeAirlinesFlights = "/topics/singapore-airlines-flights/",
  SingaporeAirlinesFlightsKualaLumpur = "/topics/singapore-airlines-flights/kuala-lumpur/",
  SingaporeAirlinesFlightsPenang = "/topics/singapore-airlines-flights/penang/",
  SingaporeAirlinesFlightsPhuket = "/topics/singapore-airlines-flights/phuket/",
  SingaporeAirlinesFlightsJakarta = "/topics/singapore-airlines-flights/jakarta/",
  SingaporeAirlinesFlightsMedan = "/topics/singapore-airlines-flights/medan/",
  SingaporeAirlinesFlightsHoChiMinhCity = "/topics/singapore-airlines-flights/ho-chi-minh-city/",
  SingaporeAirlinesFlightsDenpasarBali = "/topics/singapore-airlines-flights/denpasar-bali/",
  SingaporeAirlinesFlightsSurabaya = "/topics/singapore-airlines-flights/surabaya/",
  SingaporeAirlinesFlightsHongKong = "/topics/singapore-airlines-flights/hong-kong/",
  SingaporeAirlinesFlightsPhnom = "/topics/singapore-airlines-flights/phnom-penh/",
  SingaporeAirlinesFlightsMumbai = "/topics/singapore-airlines-flights/mumbai/",
  SingaporeAirlinesFlightsDaNang = "/topics/singapore-airlines-flights/da-nang/",
  SingaporeAirlinesFlightsManila = "/topics/singapore-airlines-flights/manila/",
  SingaporeAirlinesFlightsHanoi = "/topics/singapore-airlines-flights/hanoi/",
  SingaporeAirlinesFlightsChennai = "/topics/singapore-airlines-flights/chennai/",
  SingaporeAirlinesFlightsYangon = "/topics/singapore-airlines-flights/yangon/",
  SingaporeAirlinesFlightsCebu = "/topics/singapore-airlines-flights/cebu/",
  SingaporeAirlinesFlightsBangkok = "/topics/singapore-airlines-flights/bangkok/",
  SingaporeAirlinesFlightsSiemReap = "/topics/singapore-airlines-flights/siem-reap/",
  SingaporeAirlinesFlightsKolkata = "/topics/singapore-airlines-flights/kolkata/",
  SingaporeAirlinesFlightsShenzhen = "/topics/singapore-airlines-flights/shenzhen/",
  SingaporeAirlinesFlightsBengaluru = "/topics/singapore-airlines-flights/bengaluru/",
  SingaporeAirlinesFlightsGuangzhou = "/topics/singapore-airlines-flights/guangzhou/",
  SingaporeAirlinesFlightsAhmedabad = "/topics/singapore-airlines-flights/ahmedabad/",
  SingaporeAirlinesFlightsTaipei = "/topics/singapore-airlines-flights/taipei/",
  SingaporeAirlinesFlightsXiamen = "/topics/singapore-airlines-flights/xiamen/",
  SingaporeAirlinesFlightsBandarSeriB = "/topics/singapore-airlines-flights/bandar-seri-begawan/",
  SingaporeAirlinesFlightsBeijing = "/topics/singapore-airlines-flights/beijing/",
  SingaporeAirlinesFlightsChongqing = "/topics/singapore-airlines-flights/chongqing/",
  SingaporeAirlinesFlightsHangzhou = "/topics/singapore-airlines-flights/hangzhou/",
  SingaporeAirlinesFlightsChengdu = "/topics/singapore-airlines-flights/chengdu/",
  SingaporeAirlinesFlightsHyderabad = "/topics/singapore-airlines-flights/hyderabad/",
  SingaporeAirlinesFlightsDarwin = "/topics/singapore-airlines-flights/darwin/",
  SingaporeAirlinesFlightsKochi = "/topics/singapore-airlines-flights/kochi/",
  SingaporeAirlinesFlightsDelhi = "/topics/singapore-airlines-flights/delhi/",
  SingaporeAirlinesFlightsShanghai = "/topics/singapore-airlines-flights/shanghai/",
  SingaporeAirlinesFlightsSeoul = "/topics/singapore-airlines-flights/seoul/",
  SingaporeAirlinesFlightsColombo = "/topics/singapore-airlines-flights/colombo/",
  SingaporeAirlinesFlightsDhaka = "/topics/singapore-airlines-flights/dhaka/",
  SingaporeAirlinesFlightsCairns = "/topics/singapore-airlines-flights/cairns/",
  SingaporeAirlinesFlightsPerth = "/topics/singapore-airlines-flights/perth/",
  SingaporeAirlinesFlightsBusan = "/topics/singapore-airlines-flights/busan/",
  SingaporeAirlinesFlightsKathmandu = "/topics/singapore-airlines-flights/kathmandu/",
  SingaporeAirlinesFlightsOsaka = "/topics/singapore-airlines-flights/osaka/",
  SingaporeAirlinesFlightsNagoya = "/topics/singapore-airlines-flights/nagoya/",
  SingaporeAirlinesFlightsMale = "/topics/singapore-airlines-flights/male/",
  SingaporeAirlinesFlightsSydney = "/topics/singapore-airlines-flights/sydney/",
  SingaporeAirlinesFlightsBrisbane = "/topics/singapore-airlines-flights/brisbane/",
  SingaporeAirlinesFlightsMelbourne = "/topics/singapore-airlines-flights/melbourne/",
  SingaporeAirlinesFlightsAdelaide = "/topics/singapore-airlines-flights/adelaide/",
  SingaporeAirlinesFlightsTokyo = "/topics/singapore-airlines-flights/tokyo/",
  SingaporeAirlinesFlightsFukuoka = "/topics/singapore-airlines-flights/fukuoka/",
  SingaporeAirlinesFlightsIstanbul = "/topics/singapore-airlines-flights/istanbul/",
  SingaporeAirlinesFlightsJohannesburg = "/topics/singapore-airlines-flights/johannesburg/",
  SingaporeAirlinesFlightsDubai = "/topics/singapore-airlines-flights/dubai/",
  SingaporeAirlinesFlightsSapporo = "/topics/singapore-airlines-flights/sapporo/",
  SingaporeAirlinesFlightsFrankfurt = "/topics/singapore-airlines-flights/frankfurt/",
  SingaporeAirlinesFlightsBrussels = "/topics/singapore-airlines-flights/brussels/",
  SingaporeAirlinesFlightsBarcelona = "/topics/singapore-airlines-flights/barcelona/",
  SingaporeAirlinesFlightsSanFrancisco = "/topics/singapore-airlines-flights/san-francisco/",
  SingaporeAirlinesFlightsLosAngeles = "/topics/singapore-airlines-flights/los-angeles/",
  SingaporeAirlinesFlightsMilan = "/topics/singapore-airlines-flights/milan/",
  SingaporeAirlinesFlightsLondon = "/topics/singapore-airlines-flights/london/",
  SingaporeAirlinesFlightsParis = "/topics/singapore-airlines-flights/paris/",
  SingaporeAirlinesFlightsMunich = "/topics/singapore-airlines-flights/munich/",
  SingaporeAirlinesFlightsZurich = "/topics/singapore-airlines-flights/zurich/",
  SingaporeAirlinesFlightsManchester = "/topics/singapore-airlines-flights/manchester/",
  SingaporeAirlinesFlightsSeattle = "/topics/singapore-airlines-flights/seattle/",
  SingaporeAirlinesFlightsRome = "/topics/singapore-airlines-flights/rome/",
  SingaporeAirlinesFlightsAuckland = "/topics/singapore-airlines-flights/auckland/",
  SingaporeAirlinesFlightsCopenhagen = "/topics/singapore-airlines-flights/copenhagen/",
  SingaporeAirlinesFlightsAmsterdam = "/topics/singapore-airlines-flights/amsterdam/",
  SingaporeAirlinesFlightsChristchurch = "/topics/singapore-airlines-flights/christchurch/",
  SingaporeAirlinesFlightsCapeTown = "/topics/singapore-airlines-flights/cape-town/",
  SingaporeAirlinesFlightsNewYork = "/topics/singapore-airlines-flights/new-york/",
  SingaporeAirlinesFlightsHouston = "/topics/singapore-airlines-flights/houston/",
  SingaporeAirlinesFlightsRiyadh = "/topics/singapore-airlines-flights/riyadh/",
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
  ShanghaiDisneylandAttractionUpdates = "/topics/shanghai-disneyland-attraction-updates/",
  TotoSnowballs = "/topics/toto-snowballs/",
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
  CdcSlotsInfo = "/cdc-checker/slots-info",
  CdcLessonLastSlotsInfo = "/cdc-lessons-checker/slots-info",
  DepositRatesInfo = "/deposit-rates-checker/deposit-rates-info",
  DepositRatesChartData = "/deposit-rates-snapshots/chart-data",
  FlightsInfo = "/flight-checker/flights-info",
  FlightSnapshotsChartData = "/flight-snapshots/chart-data",
  CoeBiddingsInfo = "/coe-checker/biddings-info",
  TrainTimeSlotsInfo = "/train-tickets-checker/slots-info",
  SsdcSlotsInfo = "/ssdc-checker/slots-last-available-dates",
  SsdcTestSlotsInfo = "/ssdc-tests-checker/slots-info",
  BbdcSlotsInfo = "/bbdc-checker/slots-last-available-dates",
  TravelDealsInfo = "/travel-deals-checker/travel-deals-info",
  ThemeParkInfo = "/theme-park-checker/theme-park-info",
  LotteryInfo = "/lottery-checker/last-snowball-info",
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
  ShanghaiDisneylandAttractions = "shanghai-disneyland-attractions",
}

export enum LotteryService {
  TOTO = "toto",
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
  ShanghaiDisneylandAttractions = "🦊 Shanghai Disneyland Attraction Updates",
  KtmTrainTickets = "🚆 KTM Train Tickets",
  SingaporeAirlinesFlights = "✈️ Flight Prices (Singapore Airlines)",
  ScootFlights = "✈️ Flight Prices (Scoot)",
  JetstarFlights = "✈️ Flight Prices (Jetstar)",
  TotoSnowballs = "💰 TOTO Snowballs",
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
  ShanghaiDisneylandAttractions = "SGAlertsShanghaiDisneyland",
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

export enum DepositRateBank {
  HSBC = "HSBC",
  UOB = "UOB",
  STANDARD_CHARTERED = "Standard Chartered",
  DBS = "DBS",
  OCBC = "OCBC",
  CITIBANK = "Citibank",
  MAYBANK = "Maybank",
  CIMB = "CIMB",
  RHB = "RHB",
  ICBC = "ICBC",
  HONG_LEONG_FINANCE = "Hong Leong Finance",
  SIF = "Sing Investments & Finance",
  BANK_OF_CHINA = "Bank of China",
  SSB = "Singapore Savings Bonds*",
  T_BILLS = "Treasury Bills (T-Bills)*",
  GXS = "GXS (Boost Pocket)*",
  MARIBANK = "MariBank*",
  SYFE = "Syfe (Cash+ Guaranteed)*",
}
