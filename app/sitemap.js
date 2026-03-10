import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSiteUrl } from "@/utils/seoConfig";

const siteUrl = getSiteUrl();

const staticRoutes = [
  {
    url: siteUrl,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: `${siteUrl}/properties`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  },
];

export default async function sitemap() {
  try {
    await connectDB();
    const properties = await Property.find({}, "_id updatedAt").lean();

    const propertyRoutes = properties.map((property) => ({
      url: `${siteUrl}/properties/${property._id.toString()}`,
      lastModified: property.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...propertyRoutes];
  } catch {
    return staticRoutes;
  }
}
