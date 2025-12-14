/* ---------- STOCK SEARCH ---------- */
export interface StockSearchResult {
  "1. symbol": string;
  "2. name": string;
  "3. type"?: string;
  "4. region"?: string;
  "5. marketOpen"?: string;
  "6. marketClose"?: string;
  "7. timezone"?: string;
  "8. currency"?: string;
  "9. matchScore"?: string;
}

/* ---------- STOCK QUOTE ---------- */
export interface StockQuote {
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  change: number;
  changePercent: string;
  volume: number;
  latestTradingDay: string;
}

/* ---------- STOCK NEWS ---------- */
export interface StockNewsItem {
  title: string;
  url: string;
  source: string;

  time_published?: string;
  authors?: string[];
  summary?: string;
  banner_image?: string | null;
  category_within_source?: string;
  source_domain?: string;

  topics?: Array<{
    topic: string;
    relevance_score: string;
  }>;

  overall_sentiment_score?: number;
  overall_sentiment_label?: string;

  ticker_sentiment?: Array<{
    ticker: string;
    relevance_score: string;
    ticker_sentiment_score: string;
    ticker_sentiment_label: string;
  }>;
}

/* ---------- AI INSIGHTS ---------- */
export interface StockInsights {
  sentiment: string;
  risks?: string[];
  opportunities?: string[];
  outlook: string;
}

/* ---------- WATCHLIST ---------- */
export interface WatchlistItem {
  _id: string;
  userId: string;
  symbol: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
