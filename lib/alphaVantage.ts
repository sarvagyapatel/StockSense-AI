const BASE_URL = "https://www.alphavantage.co/query";

const API_KEY = process.env.ALPHAVANTAGE_API_KEY!;
if (!API_KEY) throw new Error("Missing Alpha Vantage API key");

async function fetchAV(params: Record<string, string>) {
  const url = new URL(BASE_URL);

  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.append(k, v)
  );
  url.searchParams.append("apikey", API_KEY);

  const res = await fetch(url.toString());
  const data = await res.json();

  if (data.Note || data["Error Message"]) {
    throw new Error("Alpha Vantage rate limit or error");
  }

  return data;
}

export async function searchStocks(query: string) {
  const data = await fetchAV({
    function: "SYMBOL_SEARCH",
    keywords: query
  });

  type BestMatch = {
    "1. symbol": string;
    "2. name": string;
    "4. region": string;
    "8. currency": string;
  };

  return (data.bestMatches ?? []).map((item: BestMatch) => ({
    symbol: item["1. symbol"],
    name: item["2. name"],
    region: item["4. region"],
    currency: item["8. currency"]
  }));
}

export async function fetchStockNews(symbol: string) {
  const data = await fetchAV({
    function: "NEWS_SENTIMENT",
    tickers: symbol
  });

  type NewsItem = {
    title: string;
    url: string;
    summary: string;
    source: string;
    overall_sentiment_label: string;
    time_published: string;
  };

  return (data.feed ?? []).map((news: NewsItem) => ({
    title: news.title,
    url: news.url,
    summary: news.summary,
    source: news.source,
    sentiment: news.overall_sentiment_label,
    publishedAt: news.time_published
  }));
}
