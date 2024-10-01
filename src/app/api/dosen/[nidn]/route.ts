// // app/api/dosen/[nidn]/route.ts
// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(
//   request: Request,
//   { params }: { params: { nidn: string } }
// ) {
//   const nidn = params.nidn;

//   try {
//     const dosen = await prisma.dosen.findUnique({
//       where: { nidn },
//       include: {
//         department: true,
//         penelitian: true,
//         pengabdian: true,
//       },
//     });

//     if (!dosen) {
//       return NextResponse.json({ error: 'Dosen not found' }, { status: 404 });
//     }

//     return NextResponse.json(dosen);
//   } catch (error) {
//     console.error('Error fetching dosen:', error);
//     return NextResponse.json({ error: 'An error occurred while fetching the data' }, { status: 500 });
//   }
// }

// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function GET(
//   request: Request,
//   { params }: { params: { nidn?: string } }
// ) {
//   try {
//     if (params.nidn) {
//       // Fetch specific dosen data
//       const dosen = await prisma.dosen.findUnique({
//         where: { nidn: params.nidn },
//         include: {
//           department: true,
//           penelitian: true,
//           pengabdian: true,
//         },
//       });

//       if (!dosen) {
//         return NextResponse.json({ error: 'Dosen not found' }, { status: 404 });
//       }

//       return NextResponse.json(dosen);
//     } else {
//       // Fetch statistics
//       const currentYear = new Date().getFullYear();
//       const startYear = 2019;

//       const pengabdianData = await prisma.pengabdian.findMany({
//         select: { tahun: true, tingkat: true },
//       });

//       const penelitianData = await prisma.penelitian.findMany({
//         select: { tahun: true, tingkat: true },
//       });

//       const yearlyStats: Record<number, {
//         pengabdianNasional: number;
//         pengabdianInternasional: number;
//         penelitianNasional: number;
//         penelitianInternasional: number;
//       }> = {};

//       for (let year = startYear; year <= currentYear; year++) {
//         yearlyStats[year] = {
//           pengabdianNasional: 0,
//           pengabdianInternasional: 0,
//           penelitianNasional: 0,
//           penelitianInternasional: 0,
//         };
//       }

//       pengabdianData.forEach(item => {
//         if (item.tahun >= startYear && item.tahun <= currentYear) {
//           const category = item.tingkat.toLowerCase() === 'internasional' ? 'pengabdianInternasional' : 'pengabdianNasional';
//           yearlyStats[item.tahun][category]++;
//         }
//       });

//       penelitianData.forEach(item => {
//         if (item.tahun >= startYear && item.tahun <= currentYear) {
//           const category = item.tingkat.toLowerCase() === 'internasional' ? 'penelitianInternasional' : 'penelitianNasional';
//           yearlyStats[item.tahun][category]++;
//         }
//       });

//       const formattedData = Object.entries(yearlyStats).map(([year, data]) => ({
//         year: parseInt(year),
//         ...data,
//       }));

//       const totalDosen = await prisma.dosen.count();

//       return NextResponse.json({
//         yearlyStats: formattedData,
//         totalDosen,
//         totalPengabdian: pengabdianData.length,
//         totalPenelitian: penelitianData.length,
//       });
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
//   }
// }

// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function GET(
//   request: Request,
//   { params }: { params: { nidn: string } }
// ) {
//   try {
//     const nidn = params.nidn;
//     const currentYear = new Date().getFullYear();
//     const startYear = 2019;

//     // Fetch specific dosen data
//     const dosen = await prisma.dosen.findUnique({
//       where: { nidn },
//       include: {
//         department: true,
//         penelitian: true,
//         pengabdian: true,
//       },
//     });

//     if (!dosen) {
//       return NextResponse.json({ error: 'Dosen not found' }, { status: 404 });
//     }

//     // Initialize yearly stats
//     const yearlyStats: Record<number, {
//       pengabdianNasional: number;
//       pengabdianInternasional: number;
//       penelitianNasional: number;
//       penelitianInternasional: number;
//     }> = {};

//     for (let year = startYear; year <= currentYear; year++) {
//       yearlyStats[year] = {
//         pengabdianNasional: 0,
//         pengabdianInternasional: 0,
//         penelitianNasional: 0,
//         penelitianInternasional: 0,
//       };
//     }

//     // Aggregate pengabdian data
//     dosen.pengabdian.forEach(item => {
//       if (item.tahun >= startYear && item.tahun <= currentYear) {
//         const category = item.tingkat.toLowerCase() === 'internasional' ? 'pengabdianInternasional' : 'pengabdianNasional';
//         yearlyStats[item.tahun][category]++;
//       }
//     });

//     // Aggregate penelitian data
//     dosen.penelitian.forEach(item => {
//       if (item.tahun >= startYear && item.tahun <= currentYear) {
//         const category = item.tingkat.toLowerCase() === 'internasional' ? 'penelitianInternasional' : 'penelitianNasional';
//         yearlyStats[item.tahun][category]++;
//       }
//     });

//     // Format data for charts
//     const formattedYearlyStats = Object.entries(yearlyStats).map(([year, data]) => ({
//       year: parseInt(year),
//       ...data,
//     }));

//     // Calculate totals
//     const totalPengabdian = dosen.pengabdian.length;
//     const totalPenelitian = dosen.penelitian.length;

//     return NextResponse.json({
//       dosen: {
//         nidn: dosen.nidn,
//         nama: dosen.nama,
//         department: dosen.department,
//         // Add other dosen fields as needed
//       },
//       yearlyStats: formattedYearlyStats,
//       totalPengabdian,
//       totalPenelitian,
//     });

//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
//   }
// }


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
        id_data: p.id,
        judul: p.judul,
        penulisExternal: p.penulisExternal,
        penulisNidn: p.penulisNidn,
        tingkat: p.tingkat,
        url: p.url,
        tahun: p.tahun,
      })),
      pengabdian: dosen.pengabdian.map(p => ({
        id_data: p.id,
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