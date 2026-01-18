import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { formatDate, formatDateTime } from "./date";
import {
  BbdcSlotsDatesMap,
  CdcLessonSlotsDatesInfo,
  CdcLessonSlotsDatesMap,
  CdcSimulatorSlotsDatesMap,
  CdcSlotsDatesInfo,
  CdcSlotsDatesMap,
  CdcTestSlotsDatesMap,
  CoeBiddingsInfo,
  DepositRatesInfo,
  Flights,
  FlightsInfo,
  JapanVisaSlotsDatesMap,
  LotteryJackpotInfo,
  SsdcSlotsDatesMap,
  SsdcTestSlotsDatesInfo,
  SsdcTestSlotsDatesMap,
  Subscription,
  SubscriptionTopics,
  ThemeParkInfo,
  TrainTimeSlotsInfo,
  TravelDealInfo,
} from "./types";
import {
  ApiEndpoint,
  BbdcService,
  CdcLessonsService,
  CdcService,
  CdcSimulatorService,
  CdcTestsService,
  FetchStatus,
  FlightAirline,
  JapanVisaType,
  LotteryService,
  SsdcService,
  SsdcTestsService,
  ThemeParkService,
  TrainService,
  TravelDealsService,
} from "./enums";
import { API_URL } from "./constants";

export function useGetSubscribersCount() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const getSubscribersCount = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(`${API_URL}${ApiEndpoint.SubscribersCount}`);
      const resData = res.data;

      if (typeof resData !== "number") {
        throw new Error("Invalid data");
      }

      setSubscribersCount(resData);
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, subscribersCount, getSubscribersCount] as const;
}

export function useSubmitSubscribeRequest() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const submitSubscribeRequest = async (
    email: string,
    topics: SubscriptionTopics,
  ) => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;

      await axios.post(`${API_URL}${ApiEndpoint.SubscriptionRequests}`, {
        topics,
        contact: email,
        contactMode: "email",
      });

      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, submitSubscribeRequest] as const;
}

export function useVerifySubscription() {
  const searchParams = useSearchParams();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const verifySubscription = async () => {
    try {
      const id = searchParams.get("id");

      if (!id) {
        return setFetchStatus(FetchStatus.NotFound);
      }

      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      let reqUrl = `${API_URL}${ApiEndpoint.SubscriptionRequestVerify}`;
      reqUrl = reqUrl.replace(":id", id);

      await axios.post(reqUrl);

      setFetchStatus(FetchStatus.Success);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setFetchStatus(FetchStatus.NotFound);
      } else {
        setFetchStatus(FetchStatus.Failure);
      }
    }
  };

  return [fetchStatus, verifySubscription] as const;
}

export function useSendSubscriptionLink() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const sendSubscriptionLink = async (email: string): Promise<boolean> => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;

      await axios.post(`${API_URL}${ApiEndpoint.SubscriptionLinkEmail}`, {
        email,
      });

      setFetchStatus(FetchStatus.Success);

      return true;
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
      return false;
    }
  };

  return [fetchStatus, sendSubscriptionLink] as const;
}

export function useGetSubscription() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const getSubscription = async (id: string) => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      let reqUrl = `${API_URL}${ApiEndpoint.SubscriptionTopics}`;
      reqUrl = reqUrl.replace(":id", id);

      const res = await axios.get(reqUrl);
      const resData = res.data;

      if (!resData || !resData?.user || !Array.isArray(resData?.topics)) {
        throw new Error("Invalid data");
      }

      setSubscription(resData);
      setFetchStatus(FetchStatus.Success);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setFetchStatus(FetchStatus.NotFound);
      } else {
        setFetchStatus(FetchStatus.Failure);
      }
    }
  };

  return [fetchStatus, subscription, getSubscription] as const;
}

