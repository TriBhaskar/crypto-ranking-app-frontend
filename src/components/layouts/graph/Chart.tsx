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
import axios from "axios";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/v1/coins/ETH/1y"
        );
        const formattedData = response.data.map(
          (item: { timestamp: string | number | Date }) => ({
            ...item,
            timestamp: new Date(item.timestamp).toLocaleDateString("default", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          })
        );
        console.table(formattedData);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Linear</CardTitle>
        <CardDescription>Last 24 Hours</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            width={600} // Set the width of the chart
            height={400} // Set the height of the chart
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
              tickMargin={8}
              label={{ value: "Value", angle: 0, position: "" }}
              domain={["auto", "auto"]}
              interval="preserveStartEnd"
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleString("default", { month: "short" });
              }}
              ticks={chartData
                .map((entry) => entry.timestamp)
                .filter((value, index, self) => {
                  const date = new Date(value);
                  const month = date.getMonth();
                  return (
                    index ===
                    self.findIndex((v) => new Date(v).getMonth() === month)
                  );
                })}
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
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            24H
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            3M
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            1Y
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            3Y
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            5Y
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
