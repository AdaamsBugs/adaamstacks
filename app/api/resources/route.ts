import { NextRequest, NextResponse } from "next/server";
import { getResources, addResource } from "@/lib/storage";
import { verifyAuth } from "@/lib/auth";
import { Resource } from "@/lib/types";

export async function GET() {
  try {
    const resources = await getResources();
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Require authentication for adding resources
  const isAuthenticated = await verifyAuth(request);
  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { name, url, category } = body;

    // Input validation and sanitization
    if (!name || !url) {
      return NextResponse.json(
        { error: "Name and URL are required" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim().slice(0, 200); // Max 200 chars
    const sanitizedCategory = category ? category.trim().slice(0, 50) : "";

    if (!sanitizedName) {
      return NextResponse.json(
        { error: "Name cannot be empty" },
        { status: 400 }
      );
    }

    // Validate URL
    let validUrl = url.trim();
    if (!validUrl.startsWith("http")) {
      validUrl = "https://" + validUrl;
    }
    
    try {
      new URL(validUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Prevent extremely long URLs
    if (validUrl.length > 2048) {
      return NextResponse.json(
        { error: "URL is too long" },
        { status: 400 }
      );
    }

    const resource = await addResource({
      name: sanitizedName,
      url: validUrl,
      category: sanitizedCategory,
    });

    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    console.error("Error adding resource:", error);
    return NextResponse.json(
      { error: "Failed to add resource" },
      { status: 500 }
    );
  }
}
