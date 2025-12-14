"use client";

import { useWatchlist } from "@/lib/hooks/useWatchlist";
import StockCard from "./stock-card";
import EmptyState from "@/components/dashboard/EmptyState";

interface Stock {
  symbol: string;
  name: string;
  price?: number; // optional, since watchlist API doesn’t return price
}

export default function Watchlist() {
  const { data, isLoading } = useWatchlist();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState text="No stocks in watchlist" />;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Your Watchlist
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((stock: Stock) => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
}
