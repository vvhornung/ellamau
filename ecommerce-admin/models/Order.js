import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
  line_items: Object, // Fixed the typo from "line_imtes" to "line_items"
  name: String,
  email: String,
  city: String,
  postalCode: String,
  streetAddress: String,
  country: String,
  phone: String, // Added phone field
  address: Object, // Added full address object
  paid: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = models?.Order || model("Order", OrderSchema);
