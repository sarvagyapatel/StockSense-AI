"use client";

import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StockNews from "./stock-news";
import StockInsights from "./stock-insights";

export default function StockDetailsDialog({
  symbol,
  name,
}: {
  symbol: string;
  name: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div>
            <DialogTitle className="text-2xl font-bold text-gray-900">{symbol}</DialogTitle>
            <p className="text-gray-600">{name}</p>
          </div>
          <StockInsights symbol={symbol} name={name} />
          <StockNews symbol={symbol} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
