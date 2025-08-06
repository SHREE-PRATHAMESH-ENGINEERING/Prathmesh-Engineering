import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const mode = searchParams.get('mode');
    // For price filtering
    const priceMax = searchParams.get('filters[price][$lte]');
    const priceMin = searchParams.get('filters[price][$gte]');
    const category = searchParams.get('filters[categoryId][$eq]');
    const categoryId = searchParams.get('categoryId');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 12;

    let whereClause: any = {};

    // Build filter conditions
    if (priceMax || priceMin) {
      whereClause.price = {};
      if (priceMax) whereClause.price.lte = parseFloat(priceMax);
      if (priceMin) whereClause.price.gte = parseFloat(priceMin);
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    } else if (category) {
      whereClause.categoryId = category;
    }

    let products;
    
    if (limit) {
      // Get limited products for featured section
      products = await (prisma.product as any).findMany({
        take: parseInt(limit),
        orderBy: { id: 'desc' },
        include: {
          category: {
            include: {
              parent: true
            }
          }
        }
      });
    } else if (mode === 'admin') {
      // Get all products for admin
      products = await (prisma.product as any).findMany({
        include: {
          category: {
            include: {
              parent: true
            }
          }
        },
        orderBy: { id: 'desc' }
      });
    } else {
      // Get paginated products with filters
      const skip = (page - 1) * pageSize;
      
      products = await (prisma.product as any).findMany({
        where: whereClause,
        take: pageSize,
        skip: skip,
        include: {
          category: {
            include: {
              parent: true
            }
          }
        },
        orderBy: { id: 'desc' }
      });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.categoryId) {
      return NextResponse.json(
        { error: 'Title and Category ID are required' }, 
        { status: 400 }
      );
    }

    // Generate a unique ID for the product
    const productId = `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const product = await prisma.product.create({
      data: {
        id: productId,
        title: body.title,
        description: body.description || '',
        price: parseInt(body.price) || 0,
        categoryId: body.categoryId,
        slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-'),
        mainImage: body.mainImage || '',
        rating: body.rating ? parseInt(body.rating) : 0,
        manufacturer: body.manufacturer || '',
        inStock: body.inStock ? parseInt(body.inStock) : 1
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    
    // Check if it's a unique constraint error
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A product with this slug already exists' }, 
        { status: 409 }
      );
    }
    
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
