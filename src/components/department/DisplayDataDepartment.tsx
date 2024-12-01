// 'use client';

// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
// import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { useParams } from 'next/navigation';


// type ChartData = {
//   year: number;
//   pengabdianNasional: number;
//   pengabdianInternasional: number;
//   penelitianNasional: number;
//   penelitianInternasional: number;
// };

// type DashboardData = {
//   yearlyStats: ChartData[];
//   totalDosen: number;
//   totalPengabdian: number;
//   totalPenelitian: number;
// };

// const chartConfig = {
//   nasional: {
//     label: "Nasional",
//     color: "#ccffcc",
//   },
//   internasional: {
//     label: "Internasional",
//     color: "#64C240",
//   },
// } satisfies ChartConfig;

// function DashboardCardChart({ title, body, chartData, dataKeyNational, dataKeyInternational }: {
//   title: string;
//   body: string | number;
//   chartData: ChartData[];
//   dataKeyNational: string;
//   dataKeyInternational: string;
// }) {
//   return (
//       <Card className='flex-1 min-w-[300px] m-2'>
//         <div className='flex p-5'>      
//           <div className='border-r border-solid border-black'>
//             <CardTitle>{title}</CardTitle>
//             <CardHeader>
//               <div className="">{body}</div>
//             </CardHeader>
//           </div>
//           <div>
//             <CardContent>
//               <div className=''>
//                 <ChartContainer config={chartConfig} className="h-[200px] w-full">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={chartData}>
//                       <CartesianGrid vertical={false} />
//                       <XAxis
//                         dataKey="year"
//                         tickLine={false}
//                         tickMargin={10}
//                         axisLine={false}
//                       />
//                       <YAxis />
//                       <Tooltip content={<ChartTooltipContent />} />
//                       <ChartLegend content={<ChartLegendContent />} />
//                       <Bar dataKey={dataKeyNational} fill="var(--color-nasional)" radius={4} />
//                       <Bar dataKey={dataKeyInternational} fill="var(--color-internasional)" radius={4} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </ChartContainer>
//               </div>
//             </CardContent>
//           </div>
//         </div>
//       </Card>
//   );
// }

// function DashboardCardDosen({ count }: { count: number }) {
//   return (
//       <Card className='flex-1 min-w-[200px] m-2'>
//         <CardTitle>
//           <div className="pt-6">
//             Dosen
//           </div>
//         </CardTitle>
//         <CardHeader>
//           <div className="md:pb-10">
//             {count}
//           </div>
//         </CardHeader>
//       </Card>
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
//         // const response = await fetch(`/api/stats`);
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
//       <div className="flex flex-warp -m-2">
//         <div className='flex xl:flex-row md:flex-col'>
//           <DashboardCardChart
//             title="Pengabdian"
//             body={dashboardData.totalPengabdian}
//             chartData={dashboardData.yearlyStats}
//             dataKeyNational="pengabdianNasional"
//             dataKeyInternational="pengabdianInternasional"
//           />
//           <DashboardCardChart
//             title="Penelitian"
//             body={dashboardData.totalPenelitian}
//             chartData={dashboardData.yearlyStats}
//             dataKeyNational="penelitianNasional"
//             dataKeyInternational="penelitianInternasional"
//           />
//         </div>
//         <DashboardCardDosen count={dashboardData.totalDosen} />
//       </div>
//     </div>
//   );
// }

'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useParams } from 'next/navigation';

type ChartData = {
  year: number;
  pengabdianNasional: number;
  pengabdianInternasional: number;
  penelitianNasional: number;
  penelitianInternasional: number;
};
  
type DashboardData = {
  yearlyStats: ChartData[];
  totalDosen: number;
  totalPengabdian: number;
  totalPenelitian: number;
};
interface DashboardProps {
  selectedYear: string;
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
  } satisfies ChartConfig

  function DashboardCardChart({ title, body, chartData, dataKeyNational, dataKeyInternational }: {
    title: string;
    body: string;
    chartData: ChartData[];
    dataKeyNational: string;
    dataKeyInternational: string;
  }) {
    return (
        <Card className='flex-1 min-w-[300px] m-2'>
            <div className='flex p-5'>      
                <div className='border-r border-solid border-black'>
                    <CardTitle>{title}</CardTitle>
                    <CardHeader>
                        <div className="">{body}</div>
                    </CardHeader>
                </div>
                <div>
                <CardContent>
                    <div className=''>
                        <ChartContainer config={chartConfig} className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="year"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                />
                                <YAxis />
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
    );
  }

function DashboardCardDosen({ count }: { count: number }) {
    return (
            <Card className='flex-1 min-w-[200px] m-2'>
                <CardTitle>
                    <div className="pt-6">
                        Dosen
                    </div>
                </CardTitle>
                <CardHeader>
                    <div className="md:pb-10">
                        {count}
                    </div>
                </CardHeader>
            </Card>
    );
}

export default function Dashboard({ selectedYear }: DashboardProps) {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const nama = params.nama as string;

    useEffect(() => {
      async function fetchDashboardData() {
        try {
          setLoading(true);
          // const response = await fetch(`/api/department/${nama}`);
          // const response = await fetch(`/api/stats`);
          const url = selectedYear === "all" 
          ? `/api/department/${nama}`
          : `/api/department/${nama}?year=${selectedYear}`;
            
          const response = await fetch(url);
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
    }, [nama, selectedYear]);

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
        <div className="flex flex-wrap -m-2">
          <div className='flex xl:flex-row md:flex-col'>
            <DashboardCardChart
                title="Pengabdian"
                body={dashboardData.totalPengabdian.toString()}
                chartData={dashboardData.yearlyStats}
                dataKeyNational="pengabdianNasional"
                dataKeyInternational="pengabdianInternasional"
              />
              <DashboardCardChart
                title="Penelitian"
                body={dashboardData.totalPenelitian.toString()}
                chartData={dashboardData.yearlyStats}
                dataKeyNational="penelitianNasional"
                dataKeyInternational="penelitianInternasional"
              />
          </div>
          <DashboardCardDosen count={dashboardData.totalDosen} />
        </div>
      </div>
    );
  }