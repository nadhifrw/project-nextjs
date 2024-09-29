'use client';

import React, { useState } from 'react'
import * as TableComponents from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Sample data - you can replace this with your actual data source
const penelitianData = [
  { id: 2144576, namaDepartemen: "Eksplorasi Efek Renoprotektif Exosome dari Human Umbilical Cord Mesenchymal Stem Cells terhadap Model Cedera Iskemia Reperfusi Ginjal Fase Kronis: Analisis Fungsional Seluler Molekuler pada Cedera Tubulus, Apoptosis-Regenerasi dan dan Stres Oksidatif", dosen: "dr. Dwi Aris Agung Nugrahaningsih, M.Sc., Ph.D, dr. Nur Arfian, Ph.D", link: "https://sdm.repository.ugm.ac.id/karya_files/eksplorasi-efek-renoprotekt" },
  // Add more penelitian data items here
];

const pengabdianData = [
  { id: 3144576, namaDepartemen: "Program Pengabdian Masyarakat: Pelatihan Kesehatan Ginjal", dosen: "dr. Jane Doe, M.Sc., Ph.D", link: "https://example.com/pengabdian-kesehatan-ginjal" },
  // Add more pengabdian data items here
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

export default function ResearchDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTable, setSelectedTable] = useState('penelitian');

  const data = selectedTable === 'penelitian' ? penelitianData : pengabdianData;

  const filteredData = data.filter(item =>
    item.namaDepartemen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <Select onValueChange={(value) => setSelectedTable(value)} defaultValue="penelitian">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select table" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="penelitian">Penelitian</SelectItem>
            <SelectItem value="pengabdian">Pengabdian</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <span>Show</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="Entries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>entries</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>Search:</span>
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