import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export interface StockNewsItem {
  title: string;
  url: string;
  source: string;
}

export function useStockNews(symbol: string) {
  return useQuery({
    queryKey: ["news", symbol],
    queryFn: () =>
      api<StockNewsItem[]>(`/api/stocks/${symbol}/news`),
    enabled: Boolean(symbol),
  });
}
