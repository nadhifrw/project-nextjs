'use client'

import React, { useState } from 'react'
import * as TableComponents from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

const data = [
  { id: 2144576, namaDepartemen: "Eksplorasi Efek Renoprotektif Exosome dari Human Umbilical Cord Mesenchymal Stem Cells terhadap Model Cedera Iskemia Reperfusi Ginjal Fase Kronis: Analisis Fungsional Seluler Molekuler pada Cedera Tubulus, Apoptosis-Regenerasi dan dan Stres Oksidatif", dosen: "dr. Dwi Aris Agung Nugrahaningsih, M.Sc., Ph.D, dr. Nur Arfian, Ph.D", link: "https://sdm.repository.ugm.ac.id/karya_files/eksplorasi-efek-renoprotekt" },
];

export function DosenTablePenelitian() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item =>
    item.namaDepartemen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
      </div>
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
              {filteredData.map((row) => (
                <TableComponents.TableRow>
                  <TableComponents.TableCell className='text-center'>{row.id}</TableComponents.TableCell>
                  <TableComponents.TableCell>{row.namaDepartemen}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">{row.dosen}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">{row.link}</TableComponents.TableCell>
                </TableComponents.TableRow>
              ))}
            </TableComponents.TableBody>
          </TableComponents.Table>
        </div>
      </div>
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
      </div>
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
              {filteredData.map((row) => (
                <TableComponents.TableRow>
                  <TableComponents.TableCell className='text-center'>{row.id}</TableComponents.TableCell>
                  <TableComponents.TableCell>{row.namaDepartemen}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">{row.dosen}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">{row.link}</TableComponents.TableCell>
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
        <div>
            <DosenTablePenelitian/>
        </div>
        <div>
            <DosenTablePengabdian/>
        </div>
      </div>
        
    )
}