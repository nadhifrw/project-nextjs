// app/api/dosen/[nidn]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { nidn: string } }
) {
  const nidn = params.nidn;

  try {
    const dosen = await prisma.dosen.findUnique({
      where: { nidn },
      include: {
        department: true,
        penelitian: true,
        pengabdian: true,
      },
    });

    if (!dosen) {
      return NextResponse.json({ error: 'Dosen not found' }, { status: 404 });
    }

    return NextResponse.json(dosen);
  } catch (error) {
    console.error('Error fetching dosen:', error);
    return NextResponse.json({ error: 'An error occurred while fetching the data' }, { status: 500 });
  }
}