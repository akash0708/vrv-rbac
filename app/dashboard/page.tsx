// /app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
      <p className="text-gray-600">
        You are logged in as {session.user?.email}
      </p>
      <LogoutButton />
    </div>
  );
}
