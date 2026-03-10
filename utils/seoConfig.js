const fallbackUrl = "https://propertymarket.in";

const normalizeUrl = (url) => {
  if (!url) return fallbackUrl;

  const normalized = url.trim().replace(/\/+$/, "");

  if (!/^https?:\/\//i.test(normalized)) {
    return `https://${normalized}`;
  }

  return normalized;
};

export const siteName = "Property Market";

export const getSiteUrl = () =>
  normalizeUrl(process.env.NEXT_PUBLIC_DOMAIN || process.env.NEXTAUTH_URL);

export const defaultTitle = "Property Market";
export const defaultDescription =
  "Property Market helps you rent, buy, and sell properties in Gaya district, across Bihar, and throughout India.";
export const defaultKeywords = [
  "property market",
  "property in gaya",
  "flats in gaya bihar",
  "house for rent in gaya",
  "buy property in gaya",
  "sell property in gaya",
  "real estate in bihar",
  "properties in bihar",
  "india real estate",
];
