// src/lib/reportConversion.ts

// 1) Global tanımda gtag fonksiyonunu tipliyoruz
declare global {
  interface Window {
    gtag?: GtagFunction;
    dataLayer?: unknown[];
  }
}

type GtagFunction = {
  (command: "js", config: Date): void;
  (command: "config", targetId: string, config?: Record<string, unknown>): void;
  (command: "event", eventName: string, params: GtagEventParams): void;
};

interface GtagEventParams {
  send_to: string;
  value?: number;
  currency?: string;
  event_callback?: () => void;
  // Ek parametreler olabilir
  [key: string]: unknown;
}

// 2) Dönüşüm fonksiyonu
export function reportConversion(url?: string) {
  let called = false;
  const callback = () => {
    if (!called) {
      called = true;
      if (typeof url !== "undefined") {
        window.location.href = url;
      }
    }
  };

  // GTM'e özel: dataLayer üzerinden custom event push (telefon araması)
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "phone_call",
      value: 1.0,
      currency: "TRY",
    });
  }

  // gtag fonksiyonu tanımlı ve bir fonksiyon ise:
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    if (url?.includes("tel:")) {
      window.gtag("event", "conversion", {
        send_to: "AW-11516061259/73mkCJfnzfsZEMvMpPMq",
        value: 1.0,
        currency: "TRY",
        event_callback: callback,
      });
      // Fallback: 500ms sonra callback'i tekrar çağır
      setTimeout(callback, 500);
      return;
    } else if (url?.includes("api.whatsapp.com")) {
      window.gtag("event", "conversion", {
        send_to: "AW-11516061259/tpAXCMSGtLobEMvMpPMq",
        event_callback: callback,
      });
      // Fallback: 500ms sonra callback'i tekrar çağır
      setTimeout(callback, 500);
    } else {
      // gtag yoksa doğrudan telefon linkine gider
      callback();
    }
  }
}
