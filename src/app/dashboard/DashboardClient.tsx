// app/dashboard/DashboardClient.tsx
'use client'

import React from 'react'
import AddDataButton from '@/components/AddDataPenelitianButton'
import DisplayData from '@/components/DisplayData'
import { TableDepartment } from '@/components/DisplayTable'
import AddDataPengabdian from '@/components/AddDataPengabdianButton'

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
  return (
    <main>
      <div className=''>
        <div className='flex flex-row m-4'>
          <div className='mr-2'>
            <AddDataPengabdian />
          </div>
          <div className='ml-2'>
            <AddDataButton />
          </div>  
        </div>
        <div className=''>
          <DisplayData />
        </div>
        <div className='shadow-xl m-4 p-4 border border-solid rounded-md'>
          <TableDepartment departments={initialDepartments} />
        </div>
      </div>
    </main>
  )
}