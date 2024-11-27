import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPERADMIN") {
    return NextResponse.json(
      { message: "Unauthorized: Only superadmin can update user role." },
      { status: 403 }
    );
  }

  const { newRole } = await request.json();

  // console.log("newRole", newRole);
  const userBeingUpdated = await prisma.user.findUnique({
    where: { id: parseInt((await params).id) },
  });

  if (!userBeingUpdated) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  if (userBeingUpdated.role === "SUPERADMIN") {
    return NextResponse.json(
      { message: "Cannot update the role of a SUPERADMIN." },
      { status: 403 }
    );
  }

  const updatedUser = await prisma.user.update({
    where: { id: parseInt((await params).id) },
    data: { role: newRole },
  });

  // console.log("updatedUser", updatedUser);

  return NextResponse.json(updatedUser);
}
