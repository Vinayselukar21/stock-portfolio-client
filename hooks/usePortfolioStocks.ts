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


export function useStocks() {
  return useQuery({
    queryKey: ["stocks"],
    queryFn: () => apiClient<ApiResponse<StockResponse[]>>(API.STOCKS),
    refetchInterval: 20000,
  });
}
