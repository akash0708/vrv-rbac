import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPERADMIN") {
    return NextResponse.json(
      { message: "Unauthorized: Only superadmin can delete users." },
      { status: 403 }
    );
  }

  const userToDelete = await prisma.user.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (userToDelete?.role === "SUPERADMIN") {
    return NextResponse.json(
      { message: "You cannot delete a superadmin." },
      { status: 403 }
    );
  }

  await prisma.user.delete({
    where: { id: parseInt((await params).id) },
  });

  return NextResponse.json({ message: "User deleted successfully" });
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const userRegistrations = await prisma.registration.findMany({
      where: { userId: parseInt((await params).id) },
      select: {
        id: true,
        eventName: true,
        status: true,
      },
    });

    return NextResponse.json(userRegistrations);
  } catch (error) {
    console.error("Error fetching user registrations:", error);
    return NextResponse.json(
      { error: "Failed to fetch user registrations" },
      { status: 500 }
    );
  }
}
