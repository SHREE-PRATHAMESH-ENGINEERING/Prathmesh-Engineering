import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function setOtp(email: string, otp: string, expiresInMs: number = 5 * 60 * 1000) {
    const expiresAt = new Date(Date.now() + expiresInMs);

    await prisma.otp.deleteMany({ where: { email } });

    await prisma.otp.create({ data: { email, otp, expiresAt } });
}

export async function getOtp(email: string) {
    const record = await prisma.otp.findFirst({ where: { email } });
    if (!record) return null;
    if (new Date() > record.expiresAt) {
        await prisma.otp.deleteMany({ where: { email } });
        return null;
    }
    return record.otp;
}

export async function deleteOtp(email: string) {
    await prisma.otp.deleteMany({ where: { email } });
}