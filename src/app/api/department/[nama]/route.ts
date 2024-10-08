import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { nama: string } }) {
  try {
    const departmentName = decodeURIComponent(params.nama);

    if (!departmentName) {
      return NextResponse.json({ error: 'Department name is required' }, { status: 400 });
    }

    const department = await prisma.department.findUnique({
      where: { nama: departmentName },
      include: {
        dosen: true,
        pengabdian: {
          include: {
            penulis: true,
          }
        },
        penelitian: {
          include: {
            penulis: true,
          }
        },
      },
    });

    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    const currentYear = new Date().getFullYear();
    const startYear = 2019;
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
    department.pengabdian.forEach(item => {
      if (item.tahun >= startYear && item.tahun <= currentYear) {
        const category = item.tingkat.toLowerCase() === 'internasional' ? 'pengabdianInternasional' : 'pengabdianNasional';
        yearlyStats[item.tahun][category]++;
      }
    });

    // Aggregate penelitian data
    department.penelitian.forEach(item => {
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
    
    const formattedPengabdianData = department.pengabdian.map(p => ({
      id_data: p.id_data,
      judul: p.judul,
      penulis: { nama: p.penulis.nama, nidn: p.penulis.nidn },
      penulisExternal: p.penulisExternal,
      department: { nama: department.nama },
      tingkat: p.tingkat,
      url: p.url,
    }));

    const formattedPenelitianData = department.penelitian.map(p => ({
      id_data: p.id_data,
      judul: p.judul,
      penulis: { nama: p.penulis.nama, nidn: p.penulis.nidn },
      penulisExternal: p.penulisExternal,
      department: { nama: department.nama },
      tingkat: p.tingkat,
      url: p.url,
    }));

    const dashboardData = {
      yearlyStats: formattedYearlyStats,
      totalDosen: department.dosen.length,
      totalPengabdian: department.pengabdian.length,
      totalPenelitian: department.penelitian.length,
      pengabdian: {
        data: formattedPengabdianData,
      },
      penelitian: {
        data: formattedPenelitianData,
      },
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}