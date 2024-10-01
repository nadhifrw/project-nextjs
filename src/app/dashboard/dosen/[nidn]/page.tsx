'use client';

import prisma from '@/lib/prisma';
import { notFound, useParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import DisplayDataDosen from '@/components/dosen/DisplayDataDosen';
import DisplayTableDosen from '@/components/dosen/DisplayTableDosen';
import { useEffect, useState } from 'react';

type Penelitian = {
  id_data: number;
  judul: string;
  penulisExternal: string[];
  tingkat: string;
  url: string;
};

type Pengabdian = {
  id_data: number;
  judul: string;
  penulisExternal: string[];
  tingkat: string;
  url: string;
};

type Dosen = {
  nidn: string;
  nama: string;
  department: {
    nama: string;
  };
  penelitian: Penelitian[];
  pengabdian: Pengabdian[];
};

export default function DosenDetailPage() {
  // const dosen = await prisma.dosen.findUnique({
  //   where: { nidn: params.nidn },
  //   include: { department: true }
  // });

  // if (!dosen) {
  //   notFound();
  // }
  const [data, setDosen] = useState<Dosen | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const nidn = params.nidn as string;

  useEffect(() => {
    async function fetchDosenData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/dosen/${nidn}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dosen data');
        }
        const data = await response.json();
        setDosen(data);
      } catch (err) {
        setError('An error occurred while fetching the data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (nidn) {
      fetchDosenData();
    }
  }, [nidn]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data found for this dosen.</div>;

  return (
    <div className="container mx-auto">
        <Link href={'/dashboard/dosen'}>
            <button className='flex flex-row'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
                <div className='font-bold pl-4'>
                    {data.dosen.nama}
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