import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/database/mongodbConfig";
import User from "@/models/userModel";

connectDB();

const getTokenData = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    if (!token) {
      throw new Error('Token not found');
    }
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return data.id;
  } catch (error: any) {
    throw new Error('Invalid or expired token');
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getTokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "User found",
      data: user,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
