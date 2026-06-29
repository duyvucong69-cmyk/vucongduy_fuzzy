import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { findUserById, updateUser, Address } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const user = findUserById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(user.addresses || []);

  } catch (error) {
    console.error("GET Addresses API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const user = findUserById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { name, phone, addressDetails, isDefault } = await req.json();

    if (!name || !phone || !addressDetails) {
      return NextResponse.json({ error: "Name, phone, and address details are required." }, { status: 400 });
    }

    const addresses = user.addresses || [];

    // If isDefault is true, reset all other addresses
    if (isDefault) {
      addresses.forEach(addr => addr.isDefault = false);
    }

    const newAddress: Address = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      phone,
      addressDetails,
      isDefault: isDefault || addresses.length === 0, // Make default if it's the first one
    };

    addresses.push(newAddress);
    updateUser(decoded.userId, { addresses });

    return NextResponse.json({
      message: "Address added successfully",
      address: newAddress,
      addresses,
    }, { status: 201 });

  } catch (error) {
    console.error("POST Address API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const user = findUserById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { id, name, phone, addressDetails, isDefault } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Address ID is required." }, { status: 400 });
    }

    const addresses = user.addresses || [];
    const addrIdx = addresses.findIndex(addr => addr.id === id);

    if (addrIdx === -1) {
      return NextResponse.json({ error: "Address not found." }, { status: 404 });
    }

    // Reset defaults if updating to default
    if (isDefault) {
      addresses.forEach(addr => addr.isDefault = false);
    }

    addresses[addrIdx] = {
      ...addresses[addrIdx],
      name: name !== undefined ? name : addresses[addrIdx].name,
      phone: phone !== undefined ? phone : addresses[addrIdx].phone,
      addressDetails: addressDetails !== undefined ? addressDetails : addresses[addrIdx].addressDetails,
      isDefault: isDefault !== undefined ? isDefault : addresses[addrIdx].isDefault,
    };

    // Safety check: ensure at least one address is default if there are addresses
    const hasDefault = addresses.some(addr => addr.isDefault);
    if (!hasDefault && addresses.length > 0) {
      addresses[0].isDefault = true;
    }

    updateUser(decoded.userId, { addresses });

    return NextResponse.json({
      message: "Address updated successfully",
      address: addresses[addrIdx],
      addresses,
    });

  } catch (error) {
    console.error("PUT Address API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const user = findUserById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Address ID is required." }, { status: 400 });
    }

    let addresses = user.addresses || [];
    const addrToDelete = addresses.find(addr => addr.id === id);

    if (!addrToDelete) {
      return NextResponse.json({ error: "Address not found." }, { status: 404 });
    }

    addresses = addresses.filter(addr => addr.id !== id);

    // If we deleted the default address, make the first remaining address the default
    if (addrToDelete.isDefault && addresses.length > 0) {
      addresses[0].isDefault = true;
    }

    updateUser(decoded.userId, { addresses });

    return NextResponse.json({
      message: "Address deleted successfully",
      addresses,
    });

  } catch (error) {
    console.error("DELETE Address API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
