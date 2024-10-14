import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { nidn: string } }
) {
  try {
    const nidn = params.nidn;
    const currentYear = new Date().getFullYear();
    const startYear = 2019;

    // Fetch specific dosen data
    const dosen = await prisma.dosen.findUnique({
      where: { nidn },
      include: {
        penelitian: true,
        pengabdian: true,
      },
    });

    if (!dosen) {
      return NextResponse.json({ error: 'Dosen not found' }, { status: 404 });
    }

    // Initialize yearly stats
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
    dosen.pengabdian.forEach(item => {
      if (item.tahun >= startYear && item.tahun <= currentYear) {
        const category = item.tingkat.toLowerCase() === 'internasional' ? 'pengabdianInternasional' : 'pengabdianNasional';
        yearlyStats[item.tahun][category]++;
      }
    });

    // Aggregate penelitian data
    dosen.penelitian.forEach(item => {
      if (item.tahun >= startYear && item.tahun <= currentYear) {
        const category = item.tingkat.toLowerCase() === 'internasional' ? 'penelitianInternasional' : 'penelitianNasional';
        yearlyStats[item.tahun][category]++;
      }
    });

    // Format data for charts
    const formattedYearlyStats = Object.entries(yearlyStats).map(([year, data]) => ({
      year: parseInt(year),
      ...data,
    }));

    return NextResponse.json({
      dosen: {
        nidn: dosen.nidn,
        nama: dosen.nama,
        // Add other dosen fields as needed
      },
      penelitian: dosen.penelitian.map(p => ({
        id_data: p.id_data,
        judul: p.judul,
        penulisExternal: p.penulisExternal,
        penulisNidn: p.penulisNidn,
        tingkat: p.tingkat,
        url: p.url,
        tahun: p.tahun,
      })),
      pengabdian: dosen.pengabdian.map(p => ({
        id_data: p.id_data,
        judul: p.judul,
        penulisExternal: p.penulisExternal,
        penulisNidn: p.penulisNidn,
        tingkat: p.tingkat,
        url: p.url,
        tahun: p.tahun,
      })),
      yearlyStats: formattedYearlyStats,
      totalPengabdian: dosen.pengabdian.length,
      totalPenelitian: dosen.penelitian.length,
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}