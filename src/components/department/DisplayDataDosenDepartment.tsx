// const chartConfig = {
//     nasional: {
//       label: "Nasional",
//       color: "#ccffcc",
//     },
//     internasional: {
//       label: "Internasional",
//       color: "#64C240",
//     },
//   } satisfies ChartConfig;
  
  
//   function LecturerList() {
//     return (
//       <div className="border rounded-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <Card>
//           <CardHeader>
//             {/* <CardTitle>Bar Chart - Horizontal</CardTitle>
//             <CardDescription>January - June 2024</CardDescription> */}
//           </CardHeader>
//           <CardContent>
//             <ChartContainer config={chartConfig}>
//               <BarChart
//                 accessibilityLayer
//                 data={filteredData}
//                 layout="vertical"
//                 margin={{
//                   left: -20,
//                 }}
//               >
//                 <XAxis type="number" dataKey="desktop" hide />
//                 <YAxis
//                   dataKey="month"
//                   type="category"
//                   tickLine={false}
//                   tickMargin={10}
//                   axisLine={false}
//                   tickFormatter={(value) => value.slice(0, 3)}
//                 />
//                 <ChartTooltip
//                   cursor={false}
//                   content={<ChartTooltipContent hideLabel />}
//                 />
//                 <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
//               </BarChart>
//             </ChartContainer>
//           </CardContent>
//           {/* <CardFooter className="flex-col items-start gap-2 text-sm">
//             <div className="flex gap-2 font-medium leading-none">
//               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//             </div>
//             <div className="leading-none text-muted-foreground">
//               Showing total visitors for the last 6 months
//             </div>
//           </CardFooter> */}
//         </Card>
//         </div>
//       </div>
//     );
//   }

// "use client"

// // import { TrendingUp } from "lucide-react"
// import { Bar, BarChart, XAxis, YAxis } from "recharts"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// export const description = "A horizontal bar chart"

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig

// export default function Component() {
//   return (
//     <Card>
//       {/* <CardHeader>
//         <CardTitle>Bar Chart - Horizontal</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader> */}
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart
//             accessibilityLayer
//             data={chartData}
//             layout="vertical"
//             margin={{
//               left: -20,
//             }}
//           >
//             <XAxis type="number" dataKey="desktop" hide />
//             <YAxis
//               dataKey="month"
//               type="category"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         {/* <div className="flex gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div> */}
//         {/* <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last 6 months
//         </div> */}
//       </CardFooter>
//     </Card>
//   )
// }

'use client';

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

function DashboardCardChart({ title, body, chartData, dataKeyNational, dataKeyInternational }: {
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
        // const response = await fetch(`/api/department/${nama}`);
        const response = await fetch(`/api/stats`);
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
      <div className="flex flex-row">
        <DashboardCardChart
          title="Pengabdian"
          body={dashboardData.totalPengabdian}
          chartData={dashboardData.yearlyStats}
          dataKeyNational="pengabdianNasional"
          dataKeyInternational="pengabdianInternasional"
        />
        <DashboardCardChart
          title="Penelitian"
          body={dashboardData.totalPenelitian}
          chartData={dashboardData.yearlyStats}
          dataKeyNational="penelitianNasional"
          dataKeyInternational="penelitianInternasional"
        />
      </div>
    </div>
  );
}
