import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    console.log("Fetching orders for email:", email);

    const orders = await prisma.customer_order.findMany({
      where: {
        email: email
      },
      include: {
        customer_order_product: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                mainImage: true,
                slug: true,
                price: true
              }
            }
          }
        }
      },
      orderBy: { dateTime: 'desc' }
    });

    console.log(`Found ${orders.length} orders for email:`, email);

    const transformedOrders = orders.map(order => ({
      id: order.id,
      totalAmount: order.total,
      status: order.status,
      createdAt: order.dateTime ? order.dateTime.toISOString() : new Date().toISOString(),
      orderItems: order.customer_order_product.map(item => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
        product: {
          id: item.product.id,
          title: item.product.title,
          mainImage: item.product.mainImage,
          slug: item.product.slug
        }
      })),
      shippingAddress: {
        fullName: `${order.name} ${order.lastname || ''}`.trim(),
        address: order.adress,
        city: order.city,
        postalCode: order.postalCode,
        country: order.country
      }
    }));

    return NextResponse.json(transformedOrders);
  } catch (error) {
    console.error('Error fetching orders by email:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
