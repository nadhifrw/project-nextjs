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
  count: number;
};
interface TableContentProps {
  filteredData: DataItem[];
}

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

interface LecturerListProps {
  data: DataItem[];
}

// function LecturerList({ filteredData }: TableContentProps) {
//   return (
//     <div className="border rounded-lg overflow-hidden">
//       <div className="overflow-x-auto">
//         <TableComponents.Table>
//           <TableComponents.TableHeader className="bg-gray-100 sticky top-0">
//             <TableComponents.TableRow>
//               <TableComponents.TableCell>Dosen</TableComponents.TableCell>
//               <TableComponents.TableCell>Progress</TableComponents.TableCell>
//             </TableComponents.TableRow>
//           </TableComponents.TableHeader>
//           <TableComponents.TableBody>
//             {filteredData.length > 0 ? (
//               filteredData.map((row) => (
//                 <TableComponents.TableRow key={row.id_data}>
//                   <TableComponents.TableCell className='w-1/6'>{row.penulis.nama}</TableComponents.TableCell>
//                   <TableComponents.TableCell className="flex items-center ">
//                     {row.penulis.nidn}
//                   </TableComponents.TableCell>
//                 </TableComponents.TableRow>
//               ))
//             ) : (
//               <TableComponents.TableRow>
//                 <TableComponents.TableCell colSpan={6} className="text-center py-4">
//                   Tidak terdapat data
//                 </TableComponents.TableCell>
//               </TableComponents.TableRow>
//             )}
//           </TableComponents.TableBody>
//         </TableComponents.Table>
//       </div>
//     </div>
//   );
// }

function LecturerList({ filteredData }: TableContentProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Card>
        <CardHeader>
          {/* <CardTitle>Bar Chart - Horizontal</CardTitle>
          <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={filteredData}
              layout="vertical"
              margin={{
                left: -20,
              }}
            >
              <XAxis type="number" dataKey="desktop" hide />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
      </div>
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
  const [data, setData] = useState<{ penelitian: DataItem[], pengabdian: DataItem[], dosen: DataItem[] }>({ 
    penelitian: [], pengabdian: [], dosen:[] });
  const [dosenData, setDosenData] = useState<DataItem[]>([]);
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
      <LecturerList   filteredData={filteredData} />
      <TableContent filteredData={filteredData} />
    </div>
  );
}

