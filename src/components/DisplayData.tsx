'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart";

// Updated data structure for the last 5 years
const currentYear = new Date().getFullYear();
const data = [
  { year: currentYear - 4, nasional: 186, internasional: 80 },
  { year: currentYear - 3, nasional: 305, internasional: 200 },
  { year: currentYear - 2, nasional: 237, internasional: 120 },
  { year: currentYear - 1, nasional: 273, internasional: 190 },
  { year: currentYear, nasional: 309, internasional: 230 },
];

const totalPengabdian = data.reduce((sum, item) => sum + item.nasional + item.internasional, 0);
const totalPenelitian = data.reduce((sum, item) => sum + item.nasional + item.internasional, 0);

type DashboardCardChartProps = {
    title: string
    body: string
    chartData: Array<{ year: number; nasional: number; internasional: number }>
}

type DosenCount = {
    count: number;
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

function DashboardCardChart({title, body, chartData}: DashboardCardChartProps) {
    return (
        <div className="flex">
            <Card>
                <div className="flex p-5">
                    <div className="border-r border-solid border-black">
                        <CardTitle>{title}</CardTitle>
                        <CardHeader>
                            <div className="">
                                {body}
                            </div>
                        </CardHeader>
                    </div>
                    <div className="">
                        <CardContent>
                            <div className="flex">
                            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
                                    <Bar dataKey="nasional" fill="var(--color-nasional)" radius={4} />
                                    <Bar dataKey="internasional" fill="var(--color-internasional)" radius={4} />
                                </BarChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </div>
                </div>
            </Card>
        </div>
    )
}

function DashboardCardDosen() {
    const [dosenCount, setDosenCount] = useState<number | null>(null);

    useEffect(() => {
        // Fetch the dosen count from the API
        async function fetchDosenCount() {
            const response = await fetch('/api/totalDosen');
            const data: DosenCount = await response.json();
            setDosenCount(data.count);
        }

        fetchDosenCount();
    }, []);

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
                        {dosenCount}
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}

export default function Chart() {
    return (
        <div className="flex flex-row">
            <DashboardCardChart 
                title="Pengabdian" 
                body={totalPengabdian.toString()} 
                chartData={data}
            />
            <DashboardCardChart 
                title="Penelitian" 
                body={totalPenelitian.toString()} 
                chartData={data}
            />
            <DashboardCardDosen />
        </div>
    )
}
