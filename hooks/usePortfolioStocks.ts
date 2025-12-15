"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient, ApiResponse } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

  
export interface StockResponse {
  id: string;
  exchange: string;
  yahoo_symbol: string;
  name: string;
  shortName: string;
  price: number;
  currency: string;
  google_symbol: string;

  peRatio: {
    raw: string;
    numeric: number;
  };

  earningsPerShare: {
    raw: string;
    numeric: number;
  };

  expTime: string;

  purchasePrice: number;
  quantity: number;
  investment: number;
  portfolioPercentage: string;
  sector: string;
}


// Indian stock market hours (Mon-Fri, 9:15 AM - 3:30 PM IST)
function isIndianMarketOpen() {
  // Get current time in India
  const indiaTime = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const day = indiaTime.getDay(); // 0 (Sunday) - 6 (Saturday)
  const hours = indiaTime.getHours();
  const minutes = indiaTime.getMinutes();

  // Market closed on weekends
  if (day === 0 || day === 6) return false;

  // Market open: 9:15AM (9 * 60 + 15 = 555) to 3:30PM (15 * 60 + 30 = 930)
  const minutesSinceMidnight = hours * 60 + minutes;
  return minutesSinceMidnight >= 555 && minutesSinceMidnight < 930;
}

export function useStocks() {
  return useQuery({
    queryKey: ["stocks"],
    queryFn: () => apiClient<ApiResponse<StockResponse[]>>(API.STOCKS),
    refetchInterval: isIndianMarketOpen() ? 20000 : false,
  });
}
