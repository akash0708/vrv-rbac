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
