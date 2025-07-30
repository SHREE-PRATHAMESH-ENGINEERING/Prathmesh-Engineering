import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import prisma from "@/utils/db";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: {
    user: { name: string; email: string; image: string };
  } | null = await getServerSession();

  if (!session) {
    redirect("/");
  }

  let email: string = await session?.user?.email;
  
  // Use Prisma directly instead of fetch since we're in a server component
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // redirecting user to the home page if not admin
  if (!user || user.role === "user") {
    redirect("/");
  }

  return <>{children}</>;
}
