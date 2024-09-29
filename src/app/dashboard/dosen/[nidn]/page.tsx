import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import DisplayDataDosen from '@/components/dosen/DisplayDataDosen';
import DisplayTableDosen from '@/components/dosen/DisplayTableDosen';

export default async function DosenDetailPage({ params }: { params: { nidn: string } }) {
  const dosen = await prisma.dosen.findUnique({
    where: { nidn: params.nidn },
    include: { departemen: true }
  });

  if (!dosen) {
    notFound();
  }

  return (
    <div className="container mx-auto">
        <Link href={'/dashboard/dosen'}>
            <button className='flex flex-row'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <div className='font-bold pl-4'>
                    {dosen.nama}
                </div>
            </button>
        </Link>
        <div className='border'>
            <div >
                <DisplayDataDosen/>
            </div>
            <div>
                <DisplayTableDosen/>
            </div>
        </div>
        
    </div>
  );
}