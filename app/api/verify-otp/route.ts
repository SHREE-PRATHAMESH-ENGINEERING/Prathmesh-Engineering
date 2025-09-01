import { NextResponse } from "next/server";
import { getOtp, deleteOtp } from "@/lib/otpStore";

export async function POST(request: Request) {
    const { email, otp } = await request.json();
    const storedOtp = await getOtp(email);

    console.log("Submitted email:", email);
    console.log("Submitted OTP:", otp);
    console.log("Stored OTP for email:", storedOtp);

    if (!storedOtp || storedOtp !== otp) {
        return NextResponse.json({ success: false, message: "Invalid or expired OTP" }, { status: 400 });
    }

    await deleteOtp(email);

    return NextResponse.json({ success: true });
}