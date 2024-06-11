import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {connectDB} from "@/lib/database/mongodbConfig";
import User from "@/models/userModel";


connectDB();

const gettokenData = (request : NextRequest)=>{
    try {
        const token = request.cookies.get('token')?.value || '';
        const data : any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return data.id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}




export async function GET(request: NextRequest) {
  try {
    const userId = await gettokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
