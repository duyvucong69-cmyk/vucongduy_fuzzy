import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-12345";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email và mật khẩu là bắt buộc." },
        { status: 400 }
      );
    }

    // 1. Find user in database (async)
    const user = await findUserByEmail(email);
    
    // 2. If user does not exist, return error
    if (!user) {
      return NextResponse.json(
        { error: "Tài khoản chưa được đăng ký." },
        { status: 401 }
      );
    }

    // 3. Check password
    if (!user.password) {
      return NextResponse.json(
        { error: "Tài khoản chưa được thiết lập mật khẩu. Vui lòng đăng ký lại." },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Mật khẩu không chính xác." },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Đăng nhập thành công",
      token,
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
