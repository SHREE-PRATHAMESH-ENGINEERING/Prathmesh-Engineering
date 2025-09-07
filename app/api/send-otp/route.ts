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

        const primaryColor = "#5068a4";
        const secondaryColor = "#eaf1fb";
        
        const html = `
            <div style="font-family:Arial,sans-serif;background:${secondaryColor};padding:32px;">
                <div style="max-width:400px;margin:auto;background:white;border-radius:12px;box-shadow:0 2px 8px #eee;padding:32px;">
                    <h2 style="color:${primaryColor};margin-bottom:8px;">Your OTP Code</h2>
                    <p style="font-size:16px;margin-bottom:16px;">Use the code below to verify your email address:</p>
                    <div style="font-size:32px;font-weight:bold;color:${primaryColor};letter-spacing:4px;margin-bottom:24px;">${otp}</div>
                    <div style="font-size:13px;color:#888;">This code is valid for a short time. If you did not request this, please ignore this email.</div>
                </div>
            </div>
        `;
        await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: "Your OTP Code",
                html,
        });

    return NextResponse.json({ success: true });
}