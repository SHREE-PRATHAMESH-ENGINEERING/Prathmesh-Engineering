export const dynamic = "force-dynamic";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    
    if (!query.trim()) {
      return NextResponse.json([]);
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query
            }
          },
          {
            description: {
              contains: query
            }
          },
          {
            manufacturer: {
              contains: query
            }
          }
        ]
      },
      include: {
        category: true
      },
      take: 20
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}
