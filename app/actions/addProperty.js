'use server';
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";
import mongoose from "mongoose";

async function addProperty(formData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id is required');
  }
  const { userId } = sessionUser;
  const amenities = formData.getAll('amenities');
  const images = formData
  .getAll('images')
  .filter((image) => image.name !== '');
  
  const propertyData = {
    owner: new mongoose.Types.ObjectId(userId),
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location:{
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: parseInt(formData.get('beds')),
    baths: parseInt(formData.get('baths')),
    square_feet: parseInt(formData.get('square_feet')),
    amenities,
    rates: {
      nightly: formData.get('rates.nightly') ? parseInt(formData.get('rates.nightly')) : null,
      weekly: formData.get('rates.weekly') ? parseInt(formData.get('rates.weekly')) : null,
      monthly: formData.get('rates.monthly') ? parseInt(formData.get('rates.monthly')) : null,
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
  };
  
  // Upload images to Cloudinary
  const imageUrls = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray =  Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    //Convert buffer to base64 string
    const imageBase64 = imageData.toString('base64');

    //Make request to Cloudinary
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
      folder: 'property_pulse',
    }); 
    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;
  
  // Use Mongoose to create and save the property
  const savedProperty = await Property.create(propertyData);
  
  revalidatePath('/', 'layout');
  redirect(`/properties/${savedProperty._id}`);
}
export default addProperty;