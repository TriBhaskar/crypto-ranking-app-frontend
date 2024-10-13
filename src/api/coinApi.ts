// src/api.ts
import axios from "axios";

export interface ChartData {
  timestamp: string;
  value: number;
}

export const fetchChartData = async (period: string): Promise<ChartData[]> => {
  try {
    const response = await axios.get(
      `http://localhost:8081/api/v1/coins/ETH/${period}`
    );
    return response.data.map((item: { timestamp: string | number | Date }) => ({
      ...item,
      timestamp: new Date(item.timestamp).toLocaleDateString("default", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
