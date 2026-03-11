import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import { redirect } from "next/navigation";

const PropertyEditPage = async ({ params }) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser?.userId) {
    redirect(`/api/auth/signin?callbackUrl=/properties/${params.id}/edit`);
  }

  await connectDB();
  const propertyDoc = await Property.findById(params.id);
  if (!propertyDoc) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  }

  if (propertyDoc.owner.toString() !== sessionUser.userId) {
    redirect("/profile");
  }

  const property = convertToSerializableObject(propertyDoc);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
