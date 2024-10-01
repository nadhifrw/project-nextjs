// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function GET(request: Request, { params }: { params: { nama: string } }) {
//   try {
//     // Get department name from the dynamic route
//     const departmentName = decodeURIComponent(params.nama);

//     if (!departmentName) {
//       return NextResponse.json({ error: 'Department name is required' }, { status: 400 });
//     }

//     // Fetch department by name along with associated dosen, pengabdian, and penelitian
//     const department = await prisma.department.findUnique({
//       where: { nama: departmentName },
//       include: {
//         dosen: {
//           include: {
//             _count: {
//               select: {
//                 pengabdian: true,
//                 penelitian: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     if (!department) {
//       return NextResponse.json({ error: 'Department not found' }, { status: 404 });
//     }

//     // Fetch pengabdian and penelitian data for the specific department
//     const pengabdianData = await prisma.pengabdian.findMany({
//       where: { id_department: department.id_department },
//       include: {
//         penulis: true,
//         department: true,
//       },
//     });

//     const penelitianData = await prisma.penelitian.findMany({
//       where: { id_department: department.id_department },
//       include: {
//         penulis: true,
//         department: true,
//       },
//     });

//     // Calculate totals
//     const totalPengabdian = pengabdianData.length;
//     const totalPenelitian = penelitianData.length;

//     // Return the data and totals in the response
//     return NextResponse.json({
//       department: {
//         ...department,
//         dosen: department.dosen.map(dosen => ({
//           ...dosen,
//           totalPengabdian: dosen._count.pengabdian,
//           totalPenelitian: dosen._count.penelitian,
//         })),
//       },
//       pengabdian: {
//         data: pengabdianData,
//         total: totalPengabdian,
//       },
//       penelitian: {
//         data: penelitianData,
//         total: totalPenelitian,
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
//   }
// }

// import prisma from '@/lib/prisma';
// import { NextResponse } from 'next/server';

// export async function GET(request: Request, { params }: { params: { nama: string } }) {
//   try {
//     const departmentName = decodeURIComponent(params.nama);

//     if (!departmentName) {
//       return NextResponse.json({ error: 'Department name is required' }, { status: 400 });
//     }

//     const department = await prisma.department.findUnique({
//       where: { nama: departmentName },
//       include: {
//         dosen: true,
//         pengabdian: {
//           select: {
//             tahun: true,
//             tingkat: true,
//           },
//         },
//         penelitian: {
//           select: {
//             tahun: true,
//             tingkat: true,
//           },
//         },
//       },
//     });

//     if (!department) {
//       return NextResponse.json({ error: 'Department not found' }, { status: 404 });
//     }
//     const pengabdianData = await prisma.pengabdian.findMany({
//       where: { id_department: department.id_department },
//       include: {
//         penulis: true,
//         department: true,
//       },
//     });

//     const penelitianData = await prisma.penelitian.findMany({
//       where: { id_department: department.id_department },
//       include: {
//         penulis: true,
//         department: true,
//       },
//     });

//     const totalPengabdian = pengabdianData.length;
//     const totalPenelitian = penelitianData.length;
    
//     const currentYear = new Date().getFullYear();
//     const startYear = currentYear - 5;
//     const yearlyStats = [];

//     for (let year = startYear; year <= currentYear; year++) {
//       const yearStat = {
//         year,
//         pengabdianNasional: 0,
//         pengabdianInternasional: 0,
//         penelitianNasional: 0,
//         penelitianInternasional: 0,
//       };

//       department.pengabdian.forEach(p => {
//         if (p.tahun === year) {
//           if (p.tingkat === 'NASIONAL') yearStat.pengabdianNasional++;
//           else if (p.tingkat === 'INTERNASIONAL') yearStat.pengabdianInternasional++;
//         }
//       });

//       department.penelitian.forEach(p => {
//         if (p.tahun === year) {
//           if (p.tingkat === 'NASIONAL') yearStat.penelitianNasional++;
//           else if (p.tingkat === 'INTERNASIONAL') yearStat.penelitianInternasional++;
//         }
//       });

//       yearlyStats.push(yearStat);
//     }

//     const dashboardData = {
//       yearlyStats,
//       totalDosen: department.dosen.length,
//       totalPengabdian: department.pengabdian.length,
//       totalPenelitian: department.penelitian.length,
//     };

//     return NextResponse.json(dashboardData);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
//   }
// }

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
    const startYear = currentYear - 5;
    const yearlyStats = [];

    for (let year = startYear; year <= currentYear; year++) {
      const yearStat = {
        year,
        pengabdianNasional: department.pengabdian.filter(p => p.tahun === year && p.tingkat === 'NASIONAL').length,
        pengabdianInternasional: department.pengabdian.filter(p => p.tahun === year && p.tingkat === 'INTERNASIONAL').length,
        penelitianNasional: department.penelitian.filter(p => p.tahun === year && p.tingkat === 'NASIONAL').length,
        penelitianInternasional: department.penelitian.filter(p => p.tahun === year && p.tingkat === 'INTERNASIONAL').length,
      };
      yearlyStats.push(yearStat);
    }

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
      yearlyStats,
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