import Image from "next/image";
import Link from "next/link";
import {
  FaBath,
  FaBed,
  FaMapMarker,
  FaMoneyBill,
  FaRulerCombined,
} from "react-icons/fa";

const FeaturedPropertyCard = ({ property }) => {
  const imageSrc = property.images?.[0];

  const getRateDisplay = () => {
    const rates = property?.rates || {};

    if (rates.weekly) return `$${rates.weekly.toLocaleString()}/wk`;
    if (rates.monthly) return `$${rates.monthly.toLocaleString()}/mo`;
    if (rates.nightly) return `$${rates.nightly.toLocaleString()}/night`;

    return "For Rent";
  };

  const location = [property?.location?.city, property?.location?.state]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:flex">
      <div className="relative h-56 md:h-auto md:w-2/5">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={property.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
        <p className="absolute top-4 left-4 bg-white text-blue-500 font-bold px-3 py-1 rounded-lg">
          {getRateDisplay()}
        </p>
      </div>

      <div className="p-6 md:w-3/5">
        <p className="text-gray-600">{property.type}</p>
        <h3 className="text-2xl font-bold mb-4">{property.name}</h3>

        <div className="flex items-center gap-4 text-gray-500 mb-5">
          <p className="flex items-center gap-1.5">
            <FaBed /> {property.beds} Beds
          </p>
          <p className="flex items-center gap-1.5">
            <FaBath /> {property.baths} Baths
          </p>
          <p className="flex items-center gap-1.5">
            <FaRulerCombined /> {property.square_feet?.toLocaleString()} sqft
          </p>
        </div>

        <div className="flex items-center gap-4 text-green-800 text-sm font-semibold mb-6">
          {property?.rates?.nightly && (
            <p className="flex items-center gap-1.5">
              <FaMoneyBill /> Nightly
            </p>
          )}
          {property?.rates?.weekly && (
            <p className="flex items-center gap-1.5">
              <FaMoneyBill /> Weekly
            </p>
          )}
          {property?.rates?.monthly && (
            <p className="flex items-center gap-1.5">
              <FaMoneyBill /> Monthly
            </p>
          )}
        </div>

        <div className="border border-gray-100 mb-5" />

        <div className="flex items-center justify-between gap-4">
          <p className="text-orange-700 font-semibold flex items-center gap-1.5">
            <FaMapMarker />
            {location || "Location unavailable"}
          </p>
          <Link
            href={`/properties/${property._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
