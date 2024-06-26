import bcryptjs from "bcryptjs";
import connectDB from "@/lib/database/mongodbConfig";
import User from "@/lib/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { handleError } from "@/lib/utils";
import { toast } from "react-toastify";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    //check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist", success: false,
          toast: toast.error("User does not exist")
         },

        { status: 400 }
      );
    }
console.log("user exists")
    console.log("user exists")
    //compare password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid Password",
          success: false,
          toast: toast.error("Invalid Password"),
        },
        {
          status: 400,
        }
      );
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,

    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, toast: toast.error("Something went error") }, { status: 500 });
  }
}