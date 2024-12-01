// app/dashboard/DashboardClient.tsx
'use client'

import React, { useState } from 'react'
import AddDataButton from '@/components/AddDataPenelitianButton'
import DisplayData from '@/components/DisplayData'
import { TableDepartment } from '@/components/DisplayTable'
import AddDataPengabdian from '@/components/AddDataPengabdianButton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Department = {
  id_department: number
  nama: string
  dosen: { nidn: string }[]
  _count: {
    dosen: number
    pengabdian: number
    penelitian: number
  }
}

interface DashboardClientProps {
  initialDepartments: Department[]
}

export default function DashboardClient({ initialDepartments }: DashboardClientProps) {
  const [selectedYear, setSelectedYear] = useState<string | "all">("all");
  const years = ["all", "2019", "2020", "2021", "2022", "2023", "2024"];

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <main>
      <div className=''>
        <div className='flex items-center justify-between px-4 py-2'>
          <div className='flex flex-row m-4'>
            <div className='mr-2'>
              <AddDataPengabdian />
            </div>
            <div className='ml-2'>
              <AddDataButton />
            </div>  
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
          <DisplayData selectedYear={selectedYear}/>
        </div>
        <div className='shadow-xl m-4 p-4 border border-solid rounded-md'>
          <TableDepartment selectedYear={selectedYear} departments={initialDepartments} />
        </div>
      </div>
    </main>
  )
}