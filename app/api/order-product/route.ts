import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate a unique ID for the order product
    const orderProductId = `order_prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const orderProduct = await prisma.customer_order_product.create({
      data: {
        id: orderProductId,
        customerOrderId: body.orderId,
        productId: body.productId,
        quantity: parseInt(body.quantity)
      }
    });

    return NextResponse.json(orderProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating order product:', error);
    return NextResponse.json({ error: 'Failed to create order product' }, { status: 500 });
  }
}
