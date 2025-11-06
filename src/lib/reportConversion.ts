// src/lib/reportConversion.ts

// 1) Global tanımda gtag fonksiyonunu tipliyoruz
declare global {
  interface Window {
    gtag?: GtagFunction;
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
  const callback = () => {
    if (typeof url !== "undefined") {
      window.location.href = url;
    }
  };

  // gtag fonksiyonu tanımlı ve bir fonksiyon ise:
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-11516061259/73mkCJfnzfsZEMvMpPMq",
      value: 1.0,
      currency: "TRY",
      event_callback: callback,
    });
  } else {
    // gtag yoksa doğrudan telefon linkine gider
    callback();
  }

  return false;
}
