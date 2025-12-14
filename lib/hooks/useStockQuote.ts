import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface StockQuote {
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  change: number;
  changePercent: string;
  volume: number;
  latestTradingDay: string;
}

export function useStockQuote(symbol: string) {
  return useQuery({
    queryKey: ["quote", symbol],
    queryFn: () =>
      api<StockQuote>(`/api/stocks/${symbol}/quote`),
    enabled: Boolean(symbol),
  });
}
