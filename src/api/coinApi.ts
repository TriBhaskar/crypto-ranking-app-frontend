// src/api.ts
import { API_CONFIG } from "@/config/api";
import axios from "axios";

export interface ChartData {
  timestamp: string;
  value: number;
}
const API_URL = `${import.meta.env.VITE_API_URL}${API_CONFIG.ENDPOINTS.COINS}`;
export const fetchChartData = async (period: string): Promise<ChartData[]> => {
  try {
    const response = await axios.get(`${API_URL}/ETH/${period}`);
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
