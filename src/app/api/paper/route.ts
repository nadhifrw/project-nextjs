import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all dosen with their pengabdian and penelitian counts
    const dosenData = await prisma.dosen.findMany({
      include: {
        _count: {
          select: {
            pengabdian: true,
            penelitian: true,
          },
        },
      },
    });

    // Fetch pengabdian data along with related dosen and department
    const pengabdianData = await prisma.pengabdian.findMany({
      include: {
        penulis: true,
        department: true,
      },
    });

    // Fetch penelitian data along with related dosen and department
    const penelitianData = await prisma.penelitian.findMany({
      include: {
        penulis: true,
        department: true,
      },
    });

    // Calculate totals
    const totalPengabdian = pengabdianData.length;
    const totalPenelitian = penelitianData.length;

    // Return the data and totals in the response
    return NextResponse.json({
      dosen: dosenData.map(dosen => ({
        ...dosen,
        totalPengabdian: dosen._count.pengabdian,
        totalPenelitian: dosen._count.penelitian,
      })),
      pengabdian: {
        data: pengabdianData,
        total: totalPengabdian,
      },
      penelitian: {
        data: penelitianData,
        total: totalPenelitian,
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}
