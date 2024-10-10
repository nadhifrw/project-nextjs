'use client';

import React, { useState, useEffect } from 'react'
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
import { useParams } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type DataItem = {
  id_data: number;
  judul: string;
  penulis: { nama: string; nidn: string };
  penulisExternal: string[];
  department: { nama: string };
  tingkat: string;
  url: string;
  totalPengabdian: number;
  totalPenelitian: number;
};
interface TableContentProps {
  filteredData: DataItem[];
}

type ChartData = {
  year: number;
  pengabdianNasional: number;
  pengabdianInternasional: number;
  penelitianNasional: number;
  penelitianInternasional: number;
};


const chartConfig = {
  nasional: {
    label: "Nasional",
    color: "#ccffcc",
  },
  internasional: {
    label: "Internasional",
    color: "#64C240",
  },
} satisfies ChartConfig;

function DepartmentDataChart({ title, body, chartData, dataKeyNational, dataKeyInternational }: {
  title: string;
  body: string | number;
  chartData: ChartData[];
  dataKeyNational: string;
  dataKeyInternational: string;
}) {
  return (
    <div className="flex">
      <Card>
        <div className='flex p-5'>      
          {/* <div className='border-r border-solid border-black'>
            <CardTitle>{title}</CardTitle>
            <CardHeader>
              <div className="">{body}</div>
            </CardHeader>
          </div> */}
          <div>
            <CardContent>
              <div className=''>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout='vertical' margin={{ left: -20,}}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        // type="number" dataKey="desktop" hide
                      />
                      <YAxis 
                        dataKey="year"
                        type='category'
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        // tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <Tooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey={dataKeyNational} fill="var(--color-nasional)" radius={4} />
                      <Bar dataKey={dataKeyInternational} fill="var(--color-internasional)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
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
              <TableComponents.TableHead className="w-1/6 text-left">Department</TableComponents.TableHead>
              <TableComponents.TableHead className="w-1/6 text-left">Tingkat</TableComponents.TableHead>
              <TableComponents.TableHead className="w-1/6 text-left">URL</TableComponents.TableHead>
            </TableComponents.TableRow>
          </TableComponents.TableHeader>
          <TableComponents.TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableComponents.TableRow key={row.id_data}>
                  <TableComponents.TableCell className='text-center'>{row.id_data}</TableComponents.TableCell>
                  <TableComponents.TableCell>{row.judul}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">
                    {row.penulis.nama}
                    {row.penulisExternal.length > 0 && (
                      <>, {row.penulisExternal.join(', ')}</>
                    )}
                  </TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">{row.department.nama}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">{row.tingkat}</TableComponents.TableCell>
                  <TableComponents.TableCell className="text-left">
                    <a href={row.url} target="_blank" rel="noopener noreferrer">Link</a>
                  </TableComponents.TableCell>
                </TableComponents.TableRow>
              ))
            ) : (
              <TableComponents.TableRow>
                <TableComponents.TableCell colSpan={6} className="text-center py-4">
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
  const [data, setData] = useState<{ penelitian: DataItem[], pengabdian: DataItem[], dosen: DataItem[],}>({ 
    penelitian: [], pengabdian: [], dosen:[],});
  // const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const nama = params.nama as string;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/department/${nama}`); // Adjust this URL to match your API route
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData({
          penelitian: result.penelitian.data,
          pengabdian: result.pengabdian.data,
          dosen: result.dosen,
        });
        // setDashboardData(result.dashboardData);
        setError(null);
      } catch (err) {
        setError('An error occurred while fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nama]);

  const filteredData = data[selectedTable as keyof typeof data].filter(item =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
      <DepartmentDataChart
        title="Penelitian"
        body={data.penelitian.length}
        chartData={data.penelitian}
        dataKeyNational="penelitianNasional"
        dataKeyInternational="penelitianInternasional"
      />
    </div>
  );
}

