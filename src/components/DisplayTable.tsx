'use client'

import React, { useState } from 'react'
import * as TableComponents from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Sample larger dataset
const data = [
  // { day: 'Mon', visits: 120 },
  // { day: 'Tue', visits: 150 },
  // { day: 'Wed', visits: 180 },
  // { day: 'Thu', visits: 200 },
  // { day: 'Fri', visits: 250 },
  // { day: 'Sat', visits: 300 },
  // { day: 'Sun', visits: 280 },
  // { day: 'Mon', visits: 300 }
  { no: 1, namaDepartmen : "Department Anatomi", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 2, namaDepartmen : "Department Anatomi", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 3, namaDepartmen : "Department Anatomi", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 4, namaDepartmen : "Department Anatomi", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 5, namaDepartmen : "Department Anatomi", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 6, namaDepartmen : "Departemen Biostatistik, Epidemiologi, dan Kesehatan Populasi", dosen: 20, penelitian: 5, pengabdian: 1 }
]

const ITEMS_PER_PAGE = 5

export function UserVisitsTable() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentData = data.slice(startIndex, endIndex)

  const totalVisits = data.reduce((sum, item) => sum + item.penelitian + item.pengabdian, 0)

  return (
    <div>
      {/* <TableComponents.Table>
        <TableComponents.TableCaption>User visits</TableComponents.TableCaption>
        <TableComponents.TableHeader>
          <TableComponents.TableRow>
            <TableComponents.TableHead>Day</TableComponents.TableHead>
            <TableComponents.TableHead className="text-right">Visits</TableComponents.TableHead>
          </TableComponents.TableRow>
        </TableComponents.TableHeader>
        <TableComponents.TableBody>
          {currentData.map((row) => (
            <TableComponents.TableRow key={row.day}>
              <TableComponents.TableCell className="font-medium">{row.day}</TableComponents.TableCell>
              <TableComponents.TableCell className="text-right">{row.visits}</TableComponents.TableCell>
            </TableComponents.TableRow>
          ))}
        </TableComponents.TableBody>
      </TableComponents.Table> */}
      <TableComponents.Table>
        <TableComponents.TableHeader>
          <TableComponents.TableRow>
            <TableComponents.TableHead className='text-center w-0'>No</TableComponents.TableHead>
            <TableComponents.TableHead className='text-center w-6'>Nama Departemen</TableComponents.TableHead>
            <TableComponents.TableHead className='text-center w-2'>Dosen</TableComponents.TableHead>
            <TableComponents.TableHead className='text-center w-2'>Penelitian</TableComponents.TableHead>
            <TableComponents.TableHead className='text-center w-2'>Pengabdian</TableComponents.TableHead>
            <TableComponents.TableHead className='text-center w-2'>Action</TableComponents.TableHead>
          </TableComponents.TableRow>
        </TableComponents.TableHeader>
        <TableComponents.TableBody>
          {currentData.map((row) => (
            <TableComponents.TableRow>
              <TableComponents.TableCell>{row.no}</TableComponents.TableCell>
              <TableComponents.TableCell>{row.namaDepartmen}</TableComponents.TableCell>
              <TableComponents.TableCell className='text-center'>{row.dosen}</TableComponents.TableCell>
              <TableComponents.TableCell className='text-center'>{row.penelitian}</TableComponents.TableCell>
              <TableComponents.TableCell className='text-center'>{row.pengabdian}</TableComponents.TableCell>
            </TableComponents.TableRow>
          ))}
        </TableComponents.TableBody>
      </TableComponents.Table>
      
      <div className="flex justify-between items-center mt-4">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div>
          <Button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="ml-2"
          >
            Next
          </Button>
        </div>
      </div>
      
      <div className="mt-4">
        <strong>Total Visits: {totalVisits}</strong>
      </div>
    </div>
  )
}

export default function Table(){
    return (
        <div>
            <UserVisitsTable/>
        </div>
    )
}