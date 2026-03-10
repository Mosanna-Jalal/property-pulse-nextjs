import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { getSiteUrl } from "@/utils/seoConfig";

const siteUrl = getSiteUrl();

export const generateMetadata = ({ searchParams }) => {
  const location = searchParams?.location?.trim();
  const propertyType = searchParams?.propertyType?.trim();

  const titleLocation = location || "Gaya, Bihar";
  const titleType =
    propertyType && propertyType !== "All" ? `${propertyType} ` : "";

  const title = `${titleType}Properties in ${titleLocation}`;
  const description = `Search ${titleType.toLowerCase()}properties available in ${titleLocation} on Property Market.`;
  const canonicalPath = `/properties/search-results?location=${encodeURIComponent(
    location || ""
  )}&propertyType=${encodeURIComponent(propertyType || "All")}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${canonicalPath}`,
    },
  };
};

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();
  const locationPattern = new RegExp(location, "i");
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const typePattern = new RegExp(`^${propertyType}$`, "i");
    query.type = typePattern;
  }
  const propertyQueryResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertyQueryResults);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm
            initialLocation={location || ""}
            initialPropertyType={propertyType || "All"}
          />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-600 mb-4 hover:underline "
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back to Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p className="text-gray-600">
              No properties found matching your criteria.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
