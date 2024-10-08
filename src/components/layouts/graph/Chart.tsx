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

export const description = "A linear line chart";

const chartData = [
  { timestamp: "2024-07-05 13:10:00", value: 2941.14 },
  { timestamp: "2024-07-05 13:15:00", value: 2952.88 },
  { timestamp: "2024-07-05 13:20:00", value: 2950.58 },
  { timestamp: "2024-07-05 13:25:00", value: 2950.2 },
  { timestamp: "2024-07-05 13:30:00", value: 2963.1 },
  { timestamp: "2024-07-05 13:35:00", value: 2970.36 },
  {
    timestamp: "2024-07-05 13:40:00",
    value: 2972.23,
  },
  {
    timestamp: "2024-07-05 13:45:00",
    value: 2968.82,
  },
  {
    timestamp: "2024-07-05 13:50:00",
    value: 2961.13,
  },
  {
    timestamp: "2024-07-05 13:55:00",
    value: 2961.73,
  },
  {
    timestamp: "2024-07-05 14:00:00",
    value: 2971.4,
  },
  {
    timestamp: "2024-07-05 14:05:00",
    value: 2963.86,
  },
  {
    timestamp: "2024-07-05 14:10:00",
    value: 2954.07,
  },
  {
    timestamp: "2024-07-05 14:15:00",
    value: 2949.52,
  },
  {
    timestamp: "2024-07-05 14:20:00",
    value: 2947.76,
  },
  {
    timestamp: "2024-07-05 14:25:00",
    value: 2942.21,
  },
  {
    timestamp: "2024-07-05 14:30:00",
    value: 2939.61,
  },
  {
    timestamp: "2024-07-05 14:35:00",
    value: 2942.05,
  },
  {
    timestamp: "2024-07-05 14:40:00",
    value: 2948.48,
  },
  {
    timestamp: "2024-07-05 14:45:00",
    value: 2953.84,
  },
  {
    timestamp: "2024-07-05 14:50:00",
    value: 2958.6,
  },
  {
    timestamp: "2024-07-05 14:55:00",
    value: 2958.52,
  },
  {
    timestamp: "2024-07-05 15:00:00",
    value: 2956.24,
  },
  {
    timestamp: "2024-07-05 15:05:00",
    value: 2961.75,
  },
  {
    timestamp: "2024-07-05 15:10:00",
    value: 2991.32,
  },
  {
    timestamp: "2024-07-05 15:15:00",
    value: 2991.22,
  },
  {
    timestamp: "2024-07-05 15:20:00",
    value: 2985.78,
  },
  {
    timestamp: "2024-07-05 15:25:00",
    value: 2990.02,
  },
  {
    timestamp: "2024-07-05 15:30:00",
    value: 2989.8,
  },
  {
    timestamp: "2024-07-05 15:35:00",
    value: 2995.44,
  },
  {
    timestamp: "2024-07-05 15:40:00",
    value: 2992.63,
  },
  {
    timestamp: "2024-07-05 15:45:00",
    value: 2995.62,
  },
  {
    timestamp: "2024-07-05 15:50:00",
    value: 2991.08,
  },
  {
    timestamp: "2024-07-05 15:55:00",
    value: 2984.9,
  },
  {
    timestamp: "2024-07-05 16:00:00",
    value: 2988.39,
  },
  {
    timestamp: "2024-07-05 16:05:00",
    value: 2989.2,
  },
  {
    timestamp: "2024-07-05 16:10:00",
    value: 2982.31,
  },
  {
    timestamp: "2024-07-05 16:15:00",
    value: 2982.0,
  },
  {
    timestamp: "2024-07-05 16:20:00",
    value: 2984.36,
  },
  {
    timestamp: "2024-07-05 16:25:00",
    value: 2990.19,
  },
  {
    timestamp: "2024-07-05 16:30:00",
    value: 2988.55,
  },
  {
    timestamp: "2024-07-05 16:35:00",
    value: 2979.59,
  },
  {
    timestamp: "2024-07-05 16:40:00",
    value: 2976.06,
  },
];

const chartConfig = {
  value: {
    label: "value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Chart() {
  return (
    <Card className="w-5/6 mx-auto">
      <CardHeader>
        <CardTitle>Line Chart - Linear</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
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
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              label={{ value: "Value", angle: -90, position: "insideLeft" }}
              domain={["auto", "auto"]}
              interval="preserveStartEnd"
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="var(--color-value)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this timestamp <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 timestamps
        </div>
      </CardFooter>
    </Card>
  );
}
