import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export interface WatchlistItem {
  _id: string;
  symbol: string;
  name: string;
  createdAt: string;
}

export function useWatchlist() {
  const queryClient = useQueryClient();

  const watchlistQuery = useQuery({
    queryKey: ["watchlist"],
    queryFn: () => api<WatchlistItem[]>("/api/watchlist/get"),
  });

  const addToWatchlist = useMutation({
    mutationFn: (payload: { symbol: string; name: string }) =>
      api("/api/watchlist/add", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  const removeFromWatchlist = useMutation({
    mutationFn: (symbol: string) =>
      api(`/api/watchlist/delete/${symbol}`, {
        method: "DELETE",
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["watchlist"] }),
  });

  return {
    ...watchlistQuery,
    addToWatchlist,
    removeFromWatchlist,
  };
}
