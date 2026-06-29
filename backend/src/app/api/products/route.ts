import { NextRequest, NextResponse } from "next/server";
import { readProductsDb, writeProductsDb, Product } from "@/lib/products-db";
import { verifyToken } from "@/lib/auth";

// Public GET with advanced query filters, Admin POST/PUT/DELETE
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Check if fetching a single product by ID
    const id = searchParams.get("id");
    if (id) {
      const db = readProductsDb();
      const product = db.products.find(p => p.id === id);
      if (!product) {
        return NextResponse.json({ error: "Product not found." }, { status: 404 });
      }
      return NextResponse.json(product);
    }
    
    // Parse pagination parameters
    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);
    
    // Parse filters
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");
    const color = searchParams.get("color");
    const size = searchParams.get("size");
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "999999");
    const sort = searchParams.get("sort"); // price_asc, price_desc, rating, newest

    const db = readProductsDb();
    let filteredProducts = [...db.products];

    // Apply category filter
    if (categoryId) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === categoryId);
    }

    // Apply search filter
    if (search) {
      const query = search.toLowerCase().trim();
      filteredProducts = filteredProducts.filter(
        p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }

    // Apply color filter
    if (color) {
      filteredProducts = filteredProducts.filter(
        p => p.colors.some(c => c.toLowerCase() === color.toLowerCase())
      );
    }

    // Apply size filter
    if (size) {
      filteredProducts = filteredProducts.filter(
        p => p.sizes.some(s => s.toLowerCase() === size.toLowerCase())
      );
    }

    // Apply price range filter
    filteredProducts = filteredProducts.filter(
      p => p.price >= minPrice && p.price <= maxPrice
    );

    // Apply sorting
    if (sort) {
      switch (sort) {
        case "price_asc":
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "price_desc":
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
      }
    }

    const total = filteredProducts.length;

    // Apply pagination
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        total,
        offset,
        limit,
        hasMore: offset + limit < total,
      }
    });

  } catch (error) {
    console.error("GET Products API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { name, description, price, stock, categoryId, images, colors, sizes, rating } = await req.json();

    if (!name || !price || !categoryId || !images || images.length === 0) {
      return NextResponse.json({ error: "Name, price, categoryId, and at least one image are required." }, { status: 400 });
    }

    const db = readProductsDb();
    const newProduct: Product = {
      id: "prod-" + Math.random().toString(36).substring(2, 9),
      name,
      description: description || "",
      price: parseFloat(price),
      stock: parseInt(stock || "0", 10),
      categoryId,
      images,
      colors: colors || [],
      sizes: sizes || [],
      rating: parseFloat(rating || "4.5"),
      reviewsCount: 0,
      isNew: true,
    };

    db.products.push(newProduct);
    writeProductsDb(db);

    return NextResponse.json({
      message: "Product created successfully",
      product: newProduct,
    }, { status: 201 });

  } catch (error) {
    console.error("POST Product API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id, name, description, price, stock, categoryId, images, colors, sizes, rating } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const db = readProductsDb();
    const prodIdx = db.products.findIndex(p => p.id === id);

    if (prodIdx === -1) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    db.products[prodIdx] = {
      ...db.products[prodIdx],
      name: name !== undefined ? name : db.products[prodIdx].name,
      description: description !== undefined ? description : db.products[prodIdx].description,
      price: price !== undefined ? parseFloat(price) : db.products[prodIdx].price,
      stock: stock !== undefined ? parseInt(stock, 10) : db.products[prodIdx].stock,
      categoryId: categoryId !== undefined ? categoryId : db.products[prodIdx].categoryId,
      images: images !== undefined ? images : db.products[prodIdx].images,
      colors: colors !== undefined ? colors : db.products[prodIdx].colors,
      sizes: sizes !== undefined ? sizes : db.products[prodIdx].sizes,
      rating: rating !== undefined ? parseFloat(rating) : db.products[prodIdx].rating,
    };

    writeProductsDb(db);

    return NextResponse.json({
      message: "Product updated successfully",
      product: db.products[prodIdx],
    });

  } catch (error) {
    console.error("PUT Product API error:", error);
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
      return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
    }

    const db = readProductsDb();
    const originalLength = db.products.length;
    db.products = db.products.filter(p => p.id !== id);

    if (db.products.length === originalLength) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    writeProductsDb(db);

    return NextResponse.json({
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("DELETE Product API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
