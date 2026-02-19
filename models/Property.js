import { Schema, model, models } from "mongoose";

const LocationSchema = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String }
}, { _id: false });

const RatesSchema = new Schema({
  nightly: { type: Number },
  weekly: { type: Number },
  monthly: { type: Number }
}, { _id: false });

const SellerInfoSchema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String }
}, { _id: false });

const PropertySchema = new Schema ({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
    name: {  type: String, required: true  },
    type: {  type: String, required: true  },
    description: {  type: String },
    location: LocationSchema,
    beds: {  type: Number, required: true  },
    baths: {  type: Number, required: true  },
    square_feet: {  type: Number, required: true  },
    amenities: [{ type: String }],
    rates: RatesSchema,
    seller_info: SellerInfoSchema,
    images: [{ type: String }],
    is_featured: { type: Boolean, default: false}
},
    
{    timestamps: true });

const Property = models.Property || model('Property', PropertySchema);
export default Property;