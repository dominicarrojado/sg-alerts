import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubscriptionTopics } from "./types";
import { ApiEndpoint, FetchStatus } from "./enums";
import { API_URL } from "./constants";

export function useSubmitSubscribeRequest() {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.Idle);
  const submitSubscribeRequest = async (
    email: string,
    topics: SubscriptionTopics
  ): Promise<boolean> => {
    try {
      setFetchStatus(FetchStatus.Loading);

      const axios = (await import("axios")).default;

      await axios.post(`${API_URL}${ApiEndpoint.SubscriptionRequests}`, {
        topics,
        contact: email,
        contactMode: "email",
      });

      setFetchStatus(FetchStatus.Success);

      return true;
    } catch (err) {
      setFetchStatus(FetchStatus.Failure);
      return false;
    }
  };

  return [fetchStatus, submitSubscribeRequest] as const;
}