export function useUpdateSubscription() {
  const searchParams = useSearchParams();
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const updateSubscription = async (
    topics: SubscriptionTopics,
  ): Promise<boolean> => {
    try {
      const id = searchParams.get("id") as string;

      if (!id) {
        setFetchStatus(FetchStatus.Failure);

        return false;
      }

      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      let reqUrl = `${API_URL}${ApiEndpoint.SubscriptionTopics}`;
      reqUrl = reqUrl.replace(":id", id);

      await axios.put(reqUrl, { topics });

      setFetchStatus(FetchStatus.Success);

      return true;
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
      return false;
    }
  };

  return [fetchStatus, updateSubscription] as const;
}

export function useGetJapanVisaSlotsDatesMap() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [japanVisaSlotsDatesMap, setJapanVisaSlotsDatesMap] =
    useState<JapanVisaSlotsDatesMap>({
      [JapanVisaType.TOURISM]: "",
      [JapanVisaType.BUSINESS]: "",
      [JapanVisaType.OTHERS]: "",
    });
  const getJapanVisaSlotsDatesMap = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.JapanVisaLastSlotsInfo}`,
      );
      const resData = res.data;

      if (!resData || typeof resData !== "object") {
        throw new Error("Invalid data");
      }

      const tourism = resData[JapanVisaType.TOURISM];
      const business = resData[JapanVisaType.BUSINESS];
      const others = resData[JapanVisaType.OTHERS];

      setJapanVisaSlotsDatesMap({
        [JapanVisaType.TOURISM]: tourism ? formatDateTime(tourism) : "-",
        [JapanVisaType.BUSINESS]: business ? formatDateTime(business) : "-",
        [JapanVisaType.OTHERS]: others ? formatDateTime(others) : "-",
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [
    fetchStatus,
    japanVisaSlotsDatesMap,
    getJapanVisaSlotsDatesMap,
  ] as const;
}

export function useGetCdcSlotsDatesInfo() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [cdcSlotsDatesInfo, setCdcSlotsDatesInfo] = useState<CdcSlotsDatesInfo>(
    {
      datesMap: {} as CdcSlotsDatesMap,
      updatedAt: "",
    },
  );
  const getCdcSlotsDatesInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(`${API_URL}${ApiEndpoint.CdcSlotsInfo}`);
      const resData = res.data as CdcSlotsDatesInfo;

      if (!resData || typeof resData !== "object") {
        throw new Error("Invalid data");
      }

      const { datesMap } = resData;
      const eyesightTest = datesMap[CdcService.EYESIGHT_TEST];
      const counterServices = datesMap[CdcService.COUNTER_SERVICES];

      setCdcSlotsDatesInfo({
        datesMap: {
          [CdcService.EYESIGHT_TEST]: eyesightTest
            ? formatDateTime(eyesightTest)
            : "-",
          [CdcService.COUNTER_SERVICES]: counterServices
            ? formatDateTime(counterServices)
            : "-",
        },
        updatedAt: formatDateTime(resData.updatedAt),
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, cdcSlotsDatesInfo, getCdcSlotsDatesInfo] as const;
}

export function useGetCdcLessonSlotsDatesInfo() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [cdcLessonSlotsInfo, setCdcLessonSlotsInfo] =
    useState<CdcLessonSlotsDatesInfo>({
      datesMap: {} as CdcLessonSlotsDatesMap,
      updatedAt: "",
    });
  const getCdcLessonSlotsDatesInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.CdcLessonLastSlotsInfo}`,
      );
      const resData = res.data as CdcLessonSlotsDatesInfo;

      if (!resData || typeof resData !== "object") {
        throw new Error("Invalid data");
      }

      const { datesMap } = resData;
      const autoCar = datesMap[CdcLessonsService.AUTO_CAR];
      const autoCarTampines = datesMap[CdcLessonsService.AUTO_CAR_TAMPINES];
      const manualCar = datesMap[CdcLessonsService.MANUAL_CAR];
      const class2L1 = datesMap[CdcLessonsService.CLASS_2_L1];
      const class2L2 = datesMap[CdcLessonsService.CLASS_2_L2];
      const class2L3 = datesMap[CdcLessonsService.CLASS_2_L3];
      const class2AL1 = datesMap[CdcLessonsService.CLASS_2A_L1];
      const class2AL2 = datesMap[CdcLessonsService.CLASS_2A_L2];
      const class2AL3 = datesMap[CdcLessonsService.CLASS_2A_L3];
      const class2BL1 = datesMap[CdcLessonsService.CLASS_2B_L1];
      const class2BL2 = datesMap[CdcLessonsService.CLASS_2B_L2];
      const class2BL3 = datesMap[CdcLessonsService.CLASS_2B_L3];
      const class2BL4 = datesMap[CdcLessonsService.CLASS_2B_L4];
      const class2BL5 = datesMap[CdcLessonsService.CLASS_2B_L5];
      const class2BL6 = datesMap[CdcLessonsService.CLASS_2B_L6];
      const class2BL7 = datesMap[CdcLessonsService.CLASS_2B_L7];
      const class2BL8 = datesMap[CdcLessonsService.CLASS_2B_L8];

      setCdcLessonSlotsInfo({
        datesMap: {
          [CdcLessonsService.AUTO_CAR]: autoCar ? formatDateTime(autoCar) : "-",
          [CdcLessonsService.AUTO_CAR_TAMPINES]: autoCarTampines
            ? formatDateTime(autoCarTampines)
            : "-",
          [CdcLessonsService.MANUAL_CAR]: manualCar
            ? formatDateTime(manualCar)
            : "-",
          [CdcLessonsService.CLASS_2_L1]: class2L1
            ? formatDateTime(class2L1)
            : "-",
          [CdcLessonsService.CLASS_2_L2]: class2L2
            ? formatDateTime(class2L2)
            : "-",
          [CdcLessonsService.CLASS_2_L3]: class2L3
            ? formatDateTime(class2L3)
            : "-",
          [CdcLessonsService.CLASS_2A_L1]: class2AL1
            ? formatDateTime(class2AL1)
            : "-",
          [CdcLessonsService.CLASS_2A_L2]: class2AL2
            ? formatDateTime(class2AL2)
            : "-",
          [CdcLessonsService.CLASS_2A_L3]: class2AL3
            ? formatDateTime(class2AL3)
            : "-",
          [CdcLessonsService.CLASS_2B_L1]: class2BL1
            ? formatDateTime(class2BL1)
            : "-",
          [CdcLessonsService.CLASS_2B_L2]: class2BL2
            ? formatDateTime(class2BL2)
            : "-",
          [CdcLessonsService.CLASS_2B_L3]: class2BL3
            ? formatDateTime(class2BL3)
            : "-",
          [CdcLessonsService.CLASS_2B_L4]: class2BL4
            ? formatDateTime(class2BL4)
            : "-",
          [CdcLessonsService.CLASS_2B_L5]: class2BL5
            ? formatDateTime(class2BL5)
            : "-",
          [CdcLessonsService.CLASS_2B_L6]: class2BL6
            ? formatDateTime(class2BL6)
            : "-",
          [CdcLessonsService.CLASS_2B_L7]: class2BL7
            ? formatDateTime(class2BL7)
            : "-",
          [CdcLessonsService.CLASS_2B_L8]: class2BL8
            ? formatDateTime(class2BL8)
            : "-",
        },
        updatedAt: formatDateTime(resData.updatedAt),
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, cdcLessonSlotsInfo, getCdcLessonSlotsDatesInfo] as const;
}

