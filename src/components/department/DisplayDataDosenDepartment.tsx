// NO LONGER USED

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
// import { Card, CardContent } from "@/components/ui/card";
// import { useParams } from 'next/navigation';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// // type LecturerStat = {
// //   name: string;
// //   pengabdian: number;
// //   penelitian: number;
// //   total: number;
// // };

// // type DashboardData = {
// //   lecturerStats: LecturerStat[];
// //   totalDosen: number;
// //   totalPengabdian: number;
// //   totalPenelitian: number;
// // };

// // function LecturerStatsChart({ dashboardData }: { dashboardData: DashboardData }) {
// //   return (
// //     <Card className="w-full">
// //       <CardContent>
// //         <h2 className="text-xl font-bold mb-4">Daftar Dosen</h2>
// //         <ResponsiveContainer width="100%" height={400}>
// //           <BarChart
// //             data={dashboardData.lecturerStats}
// //             layout="vertical"
// //             margin={{ left: 150, right: 20, top: 20, bottom: 20 }}
// //           >
// //             <CartesianGrid horizontal={false} />
// //             <XAxis type="number" />
// //             <YAxis
// //               dataKey="name"
// //               type="category"
// //               width={140}
// //               tickLine={false}
// //               axisLine={false}
// //             />
// //             <Tooltip />
// //             <Legend />
// //             <Bar dataKey="pengabdian" name="Pengabdian" fill="#8884d8" stackId="a" />
// //             <Bar dataKey="penelitian" name="Penelitian" fill="#82ca9d" stackId="a" />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </CardContent>
// //     </Card>
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
// //         const response = await fetch(`/api/department/${nama}`);
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
// //       <LecturerStatsChart dashboardData={dashboardData} />
// //     </div>
// //   );
// // }

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
//   const [selectedType, setSelectedType] = useState<'penelitian' | 'pengabdian'>('penelitian');

//   const chartData = dashboardData.lecturerStats.map(stat => ({
//     name: stat.name,
//     value: stat[selectedType]
//   })).sort((a, b) => b.value - a.value);

//   return (
//     <Card className="w-full">
//       <CardContent>
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Daftar Dosen</h2>
//           <Select
//             value={selectedType}
//             onValueChange={(value: 'penelitian' | 'pengabdian') => setSelectedType(value)}
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="penelitian">Penelitian</SelectItem>
//               <SelectItem value="pengabdian">Pengabdian</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={chartData}
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
//             <Bar
//               dataKey="value"
//               fill={selectedType === 'penelitian' ? "#8884d8" : "#82ca9d"}
//               name={selectedType === 'penelitian' ? "Penelitian" : "Pengabdian"}
//             />
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