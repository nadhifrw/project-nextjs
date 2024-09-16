'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer } from "./ui/chart";

const data = [
    { day: 'Mon', visits: 120 },
    { day: 'Tue', visits: 150 },
    { day: 'Wed', visits: 180 },
    { day: 'Thu', visits: 200 },
    { day: 'Fri', visits: 250 },
    { day: 'Sat', visits: 300 },
    { day: 'Sun', visits: 280 },
];

const totalVisits = data.reduce((sum, item) => sum + item.visits, 0);

type DashboardCardChartProps = {
    title: string
    body: string
    chartData: Array<{ day: string; visits: number }>
}

type DashboardCardDosenProps = {
    title: string
    body: string
}

const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
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
                                <ChartContainer config={chartConfig} className="min-h-[200px] w-full" >
                                <BarChart data={chartData}>
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="visits" fill="#3b82f6" />
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

function DashboardCardDosen({title, body}: DashboardCardDosenProps){
    return(
        <div className="flex">
            <Card>
                <CardTitle>{title}</CardTitle>
                <CardHeader>
                    <div className="">
                        {body}
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}

export default function Chart() {
    return (
        <div className="flex flex-row">
            <DashboardCardChart 
                title="Pengabdian" 
                body={totalVisits.toString()} 
                chartData={data}
            />
            <DashboardCardChart 
                title="Penelitian" 
                body={totalVisits.toString()} 
                chartData={data}
            />
            <DashboardCardDosen 
                title="Dosen" 
                body={totalVisits.toString()}
            />
        </div>
    )
}