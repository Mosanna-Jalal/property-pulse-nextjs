import { getSiteUrl } from "@/utils/seoConfig";

const siteUrl = getSiteUrl();

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/messages",
          "/profile",
          "/properties/add",
          "/properties/*/edit",
          "/properties/saved",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
