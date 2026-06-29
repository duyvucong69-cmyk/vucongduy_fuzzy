import { NextRequest, NextResponse } from "next/server";
import { readProductsDbAsync, writeProductsDbAsync, Category } from "@/lib/products-db";
import { verifyToken } from "@/lib/auth";

// Public GET, Admin POST/PUT/DELETE
export async function GET() {
  try {
    const db = await readProductsDbAsync();
    return NextResponse.json(db.categories || []);
  } catch (error) {
    console.error("GET Categories API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { name, icon } = await req.json();
    if (!name || !icon) {
      return NextResponse.json({ error: "Name and icon are required." }, { status: 400 });
    }

    const db = await readProductsDbAsync();
    const newCategory: Category = {
      id: "cat-" + Math.random().toString(36).substring(2, 9),
      name,
      icon,
    };

    db.categories.push(newCategory);
    await writeProductsDbAsync(db);

    return NextResponse.json({
      message: "Category created successfully",
      category: newCategory,
      categories: db.categories,
    }, { status: 201 });

  } catch (error) {
    console.error("POST Category API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id, name, icon } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Category ID is required." }, { status: 400 });
    }

    const db = await readProductsDbAsync();
    const catIdx = db.categories.findIndex(c => c.id === id);

    if (catIdx === -1) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    db.categories[catIdx] = {
      ...db.categories[catIdx],
      name: name !== undefined ? name : db.categories[catIdx].name,
      icon: icon !== undefined ? icon : db.categories[catIdx].icon,
    };

    await writeProductsDbAsync(db);

    return NextResponse.json({
      message: "Category updated successfully",
      category: db.categories[catIdx],
      categories: db.categories,
    });

  } catch (error) {
    console.error("PUT Category API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Category ID is required." }, { status: 400 });
    }

    const db = await readProductsDbAsync();
    const originalLength = db.categories.length;
    db.categories = db.categories.filter(c => c.id !== id);

    if (db.categories.length === originalLength) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    await writeProductsDbAsync(db);

    return NextResponse.json({
      message: "Category deleted successfully",
      categories: db.categories,
    });

  } catch (error) {
    console.error("DELETE Category API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
