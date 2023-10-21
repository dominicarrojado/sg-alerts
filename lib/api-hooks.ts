import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Subscription, SubscriptionTopics } from "./types";
import { ApiEndpoint, FetchStatus } from "./enums";
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

      if (!res.data || !res.data?.user || !Array.isArray(res.data?.topics)) {
        throw new Error("Invalid data");
      }

      setSubscription(res.data);
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
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const updateSubscription = async (
    id: string,
    topics: SubscriptionTopics
  ): Promise<boolean> => {
    try {
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
