import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { DepositRatesInfo, Subscription, SubscriptionTopics } from "./types";
import { ApiEndpoint, FetchStatus } from "./enums";
import { API_URL } from "./constants";
import { formatDateTime } from "./date";

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
  const [lastAvailableSlotsDate, setJapanVisaSlotsDate] = useState("");
  const getJapanVisaSlotsDate = async () => {
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

      setJapanVisaSlotsDate(formatDateTime(resData.updatedAt));
      setFetchStatus(FetchStatus.Success);
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
    }
  };

  return [fetchStatus, lastAvailableSlotsDate, getJapanVisaSlotsDate] as const;
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
