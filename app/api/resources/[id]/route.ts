import { NextRequest, NextResponse } from "next/server";
import { deleteResource, updateResource } from "@/lib/storage";
import { verifyAuth } from "@/lib/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  // Require authentication for deleting resources
  const isAuthenticated = await verifyAuth(request);
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await Promise.resolve(params);
    
    // Validate ID format
    if (!id || typeof id !== "string" || id.length > 100) {
      return NextResponse.json(
        { error: "Invalid resource ID" },
        { status: 400 }
      );
    }

    await deleteResource(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  // Require authentication for updating resources
  const isAuthenticated = await verifyAuth(request);
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await Promise.resolve(params);
    
    // Validate ID format
    if (!id || typeof id !== "string" || id.length > 100) {
      return NextResponse.json(
        { error: "Invalid resource ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Sanitize update data
    const updates: any = {};
    if (body.name !== undefined) {
      updates.name = String(body.name).trim().slice(0, 200);
    }
    if (body.url !== undefined) {
      let validUrl = String(body.url).trim();
      if (!validUrl.startsWith("http")) {
        validUrl = "https://" + validUrl;
      }
      try {
        new URL(validUrl);
        if (validUrl.length > 2048) {
          return NextResponse.json(
            { error: "URL is too long" },
            { status: 400 }
          );
        }
        updates.url = validUrl;
      } catch {
        return NextResponse.json(
          { error: "Invalid URL format" },
          { status: 400 }
        );
      }
    }
    if (body.category !== undefined) {
      updates.category = String(body.category).trim().slice(0, 50);
    }

    await updateResource(id, updates);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating resource:", error);
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 }
    );
  }
}
