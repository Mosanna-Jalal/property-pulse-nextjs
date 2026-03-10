import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import {
  defaultDescription,
  getSiteUrl,
  siteName,
} from "@/utils/seoConfig";

const siteUrl = getSiteUrl();

export const metadata = {
  title: "Rent, Buy & Sell Properties in Gaya, Bihar",
  description:
    "Find verified homes, flats, plots, and commercial spaces to rent, buy, or sell in Gaya district and across Bihar with Property Market.",
  alternates: {
    canonical: "/",
  },
};

const HomePage = () => {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/properties/search-results?location={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteName,
    url: siteUrl,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Gaya" },
      { "@type": "AdministrativeArea", name: "Bihar" },
      { "@type": "Country", name: "India" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gaya",
      addressRegion: "Bihar",
      addressCountry: "IN",
    },
    serviceType: ["Rent", "Buy", "Sell"],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </div>
  );
};

export default HomePage;
