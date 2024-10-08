// app/api/dosen/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const dosen = await prisma.dosen.findMany({
    include: {
      department: true, 
    }, 
  });
  return NextResponse.json(dosen);
}

