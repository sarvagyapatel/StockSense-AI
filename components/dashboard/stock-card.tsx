"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStockQuote } from "@/lib/hooks/useStockQuote";
import { useWatchlist } from "@/lib/hooks/useWatchlist";
import StockDetailsDialog from "./stock-details-dialog";
import { TrendingUp, TrendingDown, X } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
}

export default function StockCard({ stock }: { stock: Stock }) {
  const { data: quote, isLoading } = useStockQuote(stock.symbol);
  const { removeFromWatchlist } = useWatchlist();

  const isNegative =
    quote?.change !== undefined && quote.change < 0;

  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {stock.symbol}
          </h3>
          <p className="text-sm text-gray-600">
            {stock.name}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeFromWatchlist.mutate(stock.symbol)}
          className="text-gray-400 hover:text-red-600 -mt-1 -mr-2"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {isLoading || !quote ? (
        <p className="text-sm text-gray-500">Loading quote…</p>
      ) : (
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold text-gray-900">
              ${quote.price}
            </span>

            <div
              className={`flex items-center gap-1 ${
                isNegative ? "text-red-600" : "text-green-600"
              }`}
            >
              {isNegative ? (
                <TrendingDown className="w-4 h-4" />
              ) : (
                <TrendingUp className="w-4 h-4" />
              )}
              <span className="font-semibold">
                {quote.changePercent}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Open:</span>
              <span className="ml-2 font-medium text-gray-900">
                ${quote.open}
              </span>
            </div>
            <div>
              <span className="text-gray-500">High:</span>
              <span className="ml-2 font-medium text-gray-900">
                ${quote.high}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Low:</span>
              <span className="ml-2 font-medium text-gray-900">
                ${quote.low}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Volume:</span>
              <span className="ml-2 font-medium text-gray-900">
                {(quote.volume / 1_000_000).toFixed(2)}M
              </span>
            </div>
          </div>
        </div>
      )}

      <StockDetailsDialog
        symbol={stock.symbol}
        name={stock.name}
      />
    </Card>
  );
}
