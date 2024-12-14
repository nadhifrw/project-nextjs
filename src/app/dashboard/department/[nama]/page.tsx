//src/app/dashboard/department/[nama]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import DisplayDataDepartment from "@/components/department/DisplayDataDepartment";
import DisplayTableDepartment from "@/components/department/DisplayTableDepartment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from "react";
import Link from "next/link";

type Department = {
  nama: string;
  lecturerStats: any[];
  yearlyStats: any[];
  totalDosen: number;
  totalPengabdian: number;
  totalPenelitian: number;
  pengabdian: { data: any[] };
  penelitian: { data: any[] };
}

export default function DepartmentDetailPage() {
  const [selectedYear, setSelectedYear] = useState<string | "all">("all");
  const startYear = 2019;
  const years = ["all", ...Array.from({ length: new Date().getFullYear() - startYear + 1 }, (_, i) => (startYear + i).toString())];
  const [department, setDepartment] = useState<Department | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const nama = params.nama as string;

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    async function fetchDepartmentData() {
      setIsLoading(true);
      try {
        const url = selectedYear === "all" 
          ? `/api/department/${nama}`
          : `/api/department/${nama}?year=${selectedYear}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch department data');  
        }
        const data = await response.json();
        setDepartment(data);
      } catch (err) {
        setError('An error occurred while fetching the data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (nama) {
      fetchDepartmentData();
    }
  }, [nama, selectedYear]); 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!department) return <div>No data found for this department.</div>;

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between px-4 py-2">
        <div>
          <Link href={'/dashboard/'}>
            <button className='flex flex-row items-center'>
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
                {decodeURIComponent(nama)} 
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
          <DisplayDataDepartment selectedYear={selectedYear}/>
        </div>
        <div className="">
          <DisplayTableDepartment selectedYear={selectedYear}/>
        </div>
      </div>
    </div>
  );
}