import { NextResponse } from "next/server";
import { Order } from "@/app/models/Order";
import connectDB from "@/app/lib/mongoose";

export async function PUT(request) {
  try {
    await connectDB();

    // Get order ID from URL params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Update the order
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { paid: body.paid },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
