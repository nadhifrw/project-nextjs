'use client'

import React, { useState } from 'react'
import * as TableComponents from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import Link from 'next/link';

const data = [
  { no: 1, namaDepartemen: "Departemen Anatomi", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 2, namaDepartemen: "Departemen Anestesiologi dan Terapi Intensif", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 3, namaDepartemen: "Departemen Biokimia", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 4, namaDepartemen: "Departemen Biostatistik, Epidemiologi, dan Kesehatan Populasi", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 5, namaDepartemen: "Departemen Dermatologi dan Venereologi", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 6, namaDepartemen: "Departemen Farmakologi dan Terapi", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 7, namaDepartemen: "Departemen Fisiologi", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 8, namaDepartemen: "Departemen Gizi Kesehatan", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 9, namaDepartemen: "Departemen Histologi dan Biologi Sel", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 10, namaDepartemen: "Departemen Ilmu Bedah", dosen: 20, penelitian: 5, pengabdian: 1 },
  { no: 11, namaDepartemen: "Departemen Ilmu Kesehatan Anak", dosen: 20, penelitian: 5, pengabdian: 1 },
  
];

export function TableDepartment() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item =>
    item.namaDepartemen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Departemen</h2>
        <div className="flex items-center">
          <span className="mr-2 font-bold">Search:</span>
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <TableComponents.Table>
            <TableComponents.TableHeader className="bg-gray-100 sticky top-0">
              <TableComponents.TableRow>
                <TableComponents.TableHead className="w-16 text-left">No</TableComponents.TableHead>
                <TableComponents.TableHead className="w-1/2 text-left">Nama Departemen</TableComponents.TableHead>
                <TableComponents.TableHead className="w-24 text-center">Dosen</TableComponents.TableHead>
                <TableComponents.TableHead className="w-24 text-center">Penelitian</TableComponents.TableHead>
                <TableComponents.TableHead className="w-24 text-center">Pengabdian</TableComponents.TableHead>
                <TableComponents.TableHead className="w-24 text-center">Action</TableComponents.TableHead>
              </TableComponents.TableRow>
            </TableComponents.TableHeader>
            <TableComponents.TableBody>
              {filteredData.map((row) => (
                <TableComponents.TableRow key={row.no}>
                  <TableComponents.TableCell>{row.no}</TableComponents.TableCell>
                  <TableComponents.TableCell>{row.namaDepartemen}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-center">{row.dosen}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-center">{row.penelitian}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-center">{row.pengabdian}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-center">
                  <Link href={`dashboard/department/${row.namaDepartemen}`}>
                    <Button variant="outline" size="sm">Detail</Button>
                  </Link> 
                  </TableComponents.TableCell>
                </TableComponents.TableRow>
              ))}
            </TableComponents.TableBody>
          </TableComponents.Table>
        </div>
      </div>
    </div>
  );
}

export default function Table(){
    return (
        <div>
            <TableDepartment/>
        </div>
    )
}