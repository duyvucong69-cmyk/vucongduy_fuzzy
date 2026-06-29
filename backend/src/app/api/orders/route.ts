import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readOrdersDbAsync, writeOrdersDbAsync, Order, OrderItem } from "@/lib/orders-db";
import { readProductsDbAsync, writeProductsDbAsync } from "@/lib/products-db";

export async function POST(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { items, address, paymentMethod, totalPrice } = await req.json();

    if (!items || items.length === 0 || !address || !paymentMethod) {
      return NextResponse.json({ error: "Missing required order details." }, { status: 400 });
    }

    const productsDb = await readProductsDbAsync();
    
    for (const item of items as OrderItem[]) {
      const prod = productsDb.products.find(p => p.id === item.productId);
      if (!prod) {
        return NextResponse.json({ error: `Product "${item.name}" not found.` }, { status: 400 });
      }
      if (prod.stock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for product "${item.name}". Available: ${prod.stock}` }, { status: 400 });
      }
    }

    for (const item of items as OrderItem[]) {
      const prod = productsDb.products.find(p => p.id === item.productId)!;
      prod.stock -= item.quantity;
    }

    await writeProductsDbAsync(productsDb);

    const orders = await readOrdersDbAsync();
    const newOrder: Order = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000).toString(),
      userId: decoded.userId,
      items,
      totalPrice,
      address,
      paymentMethod,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);
    await writeOrdersDbAsync(orders);

    return NextResponse.json({
      message: "Order placed successfully",
      order: newOrder
    }, { status: 201 });

  } catch (error) {
    console.error("POST Order API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const admin = searchParams.get("admin") === "true";

    const orders = await readOrdersDbAsync();

    if (id) {
      const order = orders.find(o => o.id === id);
      if (!order) {
        return NextResponse.json({ error: "Order not found." }, { status: 404 });
      }
      if (!admin && order.userId !== decoded.userId) {
        return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
      }
      return NextResponse.json(order);
    }

    if (admin) {
      orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return NextResponse.json(orders);
    }

    const userOrders = orders.filter(o => o.userId === decoded.userId);
    userOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(userOrders);

  } catch (error) {
    console.error("GET Orders API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ error: "Order ID and status are required." }, { status: 400 });
    }

    const validStatuses = ["Pending", "Preparing", "Shipping", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value." }, { status: 400 });
    }

    const orders = await readOrdersDbAsync();
    const orderIdx = orders.findIndex(o => o.id === orderId);

    if (orderIdx === -1) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    orders[orderIdx].status = status;
    await writeOrdersDbAsync(orders);

    return NextResponse.json({
      message: "Order status updated successfully",
      order: orders[orderIdx]
    });

  } catch (error) {
    console.error("PUT Order API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
