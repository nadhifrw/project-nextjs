import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { nama: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const nama = params.nama;
    const yearFilter = searchParams.get('year');
    const currentYear = new Date().getFullYear();
    const startYear = 2019;
  
    if (!nama) {
      return NextResponse.json({ error: 'Department name is required' }, { status: 400 });
    }

    const department = await prisma.department.findUnique({
      where: { nama},
      include: {
        dosen: true,
        pengabdian: {
          where: yearFilter ? {
            tahun: parseInt(yearFilter)
          } : undefined,
          include: {
            penulis: true,
          }
        },
        penelitian: {
          where: yearFilter ? {
            tahun: parseInt(yearFilter)
          } : undefined,
          include: {
            penulis: true,
          }
        },
      },
    });

    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 });
    }

    // for (let year = startYear; year <= currentYear; year++) {
    //   yearlyStats[year] = {
    //     pengabdianNasional: 0,
    //     pengabdianInternasional: 0,
    //     penelitianNasional: 0,
    //     penelitianInternasional: 0,
    //   };
    // }

    // // Aggregate pengabdian data
    // department.pengabdian.forEach(item => {
    //   if (item.tahun >= startYear && item.tahun <= currentYear) {
    //     const category = item.tingkat.toLowerCase() === 'internasional' ? 'pengabdianInternasional' : 'pengabdianNasional';
    //     yearlyStats[item.tahun][category]++;
    //   }
    // });

    // // Aggregate penelitian data
    // department.penelitian.forEach(item => {
    //   if (item.tahun >= startYear && item.tahun <= currentYear) {
    //     const category = item.tingkat.toLowerCase() === 'internasional' ? 'penelitianInternasional' : 'penelitianNasional';
    //     yearlyStats[item.tahun][category]++;
    //   }
    // });

    // // Format data for charts
    // const formattedYearlyStats = Object.entries(yearlyStats).map(([year, data]) => ({
    //   year: parseInt(year),
    //   ...data,
    // }));

    // Initialize yearly stats
    const yearlyStats: {
      [key: number]: {
        pengabdianNasional: number;
        pengabdianInternasional: number;
        penelitianNasional: number;
        penelitianInternasional: number;
      };
    } = {};

    // If year filter is applied, only create stats for that year
    if (yearFilter) {
      const year = parseInt(yearFilter);
      yearlyStats[year] = {
        pengabdianNasional: 0,
        pengabdianInternasional: 0,
        penelitianNasional: 0,
        penelitianInternasional: 0,
      };
    } else {
      // Create stats for all years in range
      for (let year = startYear; year <= currentYear; year++) {
        yearlyStats[year] = {
          pengabdianNasional: 0,
          pengabdianInternasional: 0,
          penelitianNasional: 0,
          penelitianInternasional: 0,
        };
      }
    }

    // Aggregate pengabdian data
    department.pengabdian.forEach(item => {
      if (yearlyStats[item.tahun]) {
        const category = item.tingkat.toLowerCase() === 'internasional' 
          ? 'pengabdianInternasional' 
          : 'pengabdianNasional';
        yearlyStats[item.tahun][category]++;
      }
    });

    // Aggregate penelitian data
    department.penelitian.forEach(item => {
      if (yearlyStats[item.tahun]) {
        const category = item.tingkat.toLowerCase() === 'internasional' 
          ? 'penelitianInternasional' 
          : 'penelitianNasional';
        yearlyStats[item.tahun][category]++;
      }
    });

    // Format data for charts
    const formattedYearlyStats = Object.entries(yearlyStats).map(([year, data]) => ({
      year: parseInt(year),
      ...data,
    }));

    const lecturerStats = department.dosen.map(dosen => {
      const pengabdianNasionalCount = department.pengabdian.filter(p => p.penulis.nidn === dosen.nidn && p.tingkat.toLowerCase() !== 'internasional').length;
      const pengabdianInternasionalCount = department.pengabdian.filter(p => p.penulis.nidn === dosen.nidn && p.tingkat.toLowerCase() === 'internasional').length;
      const penelitianNasionalCount = department.penelitian.filter(p => p.penulis.nidn === dosen.nidn && p.tingkat.toLowerCase() !== 'internasional').length;
      const penelitianInternasionalCount = department.penelitian.filter(p => p.penulis.nidn === dosen.nidn && p.tingkat.toLowerCase() === 'internasional').length;

      return {
      name: dosen.nama,
      pengabdianNasional: pengabdianNasionalCount,
      pengabdianInternasional: pengabdianInternasionalCount,
      penelitianNasional: penelitianNasionalCount,
      penelitianInternasional: penelitianInternasionalCount,
      total: pengabdianNasionalCount + pengabdianInternasionalCount + penelitianNasionalCount + penelitianInternasionalCount
      };
    });

    // const lecturerStats = department.dosen.map(dosen => {
    //   const pengabdianCount = department.pengabdian.filter(p => p.penulis.nidn === dosen.nidn).length;
    //   const penelitianCount = department.penelitian.filter(p => p.penulis.nidn === dosen.nidn).length;

    //   return {
    //     name: dosen.nama,
    //     pengabdian: pengabdianCount,
    //     penelitian: penelitianCount,
    //     total: pengabdianCount + penelitianCount
    //   };
    // });
    // Sort lecturers by total count in descending order
    lecturerStats.sort((a, b) => b.total - a.total);
    
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
      lecturerStats,
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
//           include: {
//             penulis: true,
//           }
//         },
//         penelitian: {
//           include: {
//             penulis: true,
//           }
//         },
//       },
//     });

//     if (!department) {
//       return NextResponse.json({ error: 'Department not found' }, { status: 404 });
//     }

//     // Aggregate data by lecturer
//     const lecturerStats = department.dosen.map(dosen => {
//       const pengabdianCount = department.pengabdian.filter(p => p.penulis.nidn === dosen.nidn).length;
//       const penelitianCount = department.penelitian.filter(p => p.penulis.nidn === dosen.nidn).length;

//       return {
//         name: dosen.nama,
//         pengabdian: pengabdianCount,
//         penelitian: penelitianCount,
//         total: pengabdianCount + penelitianCount
//       };
//     });

//     // Sort lecturers by total count in descending order
//     lecturerStats.sort((a, b) => b.total - a.total);

//     const dashboardData = {
//       lecturerStats,
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