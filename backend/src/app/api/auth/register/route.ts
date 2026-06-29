import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, readDb, writeDb, User } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-12345";

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName, phone, birthday, avatar } = await req.json();

    // 1. Basic validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Email, password, and full name are required." },
        { status: 400 }
      );
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // 3. Password strength validation
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // 4. Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered." },
        { status: 400 }
      );
    }

    // 5. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      password: hashedPassword,
      fullName,
      phone: phone || "",
      birthday: birthday || "",
      avatar: avatar || "",
      addresses: [],
    };

    const users = readDb();
    users.push(newUser);
    writeDb(users);

    // 7. Generate JWT
    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      message: "Registration successful",
      token,
      user: userWithoutPassword,
    }, { status: 201 });

  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
