import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
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
  
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || user.role === "user") {
    redirect("/");
  }

  return <>{children}</>;
}
