import { NextResponse, NextRequest } from "next/server";
import User from "../../../../models/userModel";
import bcryptjs from "bcryptjs";
import {connectDB} from "@/database/mongodbConfig";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const res = NextResponse.json({ message : "Login success", success:true   }, { status: 200 });
        res.cookies.set("token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            // sameSite: "strict",
            // maxAge: 60 * 60 * 24 * 1000,
            // path: "/",
        });
        return res;
            
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}