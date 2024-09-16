'use client'

import React, { useState } from 'react'
import * as TableComponents from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Sample larger dataset
const data = [
  { day: 'Mon', visits: 120 },
  { day: 'Tue', visits: 150 },
  { day: 'Wed', visits: 180 },
  { day: 'Thu', visits: 200 },
  { day: 'Fri', visits: 250 },
  { day: 'Sat', visits: 300 },
  { day: 'Sun', visits: 280 },
  { day: 'Mon', visits: 300 }
]

const ITEMS_PER_PAGE = 5

export function UserVisitsTable() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentData = data.slice(startIndex, endIndex)

  const totalVisits = data.reduce((sum, item) => sum + item.visits, 0)

  return (
    <div>
      <TableComponents.Table>
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