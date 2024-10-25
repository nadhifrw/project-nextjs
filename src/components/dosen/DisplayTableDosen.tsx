'use client';

import React, { useState, useEffect } from 'react';
import * as TableComponents from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useParams } from 'next/navigation';

type DataItem = {
  id_data: number;
  judul: string;
  penulisExternal: string[];
  penulisNidn: string;
  tingkat: string;
  url: string;
};

type DosenData = {
  dosen: any;
  nidn: string;
  nama: string;
  penelitian: DataItem[];
  pengabdian: DataItem[];
};

interface TableContentProps {
  filteredData: DataItem[];
  dosenNama: string;
}

function TableContent({ filteredData, dosenNama }: TableContentProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <TableComponents.Table>
          <TableComponents.TableHeader className="bg-gray-100 sticky top-0">
            <TableComponents.TableRow>
              <TableComponents.TableHead className="w-1/12 text-center">ID</TableComponents.TableHead>
              <TableComponents.TableHead className="w-1/4 text-left">Judul</TableComponents.TableHead>
              <TableComponents.TableHead className="w-1/4 text-left">Penulis</TableComponents.TableHead>
              <TableComponents.TableHead className="w-1/6 text-left">Tingkat</TableComponents.TableHead>
              <TableComponents.TableHead className="w-1/6 text-left">Link</TableComponents.TableHead>
            </TableComponents.TableRow>
          </TableComponents.TableHeader>
          <TableComponents.TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableComponents.TableRow key={row.id_data}>
                  <TableComponents.TableCell className='text-center'>{row.id_data}</TableComponents.TableCell>
                  <TableComponents.TableCell>{row.judul}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">
                    {dosenNama + (row.penulisExternal.length ? ', ' + row.penulisExternal.join(', ') : '')}
                  </TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">{row.tingkat}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">
                    <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Link
                    </a>
                  </TableComponents.TableCell>
                </TableComponents.TableRow>
              ))
            ) : (
              <TableComponents.TableRow>
                <TableComponents.TableCell colSpan={5} className="text-center py-4">
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

function DataTable({ dataType }: { dataType: 'penelitian' | 'pengabdian' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<DosenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const nidn = params.nidn as string;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/dosen/${nidn}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: DosenData = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        setError('An error occurred while fetching the data');
        setIsLoading(false);
      }
    }
    if (nidn) {
      fetchData();
    }
  }, [nidn]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  
  const relevantData = data[dataType] || [];
  const filteredData = relevantData.filter(item =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const filteredData = data[dataType].filter(item =>
  //   item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  // );
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
      <TableContent filteredData={filteredData} dosenNama={data.dosen.nama} />
    </div>
  );
}

export default function Table() {
  const params = useParams();
  const nidn = params.nidn as string;

  if (!nidn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Penelitian</h2>
        <DataTable dataType="penelitian" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Pengabdian</h2>
        <DataTable dataType="pengabdian" />
      </div>
    </div>
  );
}