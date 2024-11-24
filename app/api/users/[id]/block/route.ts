// /app/api/users/[id]/block/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { isBlocked } = await request.json();

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: { isBlocked },
  });

  return NextResponse.json(updatedUser);
}
