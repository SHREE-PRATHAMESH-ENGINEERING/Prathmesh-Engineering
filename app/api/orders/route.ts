import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await prisma.customer_order.findMany({
      include: {
        customer_order_product: {
          include: {
            product: true
          }
        }
      },
      orderBy: { dateTime: 'desc' }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate a unique ID for the order
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const order = await prisma.customer_order.create({
      data: {
        id: orderId,
        name: body.name,
        lastname: body.lastname,
        phone: body.phone,
        email: body.email,
        company: body.company || '',
        adress: body.adress,
        apartment: body.apartment || '',
        postalCode: body.postalCode,
        city: body.city,
        country: body.country,
        orderNotice: body.orderNotice || '',
        status: body.status || 'pending',
        total: parseInt(body.total)
      }
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
