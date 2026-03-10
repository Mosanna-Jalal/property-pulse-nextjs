import "@maptiler/sdk/dist/maptiler-sdk.css";

import "./assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import { GlobalProvider } from "@/context/GlobalContext";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import {
  defaultDescription,
  defaultKeywords,
  defaultTitle,
  getSiteUrl,
  siteName,
} from "@/utils/seoConfig";

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  keywords: defaultKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  other: {
    "geo.region": "IN-BR",
    "geo.placename": "Gaya, Bihar",
    "geo.position": "24.7955;85.0002",
    ICBM: "24.7955, 85.0002",
  },
};
const MainLayout = ({ children }) => {
  return (
    <html lang="en-IN">
      <body>
        <AuthProvider>
          <GlobalProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </GlobalProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default MainLayout;
