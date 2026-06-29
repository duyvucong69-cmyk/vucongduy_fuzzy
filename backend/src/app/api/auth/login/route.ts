import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { findUserByEmail, readDb, writeDb, User } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-12345";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // 1. Find user in local JSON database
    let user = findUserByEmail(email);
    
    // 2. Since this is a test version, if user does not exist, automatically register them!
    if (!user) {
      const newUser: User = {
        id: "usr-" + Math.random().toString(36).substring(2, 9),
        email,
        fullName: email.split('@')[0].toUpperCase(), // Default name from email prefix
        phone: "0987654321",
        birthday: "1995-10-15",
        avatar: "images/icons/profile1.png",
        addresses: [
          {
            id: "addr-def",
            name: "Home",
            phone: "0987654321",
            addressDetails: "790 Hyde Park Rd, Ontario, Canada",
            isDefault: true
          }
        ],
      };
      
      const users = readDb();
      users.push(newUser);
      writeDb(users);
      
      user = newUser;
    }

    // 3. Bypass password hashing check for testing - accept ANY password!
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "30d", // Extended expiration for test environment
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Test Login successful (Any credentials accepted)",
      token,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
