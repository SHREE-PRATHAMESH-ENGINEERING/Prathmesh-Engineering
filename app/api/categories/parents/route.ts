import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const parentCategories = await (prisma.category as any).findMany({
      where: {
        parentId: null
      },
      include: {
        subcategories: {
          include: {
            subcategories: true // Include nested subcategories if any
          }
        }
      },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(parentCategories);
  } catch (error) {
    console.error('Error fetching parent categories:', error);
    return NextResponse.json({ error: 'Failed to fetch parent categories' }, { status: 500 });
  }
}
