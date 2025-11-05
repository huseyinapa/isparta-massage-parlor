import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ispartagulsehrimasaj.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://ispartagulsehrimasaj.com/hakkimizda",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://ispartagulsehrimasaj.com/iletisim",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://ispartagulsehrimasaj.com/neden-biz",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // {
    //   url: "https://ispartagulsehrimasaj.com/galeri",
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.6,
    // },
    // {
    //   url: "https://ispartagulsehrimasaj.com/gizlilik-politikasi",
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.3,
    // },
    // {
    //   url: "https://ispartagulsehrimasaj.com/kullanim-kosullari",
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 0.3,
    // },
  ];
}
