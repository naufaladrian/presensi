import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async () => {

    try {
        // Mendapatkan data absensi antara tanggal 13 Maret 2024
        const datas = await prisma.$queryRaw`SELECT * FROM absensi WHERE tanggalAbsen LIKE '2024-03-13%';`;

        return NextResponse.json({ datas });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid date provided' });
    }
}




