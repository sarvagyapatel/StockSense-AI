import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useStockSearch(query: string) {
  return useQuery({
    queryKey: ["stock-search", query],
    queryFn: async () => {
      const response = await axios.get(`/api/stocks/search`, {
        params: { query },
      });
      return response.data;
    },
    enabled: query.length > 1,
  });
}
