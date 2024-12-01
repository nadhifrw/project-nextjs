'use client';

import { notFound, useParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  dosen: any;
  nidn: string;
  nama: string;
  department: {
    nama: string;
  };
  penelitian: Penelitian[];
  pengabdian: Pengabdian[];
};

export default function DosenDetailPage() {
  const [selectedYear, setSelectedYear] = useState<string | "all">("all");
  const years = ["all", "2019", "2020", "2021", "2022", "2023", "2024"];
  const [data, setDosen] = useState<Dosen | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const nidn = params.nidn as string;

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    async function fetchDosenData() {
      setIsLoading(true);
      try {
        // Only add year parameter if a specific year is selected
        const url = selectedYear === "all" 
          ? `/api/dosen/${nidn}`
          : `/api/dosen/${nidn}?year=${selectedYear}`;

        const response = await fetch(url);
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
  }, [nidn, selectedYear]); 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data found for this dosen.</div>;

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <Link href={'/dashboard/dosen'}>
            <button className='flex flex-row'>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="size-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M15.75 19.5 8.25 12l7.5-7.5" 
                />
              </svg>
              <div className='font-bold pl-4'>
                {data.dosen.nama}
              </div>
            </button>
          </Link>
        </div>
        <div>
          <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year === "all" ? "All Years" : year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className=''>
        <div>
          <DisplayDataDosen selectedYear={selectedYear}/>
        </div>
        <div>
          <DisplayTableDosen selectedYear={selectedYear}/>
        </div>
      </div>
    </div>
  );
}