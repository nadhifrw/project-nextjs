'use client'

import React, { useState } from 'react'
import * as TableComponents from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

// Sample data - you can replace this with your actual data source
const data = [
  { id: 2144576, namaDepartemen: "Eksplorasi Efek Renoprotektif Exosome dari Human Umbilical Cord Mesenchymal Stem Cells terhadap Model Cedera Iskemia Reperfusi Ginjal Fase Kronis: Analisis Fungsional Seluler Molekuler pada Cedera Tubulus, Apoptosis-Regenerasi dan dan Stres Oksidatif", dosen: "dr. Dwi Aris Agung Nugrahaningsih, M.Sc., Ph.D, dr. Nur Arfian, Ph.D", link: "https://sdm.repository.ugm.ac.id/karya_files/eksplorasi-efek-renoprotekt" },
  // Add more data items here if needed
];

type DataItem = {
  id: number;
  namaDepartemen: string;
  dosen: string;
  link: string;
};

interface TableContentProps {
  filteredData: DataItem[];
}

function TableContent({ filteredData }: TableContentProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <TableComponents.Table>
          <TableComponents.TableHeader className="bg-gray-100 sticky top-0">
            <TableComponents.TableRow>
              <TableComponents.TableHead className="w-1/12 text-center">ID</TableComponents.TableHead>
              <TableComponents.TableHead className="w-1/4 text-left">Judul</TableComponents.TableHead>
              <TableComponents.TableHead className="w-1/4 text-left">Penulis</TableComponents.TableHead>
              <TableComponents.TableHead className="w-1/6 text-left">Link</TableComponents.TableHead>
            </TableComponents.TableRow>
          </TableComponents.TableHeader>
          <TableComponents.TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableComponents.TableRow key={row.id}>
                  <TableComponents.TableCell className='text-center'>{row.id}</TableComponents.TableCell>
                  <TableComponents.TableCell>{row.namaDepartemen}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">{row.dosen}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">{row.link}</TableComponents.TableCell>
                </TableComponents.TableRow>
              ))
            ) : (
              <TableComponents.TableRow>
                <TableComponents.TableCell colSpan={4} className="text-center py-4">
                  Tidak terdapat data
                </TableComponents.TableCell>
              </TableComponents.TableRow>
            )}
          </TableComponents.TableBody>
        </TableComponents.Table>
      </div>
    </div>
  );
}

export function DosenTablePenelitian() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item =>
    item.namaDepartemen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select className="border rounded p-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>entries</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Search:</span>
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>
      <TableContent filteredData={filteredData} />
    </div>
  );
}

export function DosenTablePengabdian() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item =>
    item.namaDepartemen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <select className="border rounded p-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>entries</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Search:</span>
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>
      <TableContent filteredData={filteredData} />
    </div>
  );
}

export default function Table(){
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Penelitian</h2>
          <DosenTablePenelitian/>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Pengabdian</h2>
          <DosenTablePengabdian/>
        </div>
      </div>
    )
}