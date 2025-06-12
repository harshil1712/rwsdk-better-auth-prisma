"use server";

import { db } from "@/db";

// Type for useActionState
type ActionState = {
  success: boolean;
  error?: string;
  user?: any;
} | null;

export async function updateUserProfile(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    // Get form data
    const name = formData.get("name") as string;
    const image = formData.get("image") as string;
    const userId = formData.get("userId") as string;

    // Basic validation
    if (!userId) {
      return { success: false, error: "User ID is required" };
    }

    // Validate name
    if (name && name.length > 100) {
      return { success: false, error: "Name must be less than 100 characters" };
    }

    // Validate image URL
    if (image && image.trim()) {
      try {
        const imageUrl = new URL(image.trim());
        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          return {
            success: false,
            error: "Image URL must use HTTP or HTTPS protocol",
          };
        }
      } catch {
        return { success: false, error: "Please provide a valid image URL" };
      }
    }

    // Update user in database
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        name: name?.trim() || null,
        image: image?.trim() || null,
      },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update profile",
    };
  }
}