export function useGetCdcTestSlotsDatesMap() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [cdcTestSlotsDatesMap, setCdcTestSlotsDatesMap] =
    useState<CdcTestSlotsDatesMap>({
      [CdcTestsService.PRIVATE_TP_TEST]: "",
      [CdcTestsService.AUTO_CAR_TEST]: "",
      [CdcTestsService.MANUAL_CAR_TEST]: "",
      [CdcTestsService.CLASS_2B_TEST]: "",
    });
  const getCdcTestSlotsDatesMap = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.CdcLessonLastSlotsInfo}`,
      );
      const resData = res.data;

      if (!resData || typeof resData !== "object") {
        throw new Error("Invalid data");
      }

      const privateTpTest = resData[CdcTestsService.PRIVATE_TP_TEST];
      const autoCarTest = resData[CdcTestsService.AUTO_CAR_TEST];
      const manualCarTest = resData[CdcTestsService.MANUAL_CAR_TEST];
      const class2BTest = resData[CdcTestsService.CLASS_2B_TEST];

      setCdcTestSlotsDatesMap({
        [CdcTestsService.PRIVATE_TP_TEST]: privateTpTest
          ? formatDateTime(privateTpTest)
          : "-",
        [CdcTestsService.AUTO_CAR_TEST]: autoCarTest
          ? formatDateTime(autoCarTest)
          : "-",
        [CdcTestsService.MANUAL_CAR_TEST]: manualCarTest
          ? formatDateTime(manualCarTest)
          : "-",
        [CdcTestsService.CLASS_2B_TEST]: class2BTest
          ? formatDateTime(class2BTest)
          : "-",
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, cdcTestSlotsDatesMap, getCdcTestSlotsDatesMap] as const;
}

export function useGetCdcSimulatorSlotsDatesMap() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [cdcSimulatorSlotsDatesMap, setCdcSimulatorSlotsDatesMap] =
    useState<CdcSimulatorSlotsDatesMap>({
      [CdcSimulatorService.SIMULATOR_BIKE]: "",
      [CdcSimulatorService.SIMULATOR_CAR]: "",
    });
  const getCdcSimulatorSlotsDatesMap = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.CdcLessonLastSlotsInfo}`,
      );
      const resData = res.data;

      if (!resData || typeof resData !== "object") {
        throw new Error("Invalid data");
      }

      const simulatorBike = resData[CdcSimulatorService.SIMULATOR_BIKE];
      const simulatorCar = resData[CdcSimulatorService.SIMULATOR_CAR];

      setCdcSimulatorSlotsDatesMap({
        [CdcSimulatorService.SIMULATOR_BIKE]: simulatorBike
          ? formatDateTime(simulatorBike)
          : "-",
        [CdcSimulatorService.SIMULATOR_CAR]: simulatorCar
          ? formatDateTime(simulatorCar)
          : "-",
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [
    fetchStatus,
    cdcSimulatorSlotsDatesMap,
    getCdcSimulatorSlotsDatesMap,
  ] as const;
}

export function useGetDepositRatesInfo() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [depositRatesInfo, setDepositRatesInfo] = useState<DepositRatesInfo>({
    items: [],
    updatedAt: "",
  });
  const getDepositRatesInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.FixedDepositRatesInfo}`,
      );
      const resData = res.data;

      if (!resData || !resData?.updatedAt || !Array.isArray(resData?.items)) {
        throw new Error("Invalid data");
      }

      setDepositRatesInfo({
        ...resData,
        updatedAt: formatDateTime(resData.updatedAt),
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, depositRatesInfo, getDepositRatesInfo] as const;
}

export function useGetFlightsInfo(airline: FlightAirline) {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [flightsInfo, setFlightsInfo] = useState<FlightsInfo>({
    items: [],
    updatedAt: "",
  });
  const getFlightsInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.FlightsInfo}?airline=${airline}`,
      );
      const resData = res.data;

      if (!resData || !resData?.updatedAt || !Array.isArray(resData?.items)) {
        throw new Error("Invalid data");
      }

      setFlightsInfo({
        items: (resData.items as Flights).filter(
          (item) => !item.isNoLongerAvailable,
        ),
        updatedAt: formatDateTime(resData.updatedAt),
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, flightsInfo, getFlightsInfo] as const;
}

