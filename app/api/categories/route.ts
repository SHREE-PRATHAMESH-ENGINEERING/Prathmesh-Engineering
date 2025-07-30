import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.name) {
      return NextResponse.json(
        { error: 'Category name is required' }, 
        { status: 400 }
      );
    }

    // Generate a unique ID for the category
    const categoryId = `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const category = await prisma.category.create({
      data: {
        id: categoryId,
        name: body.name
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    
    // Check if it's a unique constraint error
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A category with this name already exists' }, 
        { status: 409 }
      );
    }
    
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
