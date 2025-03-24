import { NextResponse } from "next/server";
import { Order } from "@/app/models/Order";
import connectDB from "@/app/lib/mongoose";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Format line items to ensure productId is properly stored
    const formattedLineItems = Array.isArray(body.line_items)
      ? body.line_items.map((item) => ({
          productId: item.productId || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant || item.selectedVariants || {},
          image: item.image,
        }))
      : [];

    // Calculate order total
    const total = formattedLineItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Ensure address data is properly formatted
    const address = body.address || {};

    console.log("Address data received by API:", address);

    // Create order with the structured data
    const order = await Order.create({
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      address: {
        line1: address.line1 || "",
        line2: address.line2 || "",
        city: address.city || "",
        state: address.state || "",
        postal_code: address.postal_code || "",
        country: address.country || "",
      },
      line_items: formattedLineItems,
      total: total,
      paid: body.paid || false,
    });

    return NextResponse.json({
      success: true,
      orderId: order._id.toString(),
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
