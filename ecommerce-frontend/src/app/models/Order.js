import { model, models, Schema } from "mongoose";

const AddressSchema = new Schema(
  {
    line1: {
      type: String,
      required: true,
    },
    line2: String,
    city: {
      type: String,
      required: true,
    },
    state: String,
    postal_code: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

// Define a proper line item schema to track products
const LineItemSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    name: String,
    price: Number,
    quantity: Number,
    variant: {
      color: String,
      size: String,
    },
    image: String,
  },
  { _id: false }
);

const OrderSchema = new Schema({
  line_items: [LineItemSchema], // Change to array of LineItemSchema
  name: String,
  email: String,
  phone: String,
  address: AddressSchema,
  paid: {
    type: Boolean,
    default: false,
  },
  total: Number, // Add total amount
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = models?.Order || model("Order", OrderSchema);
