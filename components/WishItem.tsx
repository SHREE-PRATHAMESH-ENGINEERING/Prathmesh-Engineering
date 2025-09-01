"use client";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { useSession } from "next-auth/react";

interface wishItemStateTrackers {
  isWishItemDeleted: boolean;
  setIsWishItemDeleted: any;
}

const WishItem = ({
  id,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
}: ProductInWishlist) => {
  const { data: session, status } = useSession();
  const { removeFromWishlist } = useWishlistStore();
  const router = useRouter();
  const [userId, setUserId] = useState<string>();

  const openProduct = (slug: string): void => {
    router.push(`/product/${slug}`);
  };

  const getUserByEmail = useCallback(async () => {
    if (session?.user?.email) {
      fetch(`/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserId(data?.id);
        });
    }
  }, [session?.user?.email, setUserId]);

  const deleteItemFromWishlist = async (productId: string) => {
    
    if (userId) {

      fetch(`/api/wishlist/${userId}/${productId}`, {method: "DELETE"}).then(
        (response) => {
          removeFromWishlist(productId);
          toast.success("Item removed from your wishlist");
        }
      );
    }else{
      toast.error("You need to be logged in to perform this action");
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, getUserByEmail]);

  return (
    <tr className="hover:bg-gray-100 cursor-pointer">
      <th
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {id}
      </th>
      <th>
        <div className="w-12 h-12 mx-auto" onClick={() => openProduct(slug)}>
          <Image
            src={image}
            width={200}
            height={200}
            className="w-auto h-auto"
            alt={title}
          />
        </div>
      </th>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {title}
      </td>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {stockAvailabillity ? (
          <span className="text-success">In stock</span>
        ) : (
          <span className="text-error">Out of stock</span>
        )}
      </td>
      <td>
        <button className="btn btn-xs bg-[#9cc0d0] text-white hover:text-[#9cc0d0] border border-[#9cc0d0] hover:bg-white text-sm">
          <FaHeartCrack />
          <span
            className="max-sm:hidden"
            onClick={() => deleteItemFromWishlist(id)}
          >
            remove from the wishlist
          </span>
        </button>
      </td>
    </tr>
  );
};

export default WishItem;

/**
 * Fetches user data by email and returns the user object.
 * @param email - The user's email address.
 * @returns A promise resolving to the user object or null if not found.
 */
async function getUserByEmail(email: string): Promise<{ id: string } | null> {
  try {
    const response = await fetch(`/api/users/email/${email}`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

