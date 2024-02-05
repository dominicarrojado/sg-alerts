import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { formatDateTime } from "./date";
import {
  CoeBiddingsInfo,
  DepositRatesInfo,
  FlightsInfo,
  Subscription,
  SubscriptionTopics,
  TrainTimeSlotsInfo,
} from "./types";
import {
  ApiEndpoint,
  CdcLessonsService,
  FetchStatus,
  FlightAirline,
  TrainService,
} from "./enums";
import { API_URL } from "./constants";

export function useSubmitSubscribeRequest() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const submitSubscribeRequest = async (
    email: string,
    topics: SubscriptionTopics
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
    topics: SubscriptionTopics
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

export function useGetJapanVisaSlotsDate() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [lastAvailableSlotsDate, setLastAvailableSlotsDate] = useState("");
  const getLastAvailableSlotsDate = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.JapanVisaLastSlotsInfo}`
      );
      const resData = res.data;

      if (!resData || !resData.updatedAt) {
        throw new Error("Invalid data");
      }

      setLastAvailableSlotsDate(formatDateTime(resData.updatedAt));
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [
    fetchStatus,
    lastAvailableSlotsDate,
    getLastAvailableSlotsDate,
  ] as const;
}

export function useGetCdcLessonSlotsDate() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const [lastAvailableSlotsDate, setLastAvailableSlotsDate] = useState("");
  const getLastAvailableSlotsDate = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.CdcLessonLastSlotsInfo}`
      );
      const resData = res.data;

      if (!resData || !resData[CdcLessonsService.AUTO_CAR]) {
        throw new Error("Invalid data");
      }

      setLastAvailableSlotsDate(
        formatDateTime(resData[CdcLessonsService.AUTO_CAR])
      );
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [
    fetchStatus,
    lastAvailableSlotsDate,
    getLastAvailableSlotsDate,
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
        `${API_URL}${ApiEndpoint.FixedDepositRatesInfo}`
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
        `${API_URL}${ApiEndpoint.FlightsInfo}?airline=${airline}`
      );
      const resData = res.data;

      if (!resData || !resData?.updatedAt || !Array.isArray(resData?.items)) {
        throw new Error("Invalid data");
      }

      setFlightsInfo({
        ...resData,
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
  });
  const getTrainSlotsInfo = async () => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;
      const res = await axios.get(
        `${API_URL}${ApiEndpoint.TrainTimeSlotsInfo}?service=${TrainService.KTM}`
      );
      const resData = res.data;

      if (!resData || !resData?.updatedAt || !Array.isArray(resData?.items)) {
        throw new Error("Invalid data");
      }

      setTrainSlotsInfo({
        ...resData,
        updatedAt: formatDateTime(resData.updatedAt),
      });
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, trainSlotsInfo, getTrainSlotsInfo] as const;
}
