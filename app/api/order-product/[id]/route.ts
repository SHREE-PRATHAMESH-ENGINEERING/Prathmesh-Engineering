import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    
    const orderProducts = await prisma.customer_order_product.findMany({
      where: { customerOrderId: orderId },
      include: {
        product: true
      }
    });

    return NextResponse.json(orderProducts);
  } catch (error) {
    console.error('Error fetching order products:', error);
    return NextResponse.json({ error: 'Failed to fetch order products' }, { status: 500 });
  }
}

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    
    await prisma.customer_order_product.deleteMany({
      where: { customerOrderId: orderId }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting order products:', error);
    return NextResponse.json({ error: 'Failed to delete order products' }, { status: 500 });
  }
}
