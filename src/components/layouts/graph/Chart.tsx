"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useState, useEffect } from "react";
import { fetchChartData } from "@/api/coinApi";

export const description = "A linear line chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Chart() {
  interface ChartData {
    timestamp: string;
    value: number;
  }

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [period, setPeriod] = useState("1y");

  useEffect(() => {
    const getData = async () => {
      const data = await fetchChartData(period);
      setChartData(data);
    };

    getData();
  }, [period]);

  // let lastDisplayedMonth = "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>CoinRank Graph</CardTitle>
        <CardDescription>Last 24 Hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            width={600}
            height={400}
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
              interval={0}
              tickFormatter={(value, index) => {
                const date = new Date(value);
                const month = date.toLocaleString("default", {
                  month: "short",
                });
                if (index % Math.floor(chartData.length / 13) === 0) {
                  return month;
                }
                return "";
              }}
              tick={{ textAnchor: "middle" }}
              tickMargin={8}
              tickCount={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{ value: "dollar", angle: -90, position: "insideLeft" }}
              domain={["auto", "auto"]}
              interval="preserveStartEnd"
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this timestamp <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 timestamps
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setPeriod("24h")}
          >
            24H
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setPeriod("7d")}
          >
            7D
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setPeriod("30d")}
          >
            30D
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setPeriod("3m")}
          >
            3M
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setPeriod("1y")}
          >
            1Y
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setPeriod("3y")}
          >
            3Y
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
