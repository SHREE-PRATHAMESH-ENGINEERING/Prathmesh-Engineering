import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { setOtp } from '@/lib/otpStore';

export async function POST(request: Request) {
    const { email } = await request.json();
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await setOtp(email, otp);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}`,
    });

    return NextResponse.json({ success: true });
}