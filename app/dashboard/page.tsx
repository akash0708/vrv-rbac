// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Profile from "@/components/Profile";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
      <p className="text-gray-600">
        You are logged in as {session.user?.email}
      </p> */}

      <Profile
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }}
      />
    </div>
  );
}
