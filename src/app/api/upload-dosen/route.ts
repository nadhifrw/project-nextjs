import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ message: 'Invalid data format' }, { status: 400 });
    }

    const results = {
      success: 0,
      skipped: 0,
      errors: [] as string[],
    };

    for (const row of data) {
      if (!row.NIDN || !row.NamaDosen || !row.DepartmentId) {
        console.warn('Skipping row due to missing data:', row);
        results.skipped++;
        continue;
      }

      try {
        // Check if the Department exists
        const department = await prisma.department.findUnique({
          where: { id_department: Number(row.DepartmentId) },
        });

        if (!department) {
          console.warn(`Department with ID ${row.DepartmentId} not found. Skipping record.`);
          results.skipped++;
          results.errors.push(`Department with ID ${row.DepartmentId} not found for NIDN ${row.NIDN}`);
          continue;
        }

        // If Department exists, proceed with upsert
        await prisma.dosen.upsert({
          where: { nidn: row.NIDN },
          update: {
            nama: row.NamaDosen,
            department: { connect: { id_department: Number(row.DepartmentId) } },
          },
          create: {
            nidn: row.NIDN,
            nama: row.NamaDosen,
            department: { connect: { id_department: Number(row.DepartmentId) } },
          },
        });

        results.success++;
      } catch (error:any) {
        console.error('Error processing row:', error);
        results.errors.push(`Error processing NIDN ${row.NIDN}: ${error.message}`);
      }
    }

    return NextResponse.json({
      message: 'Data processing completed',
      results: results
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error processing data:', error);
    return NextResponse.json({ message: 'Error processing data', error: error.message }, { status: 500 });
  }
}