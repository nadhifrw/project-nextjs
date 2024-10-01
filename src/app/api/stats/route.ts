import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const currentYear = new Date().getFullYear();
    const startYear = 2019;

    // Fetch pengabdian data
    const pengabdianData = await prisma.pengabdian.findMany({
      select: {
        tahun: true,
        tingkat: true,
      },
    });

    // Fetch penelitian data
    const penelitianData = await prisma.penelitian.findMany({
      select: {
        tahun: true,
        tingkat: true,
      },
    });

    // Initialize data structure
    const yearlyStats = {};
    for (let year = startYear; year <= currentYear; year++) {
      yearlyStats[year] = {
        pengabdianNasional: 0,
        pengabdianInternasional: 0,
        penelitianNasional: 0,
        penelitianInternasional: 0,
      };
    }

    // Aggregate pengabdian data
    pengabdianData.forEach(item => {
      if (item.tahun >= startYear && item.tahun <= currentYear) {
        const category = item.tingkat.toLowerCase() === 'internasional' ? 'pengabdianInternasional' : 'pengabdianNasional';
        yearlyStats[item.tahun][category]++;
      }
    });

    // Aggregate penelitian data
    penelitianData.forEach(item => {
      if (item.tahun >= startYear && item.tahun <= currentYear) {
        const category = item.tingkat.toLowerCase() === 'internasional' ? 'penelitianInternasional' : 'penelitianNasional';
        yearlyStats[item.tahun][category]++;
      }
    });

    // Format data for charts
    const formattedData = Object.entries(yearlyStats).map(([year, data]) => ({
      year: parseInt(year),
      ...data
    }));

    // Fetch total number of dosen
    const totalDosen = await prisma.dosen.count();

    return NextResponse.json({
      yearlyStats: formattedData,
      totalDosen,
      totalPengabdian: pengabdianData.length,
      totalPenelitian: penelitianData.length,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}