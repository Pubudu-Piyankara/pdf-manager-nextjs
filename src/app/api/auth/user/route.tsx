"use server";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database/mongodbConfig";
import User from "@/models/userModel";
import { handleError } from "@/lib/utils";
import { getDataFromToken } from "@/services/getDataFromToken";

// Ensure the database connection is established
connectDB();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
        message:"User found",
        data:user
    })
  } catch (error: any) {
    handleError(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
