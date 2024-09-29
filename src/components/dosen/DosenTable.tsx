// components/DosenTable.tsx
'use client';

import React, { useState } from 'react';
import * as TableComponents from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';

type Dosen = {
  nidn: string;
  nama: string;
  department: {
    nama: string;
  };
};

interface DosenTableProps {
  data: Dosen[];
}

export function DosenTable({ data }: DosenTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dosen</h2>
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
      <div className="border rounded-lg overflow-hidden">
        <TableComponents.Table>
          <TableComponents.TableHeader>
            <TableComponents.TableRow>
              <TableComponents.TableHead className="w-16">NO</TableComponents.TableHead>
              <TableComponents.TableHead className="w-32">NIDN</TableComponents.TableHead>
              <TableComponents.TableHead>Nama Dosen</TableComponents.TableHead>
              <TableComponents.TableHead>Departemen</TableComponents.TableHead>
              <TableComponents.TableHead className="w-24 text-center">Action</TableComponents.TableHead>
            </TableComponents.TableRow>
          </TableComponents.TableHeader>
          <TableComponents.TableBody>
            {currentItems.map((row, index) => (
              <TableComponents.TableRow key={row.nidn}>
                <TableComponents.TableCell>{index + 1}</TableComponents.TableCell>
                <TableComponents.TableCell>{row.nidn}</TableComponents.TableCell>
                <TableComponents.TableCell>{row.nama}</TableComponents.TableCell>
                <TableComponents.TableCell>{row.department.nama}</TableComponents.TableCell>
                <TableComponents.TableCell className="text-center">
                  <Link href={`/dashboard/dosen/${row.nidn}`} passHref>
                    <Button variant="outline" size="sm">Detail</Button>
                  </Link>
                </TableComponents.TableCell>
              </TableComponents.TableRow>
            ))}
          </TableComponents.TableBody>
        </TableComponents.Table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
