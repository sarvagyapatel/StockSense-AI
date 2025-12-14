"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStockSearch } from "@/lib/hooks/useStockSearch";
import { useWatchlist } from "@/lib/hooks/useWatchlist";
import { toast } from "sonner";
import { Search } from "lucide-react";

export default function StockSearch() {
  const [query, setQuery] = useState("");
  const { data } = useStockSearch(query);
  const { addToWatchlist } = useWatchlist();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search stocks (e.g., INFY, AAPL, MSFT)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {data?.data && data.data.length > 0 && (
        <div className="space-y-2">
          {data.data.map((stock: { [key: string]: string }) => (
            <div
              key={stock["1. symbol"]}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-semibold text-gray-900">{stock["2. name"]}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-600">{stock["1. symbol"]}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{stock["4. region"]}</span>
                </div>
              </div>
              <Button
                onClick={() =>
                  addToWatchlist.mutate(
                    { symbol: stock["1. symbol"], name: stock["2. name"] },
                    { onSuccess: () => toast.success("Added to watchlist") }
                  )
                }
              >
                Add
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
