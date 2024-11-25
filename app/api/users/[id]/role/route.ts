import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { newRole } = await request.json();

  console.log("newRole", newRole);

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(await params.id) },
    data: { role: newRole },
  });

  console.log("updatedUser", updatedUser);

  return NextResponse.json(updatedUser);
}