export function useGetCoeBiddingsInfo() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [coeBiddingsInfo, setCoeBiddingsInfo] = useState<CoeBiddingsInfo>({
    items: [],
    updatedAt: "",
  });
  const getCoeBiddingsInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(`${API_URL}${ApiEndpoint.CoeBiddingsInfo}`);
      const resData = res.data;

      if (!resData || !resData?.updatedAt || !Array.isArray(resData?.items)) {
        throw new Error("Invalid data");
      }

      setCoeBiddingsInfo({
        ...resData,
        updatedAt: formatDateTime(resData.updatedAt),
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, coeBiddingsInfo, getCoeBiddingsInfo] as const;
}

export function useGetTrainSlotsInfo() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [trainSlotsInfo, setTrainSlotsInfo] = useState<TrainTimeSlotsInfo>({
    items: [],
    updatedAt: "",
    lastAvailableDate: "",
  });
  const getTrainSlotsInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.TrainTimeSlotsInfo}?service=${TrainService.KTMB}`,
      );
      const resData = res.data;

      if (!resData || !resData?.updatedAt || !Array.isArray(resData?.items)) {
        throw new Error("Invalid data");
      }

      setTrainSlotsInfo({
        ...resData,
        updatedAt: formatDateTime(resData.updatedAt),
        lastAvailableDate: formatDateTime(resData.lastAvailableDate),
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, trainSlotsInfo, getTrainSlotsInfo] as const;
}

export function useGetSsdcSlotsDatesMap() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [ssdcSlotsDatesMap, setSsdcSlotsDatesMap] = useState<SsdcSlotsDatesMap>(
    {
      [SsdcService.ENROLMENT_WEEKEND]: "",
      [SsdcService.PRIVATE_LEARNERS]: "",
      [SsdcService.PRACTICAL_LESSON_BOOKING]: "",
      [SsdcService.OTHER_COURSES_ENROLMENT]: "",
      [SsdcService.FOREIGN_LICENCE_WEEKEND]: "",
    },
  );
  const getSsdcSlotsDatesMap = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(`${API_URL}${ApiEndpoint.SsdcSlotsInfo}`);
      const resData = res.data;

      if (!resData || typeof resData !== "object") {
        throw new Error("Invalid data");
      }

      const enrolmentWeekend = resData[SsdcService.ENROLMENT_WEEKEND];
      const privateLearners = resData[SsdcService.PRIVATE_LEARNERS];
      const practicalLessonBooking =
        resData[SsdcService.PRACTICAL_LESSON_BOOKING];
      const otherCoursesEnrolment =
        resData[SsdcService.OTHER_COURSES_ENROLMENT];
      const foreignLicenceWeekend =
        resData[SsdcService.FOREIGN_LICENCE_WEEKEND];

      setSsdcSlotsDatesMap({
        [SsdcService.ENROLMENT_WEEKEND]: enrolmentWeekend
          ? formatDateTime(enrolmentWeekend)
          : "-",
        [SsdcService.PRIVATE_LEARNERS]: privateLearners
          ? formatDateTime(privateLearners)
          : "-",
        [SsdcService.PRACTICAL_LESSON_BOOKING]: practicalLessonBooking
          ? formatDateTime(practicalLessonBooking)
          : "-",
        [SsdcService.OTHER_COURSES_ENROLMENT]: otherCoursesEnrolment
          ? formatDateTime(otherCoursesEnrolment)
          : "-",
        [SsdcService.FOREIGN_LICENCE_WEEKEND]: foreignLicenceWeekend
          ? formatDateTime(foreignLicenceWeekend)
          : "-",
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, ssdcSlotsDatesMap, getSsdcSlotsDatesMap] as const;
}

export function useGetSsdcTestSlotsDatesInfo() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [ssdcTestSlotsDatesInfo, setSsdcTestSlotsDatesInfo] =
    useState<SsdcTestSlotsDatesInfo>({
      datesMap: {} as SsdcTestSlotsDatesMap,
      updatedAt: "",
    });
  const getSsdcTestSlotsDatesInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(`${API_URL}${ApiEndpoint.SsdcTestSlotsInfo}`);
      const resData = res.data as SsdcTestSlotsDatesInfo;

      if (!resData || typeof resData !== "object") {
        throw new Error("Invalid data");
      }

      const datesMap = resData.datesMap;
      const privateManualCar = datesMap[SsdcTestsService.PRIVATE_MANUAL_CAR];
      const autoCar = datesMap[SsdcTestsService.AUTO_CAR];
      const manualCar = datesMap[SsdcTestsService.MANUAL_CAR];

      setSsdcTestSlotsDatesInfo({
        datesMap: {
          [SsdcTestsService.PRIVATE_MANUAL_CAR]: privateManualCar
            ? formatDateTime(privateManualCar)
            : "-",
          [SsdcTestsService.AUTO_CAR]: autoCar ? formatDateTime(autoCar) : "-",
          [SsdcTestsService.MANUAL_CAR]: manualCar
            ? formatDateTime(manualCar)
            : "-",
        },
        updatedAt: formatDateTime(resData.updatedAt),
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [
    fetchStatus,
    ssdcTestSlotsDatesInfo,
    getSsdcTestSlotsDatesInfo,
  ] as const;
}

export function useGetBbdcSlotsDatesMap() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [bbdcSlotsDatesMap, setBbdcSlotsDatesMap] = useState<BbdcSlotsDatesMap>(
    {
      [BbdcService.COUNTER_SERVICES]: "",
    },
  );
  const getBbdcSlotsDatesMap = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(`${API_URL}${ApiEndpoint.BbdcSlotsInfo}`);
      const resData = res.data;

      if (!resData || typeof resData !== "object") {
        throw new Error("Invalid data");
      }

      const counterServices = resData[BbdcService.COUNTER_SERVICES];

      setBbdcSlotsDatesMap({
        [BbdcService.COUNTER_SERVICES]: counterServices
          ? formatDateTime(counterServices)
          : "",
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, bbdcSlotsDatesMap, getBbdcSlotsDatesMap] as const;
}

export function useGetTravelDealsInfo() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [travelDealsInfo, setTravelDealsInfo] = useState<TravelDealInfo>({
    items: [],
    updatedAt: "",
    lastAvailableAt: "",
  });
  const getTravelDealsInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.TravelDealsInfo}?service=${TravelDealsService.SCOOT}`,
      );
      const resData = res.data;

      if (
        !resData ||
        !Array.isArray(resData.items) ||
        !resData.updatedAt ||
        !resData.lastAvailableAt
      ) {
        throw new Error("Invalid data");
      }

      setTravelDealsInfo({
        ...resData,
        updatedAt: formatDateTime(resData.updatedAt),
        lastAvailableAt: formatDateTime(resData.lastAvailableAt),
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, travelDealsInfo, getTravelDealsInfo] as const;
}

