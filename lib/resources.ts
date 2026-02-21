import { Resource } from "./types";

const API_BASE = "/api/resources";

export async function getResources(): Promise<Resource[]> {
  try {
    const response = await fetch(API_BASE, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch resources");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
}

export async function addResource(resource: Omit<Resource, "id" | "createdAt">): Promise<Resource> {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
      body: JSON.stringify(resource),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to add resource");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding resource:", error);
    throw error;
  }
}

export async function deleteResource(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      credentials: "include", // Include cookies for authentication
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to delete resource");
    }
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw error;
  }
}

export async function updateResource(id: string, data: Partial<Resource>): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for authentication
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to update resource");
    }
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
}
