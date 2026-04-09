'use client'

import { Area, AreaChart, XAxis, YAxis,CartesianGrid } from "recharts";
import 
{ 
    Card, 
    CardContent, 
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import 
{ 
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
const calorieData = [
    {day: 'Lun', calories: 1850, target: 2000},
    {day: 'Mar', calories: 2100, target: 2000},
    {day: 'Mie', calories: 1920, target: 2000},
    {day: 'Jue', calories: 1780, target: 2000},
    {day: 'Vie', calories: 2200, target: 2000},
    {day: 'Sáb', calories: 2350, target: 2000},
    {day: 'Dom', calories: 1950, target: 2000},
]

const chartConfig = {
    day: {
        label: "Day",
    },
    calories: {
        label: "Calories",
        color: "#4ade80",
    },
    target:{
        label: "Target",
        color: "#38bdf8",
    },
} satisfies import("@/components/ui/chart").ChartConfig

export function CalorieChart() {
    return (
        <Card className="border-border bg-card"> 
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-foreground">
                Rastreo de calorías
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    Ingesta semanal vs objetivo
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[h50] w-full">
                    <AreaChart                     
                    data={calorieData}
                    margin= {{top: 10, right: 10, left: -20, bottom: 0}}
                    >
                        <defs>
                            <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="4ade80" stopOpacity={0.4}></stop>
                                <stop offset="95%" stopColor="4ade80" stopOpacity={0}></stop>
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#333"
                        vertical={false}>
                        </CartesianGrid>
                        <XAxis
                        dataKey="día"
                        stroke="#666"
                        fontSize={12}
                        tickLine={false} 
                        axisLine={false}>                     
                        </XAxis>
                        <YAxis
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => "$(value)"}>  
                        </YAxis>
                        <ChartTooltip
                        content={<ChartTooltipContent hideLabel></ChartTooltipContent>}
                        cursor={{
                            stroke: "#4ade880",
                            strokeWidth: 1,
                            strokeDasharray: "5 5",
                        }}>
                        </ChartTooltip>
                        <Area
                        type="monotone"
                        dataKey="calories"
                        stroke="#4ade80"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorCalories)"
                        >
                        </Area>
                        <Area
                        type="monotone"
                        dataKey="target"
                        stroke="#38bdf8"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fill="none">
                        </Area>
                    </AreaChart>

                </ChartContainer>
            </CardContent>
             </Card>
    )
}

