import { NextResponse } from 'next/server';
import User from '../../../../models/userModel';
import bcryptjs from 'bcryptjs';
import { connectDB } from '@/lib/database/mongodbConfig';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(req: Request) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }

        // Check if the password matches
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }

        // Create the token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        // Sign the JWT token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '1d',
        });

        // Create the response with the cookie
        const res = NextResponse.json({ message: 'Login success', success: true }, { status: 200 });
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        return res;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
