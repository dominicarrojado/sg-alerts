"use client";

import { useToast } from "@/lib/hooks/use-toast";
import { trackEvent } from "@/lib/google-analytics";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { GoogleAnalyticsEvent } from "@/lib/enums";

export function Toaster() {
  const { toasts } = useToast();
  const closeBtnText = "Close Toast";
  const closeBtnOnClick = (title: string) => {
    trackEvent({
      event: GoogleAnalyticsEvent.TOAST_CLOSE,
      toastTitle: title,
      buttonText: closeBtnText,
    });
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose
              title={closeBtnText}
              onClick={() => closeBtnOnClick(title || "")}
            />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
