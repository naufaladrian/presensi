import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async () => {
    const datas = await prisma.absensi.findMany({})
    return NextResponse.json({ datas })
}

export const POST = async (req: NextRequest) => {
    const { nama, kelas } = await req.json();

    // Mendapatkan waktu saat ini
    const currentTime = new Date();

    // Mendapatkan waktu 24 jam yang lalu
    const last24Hours = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);

    // Memeriksa apakah ada absensi dengan nama yang sama dalam 24 jam terakhir
    const existingAbsensi = await prisma.absensi.findFirst({
        where: {
            nama: nama,
            tanggalAbsen: {
                gte: last24Hours
            }
        }
    });

    // Jika ada absensi yang sudah ada dalam 24 jam terakhir, kirim respons bahwa tidak dapat absen lagi
    if (existingAbsensi) {
        return NextResponse.json({ message: "Anda sudah absen dalam 24 jam terakhir." }, { status: 400 });
    }

    // Jika tidak ada absensi dalam 24 jam terakhir, buat entri baru
    const absen = await prisma.absensi.create({
        data: {
            nama,
            kelas
        }
    });

    return NextResponse.json({ absen });
};
