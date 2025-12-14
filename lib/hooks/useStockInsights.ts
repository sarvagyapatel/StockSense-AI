import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export interface StockInsights {
  sentiment: string;
  risks?: string[];
  opportunities?: string[];
  outlook: string;
}

export function useStockInsights(symbol: string, name: string) {
  return useMutation({
    mutationFn: () =>
      api<StockInsights>(`/api/stocks/${symbol}/insights`, {
        method: "POST",
        body: JSON.stringify({ symbol, name }),
      }),
  });
}
