// app/dashboard/DashboardClient.tsx
'use client'

import React from 'react'
import AddDataButton from '@/components/AddDataButton'
import DisplayData from '@/components/DisplayData'
import { TableDepartment } from '@/components/DisplayTable'

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
      <div className='border'>
        <div>
          <AddDataButton />
        </div>
        <div className='flex items-center justify-center'>
          <DisplayData />
        </div>
        <div className='shadow-xl m-4 p-4 border border-solid rounded-md'>
          <TableDepartment departments={initialDepartments} />
        </div>
      </div>
    </main>
  )
}