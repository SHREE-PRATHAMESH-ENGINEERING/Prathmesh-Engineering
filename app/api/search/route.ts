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
            slug: {
              contains: query
            }
          },
          {
            manufacturer: {
              contains: query
            }
          },
          {
            category: {
              name: {
                contains: query
              }
            }
          },
          {
            category: {
              id: {
                contains: query
              }
            }
          }
        ]
      },
      include: {
        category: true
      },
      orderBy: [
        {
          title: 'asc'
        }
      ],
      take: 50 
    });

    const scoredProducts = products.map(product => {
      let score = 0;
      const queryLower = query.toLowerCase();
      const titleLower = product.title.toLowerCase();
      const descLower = (product.description || '').toLowerCase();
      const slugLower = product.slug.toLowerCase();
      const manufacturerLower = (product.manufacturer || '').toLowerCase();
      const categoryLower = (product.category?.name || '').toLowerCase();

      // Exact matches get highest scores
      if (titleLower === queryLower) score += 100;
      else if (titleLower.includes(queryLower)) score += 50;
      
      if (slugLower === queryLower) score += 90;
      else if (slugLower.includes(queryLower)) score += 40;
      
      if (manufacturerLower === queryLower) score += 80;
      else if (manufacturerLower.includes(queryLower)) score += 35;
      
      if (categoryLower === queryLower) score += 70;
      else if (categoryLower.includes(queryLower)) score += 30;
      
      if (descLower.includes(queryLower)) score += 20;
      
      if (titleLower.startsWith(queryLower)) score += 25;
      if (manufacturerLower.startsWith(queryLower)) score += 15;
      if (categoryLower.startsWith(queryLower)) score += 15;
      
      return { ...product, searchScore: score };
    });

    const sortedProducts = scoredProducts
      .sort((a, b) => b.searchScore - a.searchScore)
      .map(({ searchScore, ...product }) => product);

    return NextResponse.json(sortedProducts);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}
