import bcryptjs from "bcryptjs";
import  connectDB  from "@/lib/database/mongodbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/services/mailer";
import { handleError } from "@/lib/utils";
import { toast } from "react-toastify";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, email, password } = reqBody;
    console.log(reqBody);
    //check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      console.log("user already exists")
      return NextResponse.json(
        { error: "User already exists", success: false,
          toast: toast.error("User already exists")
        },
        { status: 400 }
      );
    }
   
    //hash password 
    //10 times iterate and encrypt the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // save function from mongoose
    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email
    // await sendEmail({
    //   email,
    //   emailType: "VERIFY",
    //   userId: savedUser._id,
    // });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    handleError(error);
    return NextResponse.json({ error: error.message,
      toast: toast.error('Something went wrong', error.message)
     }, { status: 500 });
  }
}