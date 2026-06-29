import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { findUserById, updateUser } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // 1. Verify token
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized. Invalid or expired token." }, { status: 401 });
    }

    // 2. Find user
    const user = findUserById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Remove password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);

  } catch (error) {
    console.error("GET Profile API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // 1. Verify token
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized. Invalid or expired token." }, { status: 401 });
    }

    const { fullName, phone, birthday, avatar } = await req.json();

    // 2. Validation
    if (fullName !== undefined && !fullName.trim()) {
      return NextResponse.json({ error: "Full name cannot be empty." }, { status: 400 });
    }

    // 3. Update fields
    const updatedFields: any = {};
    if (fullName !== undefined) updatedFields.fullName = fullName;
    if (phone !== undefined) updatedFields.phone = phone;
    if (birthday !== undefined) updatedFields.birthday = birthday;
    if (avatar !== undefined) updatedFields.avatar = avatar;

    const updatedUser = updateUser(decoded.userId, updatedFields);
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Remove password
    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: "Profile updated successfully",
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("PUT Profile API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
