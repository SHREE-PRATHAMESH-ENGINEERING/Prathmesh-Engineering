import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; productId: string } }
) {
  try {
    const { userId, productId } = params;
    
    const wishlistItem = await prisma.wishlist.findFirst({
      where: {
        userId,
        productId
      },
      include: {
        product: true
      }
    });

    if (!wishlistItem) {
      return NextResponse.json([]);
    }

    return NextResponse.json([wishlistItem]);
  } catch (error) {
    console.error('Error checking wishlist item:', error);
    return NextResponse.json({ error: 'Failed to check wishlist item' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string; productId: string } }
) {
  try {
    const { userId, productId } = params;
    
    await prisma.wishlist.deleteMany({
      where: {
        userId,
        productId
      }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return NextResponse.json({ error: 'Failed to remove from wishlist' }, { status: 500 });
  }
}
