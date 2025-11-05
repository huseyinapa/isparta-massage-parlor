import FAQFeatures from "./_features/FAQ";
import HomeFeature from "./_features/Home";
import MassageServices from "./_features/Services";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SpaAndBeautyBusiness",
            name: "Isparta Gül Şehri Spa & Masaj Salonu",
            image: "https://ispartagulsehrimasaj.com/images/logo.jpg",
            "@id": "https://ispartagulsehrimasaj.com",
            url: "https://ispartagulsehrimasaj.com",
            telephone: "+905302411232",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Firdevs Cd. No: 8 D:14",
              addressLocality: "Isparta",
              postalCode: "32100",
              addressCountry: "TR",
            },
            priceRange: "₺₺",
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "09:00",
              closes: "22:00",
            },
          }),
        }}
      />
      <div className="mx-auto">
        <HomeFeature />
        <MassageServices />
        {/* <ReviewsFeature /> */}
        <FAQFeatures />
      </div>
    </>
  );
}
