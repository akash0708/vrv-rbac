import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "SUPERADMIN") {
    return NextResponse.json(
      { message: "Unauthorized: Only superadmin can block users." },
      { status: 403 }
    );
  }

  const { isBlocked } = await request.json();

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: { isBlocked },
  });

  return NextResponse.json(updatedUser);
}
