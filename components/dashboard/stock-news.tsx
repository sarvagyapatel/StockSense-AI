"use client";

import { useStockNews, StockNewsItem } from "@/lib/hooks/useStockNews";
import { ExternalLink } from "lucide-react";

interface StockNewsProps {
  symbol: string;
}

export default function StockNews({ symbol }: StockNewsProps) {
  const { data, isLoading, error } = useStockNews(symbol);

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading news…</p>;
  }

  if (error) {
    return (
      <p className="text-sm text-red-500">
        Failed to load news
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No recent news available
      </p>
    );
  }

  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span>📰</span> Latest News
      </h4>

      <div className="space-y-3">
        {data.map((n: StockNewsItem) => (
          <a
            key={n.url}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                  {n.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {n.source}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 mt-1" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
