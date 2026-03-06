import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
const SavedPropertiesPage = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    return (
      <p className="text-gray-500">
        You must be logged in to view saved properties.
      </p>
    );
  }
  const { userId } = sessionUser;
  await connectDB();
  const { bookmarks } = await User.findById(userId).populate("bookmarks");
  const savedProperties = bookmarks;
  return (
    <section className="px-4 py-16">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Saved Properties</h1>
        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no saved properties.</p>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
