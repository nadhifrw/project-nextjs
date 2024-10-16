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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LabelList } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Card,
  CardContent,
} from "@/components/ui/card"

type DataItem = {
  id_data: number;
  judul: string;
  penulis: { nama: string; nidn: string };
  penulisExternal: string[];
  department: { nama: string };
  tingkat: string;
  url: string;
};

// type LecturerStat = {
//   name: string;
//   pengabdian: number;
//   penelitian: number;
//   total: number;
// };

type LecturerStat = {
  name: string;
  pengabdianNasional: number;
  pengabdianInternasional: number;
  penelitianNasional: number;
  penelitianInternasional: number;
};

type DashboardData = {
  lecturerStats: LecturerStat[];
  totalDosen: number;
  totalPengabdian: number;
  totalPenelitian: number;
  pengabdian: { data: DataItem[] };
  penelitian: { data: DataItem[] };
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


function TableContent({ filteredData }: { filteredData: DataItem[] }) {
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

function LecturerStatsChart({ dashboardData, selectedType }: { dashboardData: DashboardData; selectedType: 'penelitian' | 'pengabdian' }) {
  const chartData = dashboardData.lecturerStats.map(stat => ({
    name: stat.name,
    national: stat[`${selectedType}Nasional`],
    international: stat[`${selectedType}Internasional`],
    total: stat[`${selectedType}Nasional`] + stat[`${selectedType}Internasional`]
  })).sort((a, b) => b.total - a.total);

  // const colors = {
  //   penelitian: {
  //     national: "#8884d8",  // Light purple
  //     international: "#4834d4"  // Dark purple
  //   },
  //   pengabdian: {
  //     national: "#82ca9d",  // Light green
  //     international: "#3cb371"  // Dark green
  //   }
  // };
  
  const colors = {
    penelitian: {
      national: "#ccffcc",  // Light purple
      international: "#64C240"  // Dark purple
    },
    pengabdian: {
      national: "#ccffcc",  // Light green
      international: "#64C240"  // Dark green
    }
  };

  return (
    <Card className="w-full">
      <CardContent className='flex flex-col'>
        <h2 className="text-xl font-bold mb-4">Daftar Dosen - {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</h2>
        <ResponsiveContainer width="100%" height={150} className={"border"}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 40, right: 40, top: 20, bottom: 20 }}
          >
            <CartesianGrid horizontal={false}/>
            <XAxis type="number" hide/>
            <YAxis
              className='text-sm'
              dataKey="name"
              type="category"
              width={200}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip wrapperStyle={{ fontSize: '12px', padding:'4px'}} />
            {/* <Legend /> */}
            <Bar
              dataKey="national"
              fill={colors[selectedType].national}
              name="Nasional"
              stackId="a"
              barSize={20}
            />
            <Bar
              dataKey="international"
              fill={colors[selectedType].international}
              name="Internasional"
              stackId="a"
              barSize={20}
            >
              <LabelList dataKey="total" position="right" className='text-sm' />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function ResearchDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'penelitian' | 'pengabdian'>('penelitian');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const nama = params.nama as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/department/${nama}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setDashboardData(result);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dashboardData) return <div>No data available</div>;

  const filteredData = dashboardData[selectedType].data.filter(item =>
    item.judul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <Select onValueChange={(value: 'penelitian' | 'pengabdian') => setSelectedType(value)} defaultValue="penelitian">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
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
      <div className=''>
      <LecturerStatsChart dashboardData={dashboardData} selectedType={selectedType} />
      <TableContent filteredData={filteredData} />
      </div>
    </div>
  );
}