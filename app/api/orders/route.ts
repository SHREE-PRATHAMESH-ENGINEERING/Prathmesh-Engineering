import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/lib/sendOrderConfirmationEmail";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const where = userId ? { userId } : undefined;
    const orders = await prisma.customer_order.findMany({
      where,
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
        total: parseFloat(body.total),
        userId: body.userId || null
      }
    });

    // Fetch order with products for email
    let orderWithProducts = null;
    try {
      orderWithProducts = await prisma.customer_order.findUnique({
        where: { id: order.id },
        include: {
          customer_order_product: {
            include: {
              product: true
            }
          }
        }
      });
      if (orderWithProducts) {
        const orderForEmail = {
          ...orderWithProducts,
          dateTime: orderWithProducts.dateTime ? orderWithProducts.dateTime.toISOString() : undefined,
          orderNotice: orderWithProducts.orderNotice ?? undefined,
        };
        await sendOrderConfirmationEmail(orderForEmail);
      }
    } catch (err) {
      console.error('Failed to send confirmation email:', err);
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
