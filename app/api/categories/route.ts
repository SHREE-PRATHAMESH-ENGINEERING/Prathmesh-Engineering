import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await (prisma.category as any).findMany({
      include: {
        subcategories: {
          include: {
            subcategories: true // Include nested subcategories if any
          }
        },
        parent: true
      },
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

    // Validate parent category exists if parentId is provided
    if (body.parentId) {
      const parentExists = await prisma.category.findUnique({
        where: { id: body.parentId }
      });
      
      if (!parentExists) {
        return NextResponse.json(
          { error: 'Parent category not found' }, 
          { status: 400 }
        );
      }
    }

    // Generate a unique ID for the category
    const categoryId = `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const category = await (prisma.category as any).create({
      data: {
        id: categoryId,
        name: body.name,
        parentId: body.parentId || null
      },
      include: {
        parent: true,
        subcategories: true
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
