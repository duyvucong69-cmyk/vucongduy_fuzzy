import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readDb, writeDb, User } from "@/lib/db";
import bcrypt from "bcryptjs";

// Helper to verify admin authority (in test mode, we accept any valid token)
function checkAdminAccess(req: NextRequest) {
  const decoded = verifyToken(req);
  return decoded !== null;
}

export async function GET(req: NextRequest) {
  try {
    if (!checkAdminAccess(req)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const users = readDb();
    // Remove passwords for safety
    const usersWithoutPasswords = users.map(({ password, ...u }) => u);

    return NextResponse.json(usersWithoutPasswords);

  } catch (error) {
    console.error("GET Admin Users error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!checkAdminAccess(req)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { email, password, fullName, phone, birthday, avatar } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: "Email, password, and full name are required." }, { status: 400 });
    }

    const users = readDb();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return NextResponse.json({ error: "Email is already registered." }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: User = {
      id: "usr-" + Math.random().toString(36).substring(2, 9),
      email,
      password: hashedPassword,
      fullName,
      phone: phone || "",
      birthday: birthday || "",
      avatar: avatar || "images/icons/profile1.png",
      addresses: []
    };

    users.push(newUser);
    writeDb(users);

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json({
      message: "Customer created successfully",
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error) {
    console.error("POST Admin Users error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    if (!checkAdminAccess(req)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id, fullName, phone, birthday, avatar, password } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    const users = readDb();
    const idx = users.findIndex(u => u.id === id);

    if (idx === -1) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    const updatedUser: User = {
      ...users[idx],
      fullName: fullName !== undefined ? fullName : users[idx].fullName,
      phone: phone !== undefined ? phone : users[idx].phone,
      birthday: birthday !== undefined ? birthday : users[idx].birthday,
      avatar: avatar !== undefined ? avatar : users[idx].avatar,
    };

    // If new password is provided, hash and update it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedUser.password = await bcrypt.hash(password, salt);
    }

    users[idx] = updatedUser;
    writeDb(users);

    const { password: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json({
      message: "Customer updated successfully",
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("PUT Admin Users error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    if (!checkAdminAccess(req)) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required." }, { status: 400 });
    }

    const users = readDb();
    const originalLength = users.length;
    const filteredUsers = users.filter(u => u.id !== id);

    if (filteredUsers.length === originalLength) {
      return NextResponse.json({ error: "Customer not found." }, { status: 404 });
    }

    writeDb(filteredUsers);

    return NextResponse.json({
      message: "Customer deleted successfully"
    });

  } catch (error) {
    console.error("DELETE Admin Users error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
