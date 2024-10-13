// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
// // import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// // import { useParams } from 'next/navigation';


// // type ChartData = {
// //   year: number;
// //   pengabdianNasional: number;
// //   pengabdianInternasional: number;
// //   penelitianNasional: number;
// //   penelitianInternasional: number;
// // };

// // type DashboardData = {
// //   yearlyStats: ChartData[];
// //   totalDosen: number;
// //   totalPengabdian: number;
// //   totalPenelitian: number;
// // };

// // const chartConfig = {
// //   nasional: {
// //     label: "Nasional",
// //     color: "#ccffcc",
// //   },
// //   internasional: {
// //     label: "Internasional",
// //     color: "#64C240",
// //   },
// // } satisfies ChartConfig;

// // function DepartmentDataChart({ title, body, chartData, dataKeyNational, dataKeyInternational }: {
// //   title: string;
// //   body: string | number;
// //   chartData: ChartData[];
// //   dataKeyNational: string;
// //   dataKeyInternational: string;
// // }) {
// //   return (
// //     <div className="flex">
// //       <Card>
// //         <div className='flex p-5'>      
// //           <div>
// //             <CardContent>
// //               <div className=''>
// //                 <ChartContainer config={chartConfig} className="h-[200px] w-full">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <BarChart data={chartData} layout="vertical" margin={{ left: 50, right: 20, top: 20, bottom: 20 }}>
// //                       <CartesianGrid horizontal={false} />
// //                       <XAxis type="number" />
// //                       <YAxis 
// //                         dataKey="year"
// //                         type="category"
// //                         tickLine={false}
// //                         axisLine={false}
// //                       />
// //                       <Tooltip content={<ChartTooltipContent />} />
// //                       <ChartLegend content={<ChartLegendContent />} />
// //                       <Bar dataKey={dataKeyNational} fill="var(--color-nasional)" radius={[0, 4, 4, 0]} />
// //                       <Bar dataKey={dataKeyInternational} fill="var(--color-internasional)" radius={[0, 4, 4, 0]} />
// //                     </BarChart>
// //                   </ResponsiveContainer>
// //                 </ChartContainer>
// //               </div>
// //             </CardContent>
// //           </div>
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // }

// // export default function Dashboard() {
// //   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const params = useParams();
// //   const nama = params.nama as string;

// //   useEffect(() => {
// //     async function fetchDashboardData() {
// //       try {
// //         setLoading(true);
// //         // const response = await fetch(`/api/department/${nama}`);
// //         const response = await fetch(`/api/stats`);
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch data');
// //         }
// //         const data: DashboardData = await response.json();
// //         setDashboardData(data);
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : 'An error occurred');
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchDashboardData();
// //   }, [nama]);

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   if (!dashboardData) {
// //     return <div>No data available</div>;
// //   }

// //   return (
// //     <div className="p-4">
// //       <div className="flex flex-row">
// //         <DepartmentDataChart
// //           title="Pengabdian"
// //           body={dashboardData.totalPengabdian}
// //           chartData={dashboardData.yearlyStats}
// //           dataKeyNational="pengabdianNasional"
// //           dataKeyInternational="pengabdianInternasional"
// //         />
// //         <DepartmentDataChart
// //           title="Penelitian"
// //           body={dashboardData.totalPenelitian}
// //           chartData={dashboardData.yearlyStats}
// //           dataKeyNational="penelitianNasional"
// //           dataKeyInternational="penelitianInternasional"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // DisplayDataDosenDepartment.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// type LecturerStat = {
//   name: string;
//   pengabdian: number;
//   penelitian: number;
//   total: number;
// };

// type DashboardData = {
//   lecturerStats: LecturerStat[];
//   totalDosen: number;
//   totalPengabdian: number;
//   totalPenelitian: number;
// };

// function LecturerStatsChart({ dashboardData }: { dashboardData: DashboardData }) {
//   return (
//     <Card className="w-full">
//       <CardContent>
//         <h2 className="text-xl font-bold mb-4">Daftar Dosen</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={dashboardData.lecturerStats}
//             layout="vertical"
//             margin={{ left: 150, right: 20, top: 20, bottom: 20 }}
//           >
//             <CartesianGrid horizontal={false} />
//             <XAxis type="number" />
//             <YAxis
//               dataKey="name"
//               type="category"
//               width={140}
//               tickLine={false}
//               axisLine={false}
//             />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="pengabdian" name="Pengabdian" fill="#8884d8" stackId="a" />
//             <Bar dataKey="penelitian" name="Penelitian" fill="#82ca9d" stackId="a" />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

// export default function Dashboard() {
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const params = useParams();
//   const nama = params.nama as string;

//   useEffect(() => {
//     async function fetchDashboardData() {
//       try {
//         setLoading(true);
//         const response = await fetch(`/api/department/${nama}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data: DashboardData = await response.json();
//         setDashboardData(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'An error occurred');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDashboardData();
//   }, [nama]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!dashboardData) {
//     return <div>No data available</div>;
//   }

//   return (
//     <div className="p-4">
//       <LecturerStatsChart dashboardData={dashboardData} />
//     </div>
//   );
// }

type LecturerStat = {
  name: string;
  pengabdian: number;
  penelitian: number;
  total: number;
};

type DashboardData = {
  lecturerStats: LecturerStat[];
  totalDosen: number;
  totalPengabdian: number;
  totalPenelitian: number;
};

function LecturerStatsChart({ dashboardData }: { dashboardData: DashboardData }) {
  const [selectedType, setSelectedType] = useState<'penelitian' | 'pengabdian'>('penelitian');

  const chartData = dashboardData.lecturerStats.map(stat => ({
    name: stat.name,
    value: stat[selectedType]
  })).sort((a, b) => b.value - a.value);

  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Daftar Dosen</h2>
          <Select
            value={selectedType}
            onValueChange={(value: 'penelitian' | 'pengabdian') => setSelectedType(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="penelitian">Penelitian</SelectItem>
              <SelectItem value="pengabdian">Pengabdian</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 150, right: 20, top: 20, bottom: 20 }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" />
            <YAxis
              dataKey="name"
              type="category"
              width={140}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              fill={selectedType === 'penelitian' ? "#8884d8" : "#82ca9d"}
              name={selectedType === 'penelitian' ? "Penelitian" : "Pengabdian"}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const nama = params.nama as string;

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/department/${nama}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: DashboardData = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [nama]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!dashboardData) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-4">
      <LecturerStatsChart dashboardData={dashboardData} />
    </div>
  );
}