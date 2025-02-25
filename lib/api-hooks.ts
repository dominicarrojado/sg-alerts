import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { formatDateTime } from "./date";
import {
  BbdcSlotsDatesMap,
  CdcLessonSlotsDatesMap,
  CdcSlotsDatesMap,
  CdcTestSlotsDatesMap,
  CoeBiddingsInfo,
  DepositRatesInfo,
  Flights,
  FlightsInfo,
  JapanVisaSlotsDatesMap,
  SsdcSlotsDatesMap,
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
  CdcTestsService,
  FetchStatus,
  FlightAirline,
  JapanVisaType,
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

export function useGetCdcSlotsDatesMap() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [cdcSlotsDatesMap, setCdcSlotsDatesMap] = useState<CdcSlotsDatesMap>({
    [CdcService.EYESIGHT_TEST]: "",
    [CdcService.COUNTER_SERVICES]: "",
  });
  const getCdcSlotsDatesMap = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(`${API_URL}${ApiEndpoint.CdcSlotsInfo}`);
      const resData = res.data;

      if (!resData || typeof resData !== "object") {
        throw new Error("Invalid data");
      }

      const eyesightTest = resData[CdcService.EYESIGHT_TEST];
      const counterServices = resData[CdcService.COUNTER_SERVICES];

      setCdcSlotsDatesMap({
        [CdcService.EYESIGHT_TEST]: eyesightTest
          ? formatDateTime(eyesightTest)
          : "-",
        [CdcService.COUNTER_SERVICES]: counterServices
          ? formatDateTime(counterServices)
          : "-",
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, cdcSlotsDatesMap, getCdcSlotsDatesMap] as const;
}

export function useGetCdcLessonSlotsDatesMap() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [cdcLessonSlotsDatesMap, setCdcLessonSlotsDatesMap] =
    useState<CdcLessonSlotsDatesMap>({
      [CdcLessonsService.AUTO_CAR]: "",
      [CdcLessonsService.MANUAL_CAR]: "",
    });
  const getCdcLessonSlotsDatesMap = async () => {
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

      const autoCar = resData[CdcLessonsService.AUTO_CAR];
      const manualCar = resData[CdcLessonsService.MANUAL_CAR];

      setCdcLessonSlotsDatesMap({
        [CdcLessonsService.AUTO_CAR]: autoCar ? formatDateTime(autoCar) : "-",
        [CdcLessonsService.MANUAL_CAR]: manualCar
          ? formatDateTime(manualCar)
          : "-",
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [
    fetchStatus,
    cdcLessonSlotsDatesMap,
    getCdcLessonSlotsDatesMap,
  ] as const;
}

export function useGetCdcTestSlotsDatesMap() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [cdcTestSlotsDatesMap, setCdcTestSlotsDatesMap] =
    useState<CdcTestSlotsDatesMap>({
      [CdcTestsService.PRIVATE_TP_TEST]: "",
      [CdcTestsService.AUTO_CAR_TEST]: "",
      [CdcTestsService.MANUAL_CAR_TEST]: "",
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
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, cdcTestSlotsDatesMap, getCdcTestSlotsDatesMap] as const;
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

export function useGetSsdcTestSlotsDatesMap() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [ssdcTestSlotsDatesMap, setSsdcTestSlotsDatesMap] =
    useState<SsdcTestSlotsDatesMap>({
      [SsdcTestsService.PRIVATE_MANUAL_CAR]: "",
      [SsdcTestsService.PRIVATE_AUTO_CAR]: "",
      [SsdcTestsService.AUTO_CAR]: "",
      [SsdcTestsService.MANUAL_CAR]: "",
    });
  const getSsdcTestSlotsDatesMap = async () => {
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

      const privateManualCar = resData[SsdcTestsService.PRIVATE_MANUAL_CAR];
      const privateAutoCar = resData[SsdcTestsService.PRIVATE_AUTO_CAR];
      const autoCar = resData[SsdcTestsService.AUTO_CAR];
      const manualCar = resData[SsdcTestsService.MANUAL_CAR];

      setSsdcTestSlotsDatesMap({
        [SsdcTestsService.PRIVATE_MANUAL_CAR]: privateManualCar
          ? formatDateTime(privateManualCar)
          : "-",
        [SsdcTestsService.PRIVATE_AUTO_CAR]: privateAutoCar
          ? formatDateTime(privateAutoCar)
          : "-",
        [SsdcTestsService.AUTO_CAR]: autoCar ? formatDateTime(autoCar) : "-",
        [SsdcTestsService.MANUAL_CAR]: manualCar
          ? formatDateTime(manualCar)
          : "-",
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [
    fetchStatus,
    ssdcTestSlotsDatesMap,
    getSsdcTestSlotsDatesMap,
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
