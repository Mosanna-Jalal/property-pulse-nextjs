import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import PropertyContactForm from "@/components/PropertyContactForm";
import ShareButtons from "@/components/ShareButtons";
import BookmarkButton from "@/components/BookmarkButton";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { cache } from "react";
import { getSiteUrl } from "@/utils/seoConfig";

const siteUrl = getSiteUrl();

const getPropertyById = cache(async (id) => {
  await connectDB();

  try {
    const propertyDoc = await Property.findById(id).lean();
    if (!propertyDoc) return null;
    return convertToSerializableObject(propertyDoc);
  } catch {
    return null;
  }
});

export const generateMetadata = async ({ params }) => {
  const property = await getPropertyById(params.id);

  if (!property) {
    return {
      title: "Property Not Found",
      description: "The requested property could not be found on Property Market.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const location = [property?.location?.city, property?.location?.state]
    .filter(Boolean)
    .join(", ");

  const description = property.description
    ? `${property.description.slice(0, 140)}${property.description.length > 140 ? "..." : ""}`
    : `View details for ${property.name}${location ? ` in ${location}` : ""} on Property Market.`;

  return {
    title: `${property.name}${location ? ` - ${location}` : ""}`,
    description,
    alternates: {
      canonical: `/properties/${params.id}`,
    },
    openGraph: {
      title: property.name,
      description,
      url: `${siteUrl}/properties/${params.id}`,
      images: property.images?.[0] ? [{ url: property.images[0] }] : [],
      type: "article",
    },
  };
};

const PropertyPage = async ({ params }) => {
  const property = await getPropertyById(params.id);

  if (!property) {
    return (
      <div className="text-center text-2xl font-bold mt-10">
        Property not found
      </div>
    );
  }
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70-30 w-full gap-6">
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
