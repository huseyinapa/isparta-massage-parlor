"use client";

import { Icon } from "@iconify/react";
import Image from "next/image";
import Logger from "@/lib/logger";
import Link from "next/link";
import { useEffect, useState } from "react";

export type GoogleReview = {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
};

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReviewsFeature() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();

        setReviews(data.reviews);
      } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        Logger.log(`Google API error: ${errorMessage}`, "error");
      }
    };

    fetchReviews();
  }, []);

  // const { data, error } = useSWR("/api/reviews", fetcher, {
  //   // revalidateOnFocus:
  //   // refreshInterval: 0 => otomatik yenileme yok

  //   revalidateOnFocus: false, // false olduğunda yeniden istek atmaz | true olduğunda sekme odaklandığında yeniden istek atar
  //   revalidateIfStale: false, // false olduğunda önbellekten alır | true olduğunda önbellekten almadan yeniden istek atar
  // });
  // console.log("api/reviews", data);
  // console.log("api/reviews", error);

  // if (error) {
  //   return <p className="text-red-500">Yorumlar alınırken hata oluştu!</p>;
  // }

  // Logger.log("Reviews", "ready");
  // if (!data) {
  //   Logger.log("!data", "cmd");
  //   return <p>Yükleniyor...</p>;
  // }
  // const reviews: GoogleReview[] = data.reviews || [];

  const leaveAReviews = `https://search.google.com/local/writereview?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID}`;
  const allReviewsLink =
    "https://www.google.com/search?sa=X&sca_esv=82d425a508629bf6&cs=1&hl=tr&tbm=lcl&sxsrf=AHTn8zrJ2o4cGXlxDKb_Ev4JpHlMQu59rA:1737987187843&q=Rose%20Town%20Spa%20Ve%20Masaj%20Salonu%20Yorumlar&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIyNrW0MDcxM7c0tLA0NTQ3NzLdwMj4ilEtKL84VSEkvzxPIbggUSEsVcE3sTgxSyE4MSc_r1QhMr-oNDcnsWgRK5EKAf2_4QtrAAAA&rldimm=359874679189517725&ved=0CAcQ5foLahcKEwi4yZ_pipaLAxUAAAAAHQAAAAAQBg&biw=957&bih=766&dpr=1#lkt=LocalPoiReviews&arid=ChdDSUhNMG9nS0VJQ0FnSUR2bGNEQWlRRRAB";
  // "https://www.google.com/search?uds=ABqPDvztZD_Nu18FR6tNPw2cK_RRzcb9rzA0njwM2ZZ2EY78Vm7QmPJygUmJ0fHf4AouI186zW3oVdcZbWHvl_E_m6Zwixdcrk1ByCSMr-_JlYUecEHr5Ef66K4eUBcxGMPh81cxuXdMIwBTthN8JX8giweI2wCqTixEEwXI2aG1AXfkEfqdiJQ&q=Rose%20Town%20Spa%20Ve%20Masaj%20Salonu%20Yorumlar&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzQ6rscYT32GE02aFvI7UcNPHsM-_7C9UoUiKBKplgTSFTuBTht9U_SSRkX2bVf6QizEb0PSWArvzam6Xk0dZtuiI51LCVkwHY1PgCeGf-MUqYjTD9Q%3D%3D&cs=1&hl=tr&sa=X&ved=0CCUQ_4MLahcKEwjYgaKxiZaLAxUAAAAAHQAAAAAQBw&biw=1286&bih=771&dpr=1";

  return (
    <section className="flex flex-col justify-center py-20 h-max">
      {/* Responsive yapılacak */}
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 md:gap-2">
          <h2 className="text-3xl font-bold text-center">İşletme Yorumları</h2>

          <div className="flex flex-row items-center justify-between gap-4">
            <Link
              href={leaveAReviews}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-base text-pink-700 font-medium text-center ">
                Yorum Yaz
              </span>
            </Link>
            |
            <Link
              href={allReviewsLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-base text-blue-600 font-medium text-center ">
                Tümünü Gör
              </span>
            </Link>
          </div>
        </div>

        {!reviews || reviews.length === 0 ? (
          <Icon
            icon="line-md:loading-twotone-loop"
            className="w-40 h-40 text-blue-500"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews?.map((review, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between shadow-2xl shadow-[#6a4285e5] rounded-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    className="w-10 h-10 rounded-full mr-3"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-semibold">{review.author_name}</p>
                    <p className="text-sm text-gray-500">
                      {review.relative_time_description}
                    </p>
                  </div>
                </div>
                {review.text && (
                  <p className="text-gray-700 italic mb-4 line-clamp-2">
                    “{review.text}”
                  </p>
                )}
                <div className="flex items-center mb-4">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Icon
                      key={i}
                      icon="material-symbols:star-rounded"
                      className="text-yellow-500 w-5 h-5 mr-1"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
