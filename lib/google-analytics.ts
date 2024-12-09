import { SITE_NAME } from "./constants";
import { checkIsLocalhost } from "./location";
import {
  EventSubscribeFormSubmit,
  EventToastClick,
  EventToastClose,
  EventToastOpen,
  EventTopicClick,
  EventTopicPageClick,
  EventUnsubscribeFormSubmit,
} from "./types";

declare global {
  interface Window {
    dataLayer: Array<Record<string, any>>;
  }
}

export function trackEvent(
  data:
    | EventSubscribeFormSubmit
    | EventUnsubscribeFormSubmit
    | EventTopicClick
    | EventTopicPageClick
    | EventToastOpen
    | EventToastClose
    | EventToastClick,
) {
  if (checkIsLocalhost()) {
    return;
  }

  window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
  window.dataLayer.push({
    ...data,
    projectTitle: SITE_NAME,
  });
}
