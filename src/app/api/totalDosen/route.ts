// app/api/dosen/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const countDosen = await prisma.dosen.count(); // This will count the number of 'dosen'

  return NextResponse.json({ count: countDosen });
}
