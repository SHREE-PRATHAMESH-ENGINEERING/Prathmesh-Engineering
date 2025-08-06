import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Use type assertion until database migration is complete
    const category = await (prisma.category as any).findUnique({
      where: { id },
      include: {
        parent: true,
        subcategories: true
      }
    });

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Validate parent category exists if parentId is provided
    if (body.parentId && body.parentId !== id) {
      const parentExists = await (prisma.category as any).findUnique({
        where: { id: body.parentId }
      });
      
      if (!parentExists) {
        return NextResponse.json(
          { error: 'Parent category not found' }, 
          { status: 400 }
        );
      }
      
      // Prevent circular reference (category can't be parent of itself)
      if (body.parentId === id) {
        return NextResponse.json(
          { error: 'Category cannot be parent of itself' }, 
          { status: 400 }
        );
      }
    }
    
    const category = await (prisma.category as any).update({
      where: { id },
      data: {
        name: body.name,
        ...(body.parentId !== undefined && { parentId: body.parentId || null })
      },
      include: {
        parent: true,
        subcategories: true
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    await prisma.category.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
