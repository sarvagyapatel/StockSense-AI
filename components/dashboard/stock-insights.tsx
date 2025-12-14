"use client";

import { Button } from "@/components/ui/button";
import { useStockInsights } from "@/lib/hooks/useStockInsights";
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";

interface StockInsightsProps {
  symbol: string;
  name: string;
}

export default function StockInsights({
  symbol,
  name,
}: StockInsightsProps) {
  const insight = useStockInsights(symbol, name);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          AI Insights
        </h4>
        <Button
          onClick={() => insight.mutate()}
          disabled={insight.isPending}
        >
          {insight.isPending ? "Generating…" : "Generate AI Insights"}
        </Button>
      </div>

      {insight.data && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">
              Sentiment Analysis
            </p>
            <p className="text-gray-700 text-sm">
              {insight.data.sentiment}
            </p>
          </div>

          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Key Risks
            </p>
            <ul className="space-y-2">
              {(insight.data.risks ?? []).map(
                (risk: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span className="text-red-500 mt-1">•</span>
                    <span>{risk}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Opportunities
            </p>
            <ul className="space-y-2">
              {(insight.data.opportunities ?? []).map(
                (opp: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-700 flex items-start gap-2"
                  >
                    <span className="text-green-500 mt-1">•</span>
                    <span>{opp}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-sm font-medium text-gray-900 mb-2">
              Market Outlook
            </p>
            <p className="text-gray-700 text-sm">
              {insight.data.outlook}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
