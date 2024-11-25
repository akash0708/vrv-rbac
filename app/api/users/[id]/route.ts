import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.user.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ message: "User deleted successfully" });
}
