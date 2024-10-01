'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart";

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
  } satisfies ChartConfig

  function DashboardCardChart({ title, body, chartData, dataKeyNational, dataKeyInternational }: {
    title: string;
    body: string;
    chartData: ChartData[];
    dataKeyNational: string;
    dataKeyInternational: string;
  }) {
    return (
        <div className="flex">
        <Card>
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
        </div>
      
    );
  }

function DashboardCardDosen({ count }: { count: number }) {
    return (
        <div className="flex">
            <Card>
                <CardTitle>
                    <div className="pt-6">
                        Dosen
                    </div>
                </CardTitle>
                <CardHeader>
                    <div className="">
                        {count}
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  
    useEffect(() => {
      async function fetchDashboardData() {
        const response = await fetch('/api/stats');
        const data: DashboardData = await response.json();
        setDashboardData(data);
      }
  
      fetchDashboardData();
    }, []);
  
    if (!dashboardData) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="p-4">
        <div className="flex flex-row">
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
          <DashboardCardDosen count={dashboardData.totalDosen} />
        </div>
      </div>
    );
  }