import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all registrations with user details
    const registrations = await prisma.registration.findMany({
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

    // Calculate total count
    const totalCount = registrations.length;

    // Calculate per-event counts
    const perEventCounts = await prisma.registration.groupBy({
      by: ["eventName"],
      _count: {
        eventName: true,
      },
    });

    return NextResponse.json({
      totalCount,
      perEventCounts,
      registrations,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch registration data" },
      { status: 500 }
    );
  }
}
