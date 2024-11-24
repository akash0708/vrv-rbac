import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT: Update registration status
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    // Ensure params.id is properly extracted
    const id = await context.params?.id;

    if (!id) {
      return NextResponse.json(
        { error: "Registration ID is required" },
        { status: 400 }
      );
    }

    // Parse the request body
    const body = await req.json();
    const { status } = body;

    // Validate the status value
    if (!["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Update the registration in the database
    const updatedRegistration = await prisma.registration.update({
      where: { id: Number(id) },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    console.log(updatedRegistration);
    return NextResponse.json(updatedRegistration);
  } catch (error) {
    console.error("Error updating registration:", error);
    return NextResponse.json(
      { error: "Failed to update registration" },
      { status: 500 }
    );
  }
}