export function useGetThemeParkInfo(service: ThemeParkService) {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [themeParkInfo, setThemeParkInfo] = useState<ThemeParkInfo>({
    items: [],
    updatedAt: "",
  });
  const getThemeParkInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.ThemeParkInfo}?service=${service}`,
      );
      const resData = res.data;

      if (!resData || !resData?.updatedAt || !Array.isArray(resData?.items)) {
        throw new Error("Invalid data");
      }

      setThemeParkInfo({
        ...resData,
        updatedAt: formatDateTime(resData.updatedAt),
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, themeParkInfo, getThemeParkInfo] as const;
}

export function useGetTotoSnowballInfo() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [totoSnowballInfo, setTotoSnowballInfo] = useState<LotteryJackpotInfo>({
    drawDate: "",
    hasDrawn: false,
    prize: 0,
    resultsLink: "",
  });
  const getTotoSnowballInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.LotteryInfo}?service=${LotteryService.TOTO}`,
      );
      const resData = res.data as LotteryJackpotInfo;

      if (!resData || typeof resData !== "object") {
        throw new Error("Invalid data");
      }

      const [, date] = resData.drawDate.split(", ");

      setTotoSnowballInfo({
        ...resData,
        drawDate: formatDate(date),
        hasDrawn: new Date(resData.drawDate) < new Date(),
      });

      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, totoSnowballInfo, getTotoSnowballInfo] as const;
}
