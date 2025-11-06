import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavbarComponent from "@/app/_components/Navbar";
import FooterComponent from "./_components/Footer";
import { ToastContainer } from "react-toastify";
import Script from "next/script";
import SpeedDialButtonComponent from "./_components/SpeedDialButton";

// GTM noscript bileşeni
function GTMNoScript() {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PL27HK6T"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
      }}
    />
  );
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Burada metadata objenizi olduğu gibi koruyabilirsiniz
export const metadata: Metadata = {
  title: {
    default:
      "Isparta Gül Şehri Spa & Masaj Salonu | Profesyonel Masaj Hizmetleri",
    template: "%s | Isparta Gül Şehri Spa & Masaj Salonu",
  },
  description:
    "Isparta'nın en profesyonel masaj ve spa merkezi. Aroma terapi, klasik masaj, sıcak taş masajı ve daha fazlası için hemen randevu alın. ✓ Profesyonel terapistler ✓ Steril ortam ✓ Uygun fiyatlar ve Mutlu bir masaj deneyimi için.",
  keywords: [
    "isparta masaj",
    "Isparta masaj",
    "spa merkezi",
    "masaj salonu",
    "aroma terapi",
    "klasik masaj",
    "sıcak taş masajı",
    "profesyonel masaj",
    "spa hizmetleri",
    "Isparta spa",
    "isparta spa",
    "Isparta Masajda Mutluluğun Adresi",
    "isparta masajda mutluluğun adresi",
  ],
  authors: [{ name: "Isparta Gül Şehri Spa & Masaj Salonu" }],
  creator: "Isparta Gül Şehri Spa & Masaj Salonu",
  publisher: "Isparta Gül Şehri Spa & Masaj Salonu",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title:
      "Isparta Gül Şehri Spa & Masaj Salonu | Profesyonel Masaj Hizmetleri",
    description:
      "Isparta'nın en profesyonel masaj ve spa merkezi. Aroma terapi, klasik masaj, sıcak taş masajı ve mutlu bir masaj deneyimi için hemen randevu alın.",
    url: "https://ispartagulsehrimasaj.com",
    siteName: "Isparta Gül Şehri Spa & Masaj Salonu",
    images: [
      {
        url: "https://ispartagulsehrimasaj.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Isparta Gül Şehri Spa & Masaj Salonu",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const NODE_ENV = process.env.NODE_ENV;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        {/* Google Tag Manager: Script Kodu */}
        <Script
          id="gtm-base"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PL27HK6T');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${NODE_ENV === "development" ? "debug-screens" : ""
          }`}
      >
        {/* Google Tag Manager: NoScript Fallback - body'nin en başında */}
        <GTMNoScript />

        {/* Google Analytics 4 (GTAG.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-RLKC1XDH1K"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RLKC1XDH1K');
              gtag('config', 'AW-11516061259');
            `,
          }}
        />

        <NavbarComponent />
        {children}
        <div className="fixed bottom-6 right-2">
          <SpeedDialButtonComponent />
        </div>
        <ToastContainer />
        <FooterComponent />
      </body>
    </html>
  );
}
