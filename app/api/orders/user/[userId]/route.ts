import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
  const { userId } = params;
  console.log("[API] Fetching orders for userId:", userId);

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true }
    });

    if (!user) {
      console.log("[API] User not found for userId:", userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const orders = await prisma.customer_order.findMany({
      where: {
        userId: userId
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

  console.log(`[API] Found ${orders.length} orders for user:`, user.email);

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
    console.error('Error fetching user orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
